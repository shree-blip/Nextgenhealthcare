import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import {
  retrieveContext,
  formatContextForPrompt,
  extractSources,
  keywordSearch,
} from '@server/knowledge-retrieval';

// Gemini generation can take well over Vercel's default 10s function limit.
export const maxDuration = 60;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

function buildSystemPrompt(retrievedContext: string, language: 'en' | 'es' = 'en'): string {
  const langInstructions =
    language === 'es'
      ? '\nIMPORTANT: Respond in Spanish. The user is speaking Spanish.'
      : '';

  return `You are Nex, a friendly and knowledgeable AI assistant for The NextGen Healthcare Marketing (thenextgenhealth.com). You help visitors learn about our healthcare marketing services, pricing, dashboard, and approach.

PERSONALITY:
- Warm, conversational, and genuinely helpful — not robotic
- Use simple, natural language — sound like a real person who cares
- Keep answers concise (2-4 sentences) unless the user asks for detail
- Ask a brief follow-up question when it helps guide the conversation
- Use the user's language style to shape your tone (casual → casual, professional → professional)
${langInstructions}

KNOWLEDGE RULES:
1. Answer ONLY from the RETRIEVED WEBSITE CONTENT below. Do NOT make up information.
2. If the retrieved content contains the answer, give a clear, helpful response and cite the source page URL.
3. If the retrieved content does NOT contain the answer, say: "I'm not fully sure from our site content yet, but I can guide you to the right page. Try visiting https://thenextgenhealth.com/contact or ask me something else!"
4. Never fabricate pricing, service details, features, or statistics.
5. When mentioning pages from our site, include the full URL (e.g., https://thenextgenhealth.com/pricing).

LEAD HANDLING:
- When users ask about pricing, services, setup, or demos → guide them to:
  • Book a free strategy call: https://thenextgenhealth.com/contact
  • View pricing: https://thenextgenhealth.com/pricing
  • Learn about services: https://thenextgenhealth.com/services
- When users ask about the dashboard → explain it simply: "Our dashboard puts all your marketing data — Google Ads, SEO, social, patient metrics — in one place so you can see what's working without juggling tools."
- When users mention competitors or tools they use → acknowledge and pivot to our strengths

OFF-TOPIC HANDLING:
- If the question is completely unrelated to our business, politely redirect: "Great question! That's outside my area though. I'm here to help with healthcare marketing — things like SEO, ads, social media, and analytics. What can I help you with on that front?"

FORMAT:
- Keep it natural and conversational
- When mentioning our pages, use markdown links: [Page Name](url)
- Use bullet points for lists
- Bold key terms with **term**

${retrievedContext}`.trim();
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: Message[];
  sessionId?: string;
  visitorId?: string;
  language?: 'en' | 'es';
}

type FallbackIntent =
  | 'pricing'
  | 'services'
  | 'booking'
  | 'dashboard'
  | 'industries'
  | 'results'
  | 'about-company';

interface FallbackDecision {
  reply: string;
  matchedIntent: boolean;
}

function isLikelySpanish(text: string, language: 'en' | 'es') {
  return (
    language === 'es' ||
    /[¿¡]|\b(precio|servicio|consulta|clinica|urgencia|empresa|agendar)\b/.test(text)
  );
}

function detectFallbackIntent(text: string): FallbackIntent | null {
  const q = text.toLowerCase();

  if (/(price|pricing|cost|rates?|plans?|precio|precios|costo|tarifa|plan)/.test(q))
    return 'pricing';
  if (
    /(services?|offer|offering|field marketing|marketing services?|servicio|servicios|estrategia|seo|ads?|google ads|meta ads|social media|email|automation|automatiz)/.test(
      q,
    )
  )
    return 'services';
  if (/(book|consult|schedule|demo|call|consulta|agendar|cita|llamada)/.test(q)) return 'booking';
  if (/(dashboard|analytics|reporting|data|roi|métricas|metricas|anal[ií]tica)/.test(q))
    return 'dashboard';
  if (
    /(urgent care|er\b|medspa|clinic|dental|specialt|industry|industria|cl[ií]nica|clinica)/.test(q)
  )
    return 'industries';
  if (
    /(result|patient|growth|performance|outcome|inquiries?|leads?|resultado|paciente|crecimiento|rendimiento)/.test(
      q,
    )
  )
    return 'results';
  if (
    /(next\s?gen|thenextgenhealth|about|who are you|your company|company|agencia|empresa|quienes|quiénes|acerca de)/.test(
      q,
    )
  )
    return 'about-company';

  return null;
}

function buildFallbackQuery(input: string, recentUserMessages: string[]): string {
  const normalizedInput = input.trim();
  if (!normalizedInput) return '';

  const wordCount = normalizedInput.split(/\s+/).length;
  const lower = normalizedInput.toLowerCase();
  const vaguePattern =
    /^(this|that|it|more|details|info|field marketing|marketing|next gen|about|tell me more)$/;
  const isVagueFollowUp = wordCount <= 3 || vaguePattern.test(lower);

  if (!isVagueFollowUp || recentUserMessages.length < 2) {
    return normalizedInput;
  }

  const previousMessage = recentUserMessages[recentUserMessages.length - 2]?.trim() || '';
  if (!previousMessage) return normalizedInput;

  return `${previousMessage} ${normalizedInput}`.trim();
}

function fallbackReply(
  input: string,
  recentUserMessages: string[],
  language: 'en' | 'es' = 'en',
): FallbackDecision {
  const fallbackQuery = buildFallbackQuery(input, recentUserMessages);
  const directIntent = detectFallbackIntent(input);
  const contextIntent = detectFallbackIntent(fallbackQuery);
  const intent = directIntent || contextIntent;
  const isEs = isLikelySpanish(fallbackQuery.toLowerCase(), language);

  if (intent === 'pricing') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Nuestros planes comienzan en $5,000/mes (Starter Care) y $10,000/mes (Growth Pro), con opciones Enterprise personalizadas. ¿Te gustaría ver el desglose completo? 👉 https://thenextgenhealth.com/pricing'
        : "We offer two core plans: **Starter Care** starting at $5,000/mo and **Growth Pro** at $10,000/mo, plus custom Enterprise options. Check out the full breakdown here: https://thenextgenhealth.com/pricing — or tell me what kind of practice you have and I'll suggest the best fit!",
    };
  }

  if (intent === 'services') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Ofrecemos SEO local, Google/Meta Ads, diseño web HIPAA, redes sociales, contenido, email marketing, automatización con IA y un dashboard unificado. Todo especializado en healthcare. Más detalles en https://thenextgenhealth.com/services'
        : "We handle **SEO**, **Google & Meta Ads**, **website design**, **social media**, **content**, **email campaigns**, **automation**, and more — all specialized in healthcare. See the full list: https://thenextgenhealth.com/services. What's your biggest marketing challenge right now?",
    };
  }

  if (intent === 'booking') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Puedes agendar una consulta estratégica gratuita aquí 👉 https://thenextgenhealth.com/contact. ¡Estaremos felices de ayudarte!'
        : "You can book a **free strategy call** right here: https://thenextgenhealth.com/contact. We'd love to learn about your practice and show you how we can help!",
    };
  }

  if (intent === 'dashboard') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Nuestro dashboard unificado te muestra datos reales de Google Ads, Meta, SEO y pacientes en un solo lugar. ¡Pide una demo! https://thenextgenhealth.com/contact'
        : "Our **unified dashboard** puts all your marketing data in one place — Google Ads, Meta, SEO, patient metrics. No more juggling tools! Want to see it in action? Book a demo: https://thenextgenhealth.com/contact",
    };
  }

  if (intent === 'industries') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Sí, trabajamos con urgent cares, ERs, MedSpas, consultorios dentales y clínicas de bienestar. Adaptamos todo por especialidad. Más info: https://thenextgenhealth.com/industries'
        : 'Absolutely! We specialize in **urgent care, ERs, MedSpas, dental offices, and wellness clinics**. Each strategy is tailored to your specialty. Learn more: https://thenextgenhealth.com/industries',
    };
  }

  if (intent === 'results') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Nuestros clientes ven un aumento promedio del 340%+ en consultas de pacientes. Mira nuestros resultados: https://thenextgenhealth.com/proven-results'
        : 'Our clients see an average **340%+ increase** in patient inquiries. Check out our proven results: https://thenextgenhealth.com/proven-results. What growth goals do you have in mind?',
    };
  }

  if (intent === 'about-company') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'The NextGen Healthcare Marketing es una agencia enfocada 100% en marketing para clínicas y marcas de salud. Ayudamos con SEO, anuncios, contenido y analítica en un dashboard unificado para crecer más rápido. Conócenos: https://thenextgenhealth.com/about y servicios: https://thenextgenhealth.com/services'
        : 'The NextGen Healthcare Marketing is a healthcare-specialized growth agency. We help practices with SEO, ads, content, and analytics through one unified approach and dashboard. Learn more at https://thenextgenhealth.com/about and explore services at https://thenextgenhealth.com/services',
    };
  }

  return {
    matchedIntent: false,
    reply: isEs
      ? 'Soy Nex, tu asistente de marketing médico. Puedo ayudarte con servicios, precios, nuestro dashboard y más. ¿Qué te gustaría saber? 😊'
      : "I'm Nex, your healthcare marketing assistant! I can help with services, pricing, our dashboard, and more. What would you like to know? 😊",
  };
}

function summarizeConversation(messages: Message[], language: 'en' | 'es' = 'en') {
  const userMessages = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.trim())
    .filter(Boolean);
  const combined = userMessages.join(' ').toLowerCase();
  const intents: string[] = [];

  const has = (patterns: string[]) => patterns.some((pattern) => combined.includes(pattern));

  if (has(['price', 'pricing', 'cost', 'precio'])) intents.push('Pricing Inquiry');
  if (has(['service', 'offer', 'seo', 'ads', 'website', 'servicio'])) intents.push('Service Inquiry');
  if (has(['book', 'schedule', 'consult', 'contact', 'consulta', 'agendar']))
    intents.push('Consultation Intent');
  if (has(['urgent care', 'er', 'medspa', 'dental', 'clinic', 'clínica']))
    intents.push('Industry Fit Check');

  const leadSignal = has(['book', 'schedule', 'contact', 'quote', 'proposal', 'precio', 'agendar'])
    ? 'High'
    : userMessages.length >= 3
      ? 'Medium'
      : 'Low';

  const topQuestions =
    userMessages.slice(-3).join(' | ') ||
    (language === 'es' ? 'Sin preguntas registradas' : 'No user questions captured');
  const intentText =
    intents.length > 0
      ? intents.join(', ')
      : language === 'es'
        ? 'Consulta general'
        : 'General Inquiry';

  const summary =
    language === 'es'
      ? `Intereses: ${intentText}. Nivel de intención: ${leadSignal}. Últimas preguntas: ${topQuestions}`
      : `Interests: ${intentText}. Lead intent: ${leadSignal}. Latest questions: ${topQuestions}`;

  const report =
    language === 'es'
      ? `Reporte de visita: Usuario preguntó sobre ${intentText.toLowerCase()}. Señal de conversión: ${leadSignal}. Recomendación: seguimiento comercial con propuesta y llamada.`
      : `Visit report: User asked about ${intentText.toLowerCase()}. Conversion signal: ${leadSignal}. Recommendation: sales follow-up with proposal and strategy call.`;

  return { summary, report };
}

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, visitorId, language } = (await req
      .json()
      .catch(() => ({}))) as ChatRequestBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const currentLanguage: 'en' | 'es' = language === 'es' ? 'es' : 'en';
    const activeSessionKey = sessionId || `anon-${Date.now()}`;

    let session: { id: string } | null = null;
    try {
      session = await prisma.chatSession.upsert({
        where: { sessionKey: activeSessionKey },
        update: {
          visitorId: visitorId || undefined,
          language: currentLanguage,
        },
        create: {
          sessionKey: activeSessionKey,
          visitorId,
          language: currentLanguage,
        },
        select: { id: true },
      });
    } catch (dbError) {
      console.error('Chat session persistence skipped:', dbError);
    }

    const latestUserMessage =
      [...messages].reverse().find((m) => m.role === 'user')?.content || '';

    const recentMessages = messages.slice(-10);
    const recentUserMessages = recentMessages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .filter(Boolean);

    if (latestUserMessage && session) {
      try {
        await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            role: 'user',
            content: latestUserMessage,
          },
        });
      } catch (dbError) {
        console.error('User chat message persistence skipped:', dbError);
      }
    }

    let retrievedChunks: Awaited<ReturnType<typeof retrieveContext>> = [];
    let sources: { url: string; title: string }[] = [];
    let isUnanswered = false;

    const retrievalQuery = buildFallbackQuery(latestUserMessage, recentUserMessages);

    try {
      retrievedChunks = await retrieveContext(retrievalQuery, 5);
      if (retrievedChunks.length === 0) {
        retrievedChunks = keywordSearch(retrievalQuery, 3);
      }
      sources = extractSources(retrievedChunks);
      if (retrievedChunks.length === 0) {
        console.log('[Chat API] No relevant content found for:', retrievalQuery.substring(0, 80));
      }
    } catch (ragError) {
      console.error('[Chat API] RAG retrieval failed, continuing without context:', ragError);
    }

    const retrievedContext = formatContextForPrompt(retrievedChunks);
    const systemPrompt = buildSystemPrompt(retrievedContext, currentLanguage);

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      {
        role: 'model',
        parts: [
          {
            text: "Understood. I'm Nex, The NextGen Healthcare Marketing assistant. I'll answer using the retrieved website content and follow all guidelines.",
          },
        ],
      },
      ...recentMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    ];

    let reply = '';
    let usedFallback = false;
    let fallbackMatchedIntent = false;

    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
      console.error('[Chat API] GEMINI_API_KEY is not configured.');
      usedFallback = true;
      const fallbackDecision = fallbackReply(
        latestUserMessage,
        recentUserMessages,
        currentLanguage,
      );
      reply = fallbackDecision.reply;
      fallbackMatchedIntent = fallbackDecision.matchedIntent;
    } else {
      try {
        console.log(
          '[Chat API] Calling Gemini with',
          recentMessages.length,
          'messages and',
          retrievedChunks.length,
          'RAG chunks',
        );

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
            body: JSON.stringify({
              contents,
              generationConfig: {
                maxOutputTokens: 600,
                temperature: 0.7,
              },
            }),
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[Chat API] Gemini API error:', response.status, errorText);
          usedFallback = true;
          const fallbackDecision = fallbackReply(
            latestUserMessage,
            recentUserMessages,
            currentLanguage,
          );
          reply = fallbackDecision.reply;
          fallbackMatchedIntent = fallbackDecision.matchedIntent;
        } else {
          const data = await response.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!generatedText || generatedText.trim() === '') {
            console.warn('[Chat API] Gemini returned empty response, using fallback');
            usedFallback = true;
            const fallbackDecision = fallbackReply(
              latestUserMessage,
              recentUserMessages,
              currentLanguage,
            );
            reply = fallbackDecision.reply;
            fallbackMatchedIntent = fallbackDecision.matchedIntent;
          } else {
            reply = generatedText;
            console.log('[Chat API] Gemini response OK (%d RAG chunks used)', retrievedChunks.length);
          }
        }
      } catch (error) {
        console.error('[Chat API] Gemini API call failed:', error);
        usedFallback = true;
        const fallbackDecision = fallbackReply(
          latestUserMessage,
          recentUserMessages,
          currentLanguage,
        );
        reply = fallbackDecision.reply;
        fallbackMatchedIntent = fallbackDecision.matchedIntent;
      }
    }

    isUnanswered = retrievedChunks.length === 0 && usedFallback && !fallbackMatchedIntent;

    if (isUnanswered && latestUserMessage.length > 5) {
      try {
        await prisma.unansweredQuestion.create({
          data: {
            question: latestUserMessage.substring(0, 500),
            sessionId: session?.id,
          },
        });
      } catch (dbError) {
        console.error('Unanswered question logging skipped:', dbError);
      }
    }

    if (session) {
      try {
        await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            role: 'assistant',
            content: reply,
          },
        });
      } catch (dbError) {
        console.error('Assistant chat message persistence skipped:', dbError);
      }
    }

    const fullConversation: Message[] = [
      ...messages,
      { role: 'assistant', content: reply } as Message,
    ];
    const { summary, report } = summarizeConversation(fullConversation, currentLanguage);

    if (session) {
      try {
        await prisma.chatSession.update({
          where: { id: session.id },
          data: { summary, report, language: currentLanguage },
        });
      } catch (dbError) {
        console.error('Chat session summary update skipped:', dbError);
      }
    }

    return NextResponse.json({ reply, sources, fallback: usedFallback, unanswered: isUnanswered });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply:
        "Oops, I hit a small snag! Please try again, or reach out to us at https://thenextgenhealth.com/contact. I'm Nex, and I'm here whenever you're ready! 😊",
      sources: [],
      fallback: true,
      unanswered: false,
    });
  }
}
