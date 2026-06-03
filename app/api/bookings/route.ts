import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

/**
 * POST /api/bookings  (public)
 *
 * Persists a consultation booking made from the public "Book a free call"
 * modal. Email is required so the team can reach the requester; the selected
 * date + time are stored as display strings. Surfaces in the admin Platform
 * Health page.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, name, date, time, timezone, source } =
      (await req.json().catch(() => ({}))) as Record<string, unknown>;

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (typeof date !== 'string' || !date.trim()) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }
    if (typeof time !== 'string' || !time.trim()) {
      return NextResponse.json({ error: 'Time is required' }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        email: email.trim().toLowerCase().slice(0, 254),
        name: typeof name === 'string' && name.trim() ? name.trim().slice(0, 200) : null,
        date: date.trim().slice(0, 60),
        time: time.trim().slice(0, 40),
        timezone:
          typeof timezone === 'string' && timezone.trim() ? timezone.trim().slice(0, 80) : null,
        source:
          typeof source === 'string' && source.trim() ? source.trim().slice(0, 60) : 'booking-modal',
        status: 'new',
      },
    });

    return NextResponse.json({ message: 'Booking submitted successfully', booking }, { status: 201 });
  } catch (err) {
    console.error('Bookings POST error:', err);
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 });
  }
}

/**
 * GET /api/bookings  (admin only)
 */
export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return NextResponse.json({ bookings, count: bookings.length });
  } catch (err) {
    console.error('Bookings GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
