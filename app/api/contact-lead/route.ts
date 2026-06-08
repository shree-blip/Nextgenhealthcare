import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { notifyLead } from '@server/notifications';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, businessType, budget, message, source } =
      (await req.json().catch(() => ({}))) as Record<string, unknown>;

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const lead = await prisma.contactLead.create({
      data: {
        name: name.trim().slice(0, 200),
        email: email.trim().toLowerCase().slice(0, 254),
        phone: typeof phone === 'string' && phone.trim() ? phone.trim().slice(0, 40) : null,
        businessType:
          typeof businessType === 'string' && businessType.trim()
            ? businessType.trim().slice(0, 120)
            : null,
        budget: typeof budget === 'string' && budget.trim() ? budget.trim().slice(0, 80) : null,
        message:
          typeof message === 'string' && message.trim() ? message.trim().slice(0, 4000) : null,
        source:
          typeof source === 'string' && source.trim()
            ? source.trim().slice(0, 60)
            : 'contact-form',
        status: 'new',
      },
    });

    // Notify the team + confirm to the lead. Never blocks/breaks the response.
    await notifyLead(lead);

    return NextResponse.json({ message: 'Lead submitted successfully', lead }, { status: 201 });
  } catch (err) {
    console.error('Contact-lead POST error:', err);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const leads = await prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ leads, count: leads.length });
  } catch (err) {
    console.error('Contact-lead GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id, status } = (await req.json().catch(() => ({}))) as {
      id?: string | number;
      status?: string;
    };
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    }
    if (!['new', 'contacted', 'qualified', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    const lead = await prisma.contactLead.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json({ lead });
  } catch (err) {
    console.error('Contact-lead PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
