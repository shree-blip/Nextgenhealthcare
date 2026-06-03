import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      totalClinics,
      totalPosts,
      totalNews,
      totalLeads,
      totalSubscribers,
      totalChatSessions,
      totalChatMessages,
      recentLeads24h,
      recentUsers7d,
      recentPosts7d,
      connectedClinics,
      activeSessions7d,
      recentLeadsFeed,
      recentUsersFeed,
      recentPostsFeed,
      recentChatsFeed,
      recentNewsFeed,
      recentSubsFeed,
      publishedPosts,
      draftPosts,
      publishedNews,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      closedLeads,
      totalBookings,
      recentBookings7d,
      recentBookingsFeed,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.clinic.count(),
      prisma.post.count(),
      prisma.newsArticle.count(),
      prisma.contactLead.count(),
      prisma.newsletterSubscriber.count({ where: { active: true } }),
      prisma.chatSession.count(),
      prisma.chatMessage.count(),
      prisma.contactLead.count({ where: { createdAt: { gte: twentyFourHoursAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.post.count({ where: { publishedAt: { gte: sevenDaysAgo } } }),
      prisma.gMBConnection.count({ where: { connectionStatus: 'connected' } }),
      prisma.chatSession.count({ where: { startedAt: { gte: sevenDaysAgo } } }),
      prisma.contactLead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          businessType: true,
          createdAt: true,
        },
      }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
      prisma.post.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 5,
        select: { id: true, title: true, publishedAt: true },
      }),
      prisma.chatSession.findMany({
        orderBy: { startedAt: 'desc' },
        take: 5,
        include: { _count: { select: { messages: true } } },
      }),
      prisma.newsArticle.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 3,
        select: { id: true, title: true, publishedAt: true },
      }),
      prisma.newsletterSubscriber.findMany({
        orderBy: { subscribedAt: 'desc' },
        take: 3,
        where: { active: true },
        select: { id: true, email: true, source: true, subscribedAt: true },
      }),
      prisma.post.count({ where: { publishedAt: { not: null } } }),
      prisma.post.count({ where: { publishedAt: null } }),
      prisma.newsArticle.count({ where: { publishedAt: { not: null } } }),
      prisma.contactLead.count({ where: { status: 'new' } }),
      prisma.contactLead.count({ where: { status: 'contacted' } }),
      prisma.contactLead.count({ where: { status: 'qualified' } }),
      prisma.contactLead.count({ where: { status: 'closed' } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          email: true,
          name: true,
          date: true,
          time: true,
          timezone: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const activityFeed = [
      ...recentLeadsFeed.map((l) => ({
        type: 'lead' as const,
        icon: 'mail',
        title: `New lead: ${l.name}`,
        detail: l.businessType || l.email,
        status: l.status,
        timestamp: l.createdAt,
      })),
      ...recentUsersFeed.map((u) => ({
        type: 'user' as const,
        icon: 'user',
        title: `User registered: ${u.name}`,
        detail: u.role,
        status: 'active',
        timestamp: u.createdAt,
      })),
      ...recentPostsFeed.map((p) => ({
        type: 'post' as const,
        icon: 'file',
        title: `Blog: ${p.title?.slice(0, 50)}`,
        detail: p.publishedAt ? 'published' : 'draft',
        status: p.publishedAt ? 'published' : 'draft',
        timestamp: p.publishedAt || new Date(),
      })),
      ...recentChatsFeed.map((c) => ({
        type: 'chat' as const,
        icon: 'message',
        title: `Chat session (${c._count.messages} msgs)`,
        detail: c.summary?.slice(0, 60) || 'No summary',
        status: 'active',
        timestamp: c.startedAt,
      })),
      ...recentNewsFeed.map((n) => ({
        type: 'news' as const,
        icon: 'newspaper',
        title: `News: ${n.title?.slice(0, 50)}`,
        detail: n.publishedAt ? 'published' : 'draft',
        status: n.publishedAt ? 'published' : 'draft',
        timestamp: n.publishedAt || new Date(),
      })),
      ...recentSubsFeed.map((s) => ({
        type: 'subscriber' as const,
        icon: 'bell',
        title: `Newsletter subscriber`,
        detail: s.email,
        status: 'active',
        timestamp: s.subscribedAt,
      })),
      ...recentBookingsFeed.map((b) => ({
        type: 'booking' as const,
        icon: 'calendar',
        title: `Call booked: ${b.email}`,
        detail: `${b.date} · ${b.time}`,
        status: b.status,
        timestamp: b.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20);

    return NextResponse.json({
      counts: {
        users: totalUsers,
        clinics: totalClinics,
        posts: totalPosts,
        news: totalNews,
        leads: totalLeads,
        subscribers: totalSubscribers,
        chatSessions: totalChatSessions,
        chatMessages: totalChatMessages,
        connectedClinics,
        bookings: totalBookings,
      },
      recent: {
        leads24h: recentLeads24h,
        users7d: recentUsers7d,
        posts7d: recentPosts7d,
        sessions7d: activeSessions7d,
        bookings7d: recentBookings7d,
      },
      bookings: recentBookingsFeed,
      content: { publishedPosts, draftPosts, publishedNews },
      leadPipeline: {
        new: newLeads,
        contacted: contactedLeads,
        qualified: qualifiedLeads,
        closed: closedLeads,
      },
      activityFeed,
    });
  } catch (err) {
    console.error('Error fetching platform health:', err);
    return NextResponse.json({ error: 'Failed to fetch platform health' }, { status: 500 });
  }
}
