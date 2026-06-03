import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon, ChevronRightIcon } from './icons';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const SAMPLE_TIMES = ['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const { t, i18n } = useTranslation('common');
  const locale = (i18n.language || 'en').split('-')[0] === 'es' ? 'es-ES' : 'en-US';
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Reset confirmed state when modal reopens.
  useEffect(() => {
    if (!open) {
      setConfirmed(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setEmail('');
      setErrorMsg(null);
      setSubmitting(false);
      setBookingId(null);
    }
  }, [open]);

  const isAtCurrentMonth =
    view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  const firstDay = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const isRescheduling = bookingId !== null;

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !emailValid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/bookings', {
        method: isRescheduling ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isRescheduling ? { id: bookingId } : {}),
          email: email.trim(),
          date: formattedDate,
          time: selectedTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          source: 'booking-modal',
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || 'request failed');
      }
      const data = (await res.json().catch(() => ({}))) as { booking?: { id?: number } };
      if (!isRescheduling && data?.booking?.id) setBookingId(data.booking.id);
      setConfirmed(true);
    } catch {
      setErrorMsg(t('booking.submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  // Return to the calendar to pick a new slot for the booking just made,
  // keeping the email + booking id so confirming updates the same record.
  const handleReschedule = () => {
    setConfirmed(false);
    setSelectedTime(null);
    setErrorMsg(null);
  };

  const confirmLabel = selectedDate
    ? selectedTime
      ? t('booking.confirmFormat', {
          date: selectedDate.toLocaleDateString(locale, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          time: selectedTime,
        })
      : t('booking.confirmPickTime')
    : t('booking.confirmSelectDateTime');

  return (
    <div
      className={`modal-backdrop${open ? ' is-open' : ''}`}
      id="bookingModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="document">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label={t('booking.closeAriaLabel')}
        >
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <aside className="modal-info">
          <span className="modal-eyebrow">
            {confirmed ? t('booking.eyebrowConfirmed') : t('booking.eyebrowBeforeBook')}
          </span>
          <h3 id="modalTitle" className="modal-title">
            {confirmed ? t('booking.titleConfirmed') : t('booking.titleBeforeBook')}
          </h3>
          <p className="modal-text">
            {confirmed ? (
              <>
                {t('booking.descriptionConfirmedPrefix')} <strong>{formattedDate}</strong>{' '}
                {t('booking.descriptionConfirmedJoin')} <strong>{selectedTime}</strong>
                {t('booking.descriptionConfirmedSuffix')}
              </>
            ) : (
              t('booking.descriptionBeforeBook')
            )}
          </p>
          <ul className="modal-list">
            {(confirmed
              ? [
                  t('booking.listConfirmed.invite'),
                  t('booking.listConfirmed.preview'),
                  t('booking.listConfirmed.prep'),
                ]
              : [
                  t('booking.listBeforeBook.audit'),
                  t('booking.listBeforeBook.roadmap'),
                  t('booking.listBeforeBook.compliance'),
                ]
            ).map((item) => (
              <li key={item}>
                <span className="check" aria-hidden="true">
                  <svg
                    width={11}
                    height={11}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          {confirmed && (
            <button
              type="button"
              onClick={handleReschedule}
              style={{
                marginTop: 4,
                marginBottom: 4,
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 999,
                border: '1px solid rgba(87,109,181,0.35)',
                background: '#fff',
                color: '#576DB5',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {t('booking.reschedule')}
            </button>
          )}
          <div className="modal-foot">
            {confirmed ? t('booking.footConfirmed') : t('booking.footBeforeBook')}
          </div>
        </aside>

        <div className="modal-cal">
          {confirmed ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                padding: '12px 4px',
                minHeight: 380,
              }}
              aria-live="polite"
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 12px',
                  borderRadius: 999,
                  background: 'rgba(143,188,143,0.18)',
                  color: '#2D5A3D',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: '#2D5A3D',
                    color: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width={11}
                    height={11}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {t('booking.confirmedBadge')}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#718096',
                    marginBottom: 6,
                  }}
                >
                  {t('booking.yourCallHeading')}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    fontWeight: 700,
                    color: '#1A2438',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {formattedDate}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: '#576DB5',
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {selectedTime}
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 12,
                  padding: '16px 0',
                  borderTop: '1px solid rgba(45,55,72,0.08)',
                  borderBottom: '1px solid rgba(45,55,72,0.08)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#718096',
                      marginBottom: 4,
                    }}
                  >
                    {t('booking.formatLabel')}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#2D3748' }}>
                    {t('booking.formatValue')}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#718096',
                      marginBottom: 4,
                    }}
                  >
                    {t('booking.specialistLabel')}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#2D3748' }}>
                    {t('booking.specialistValue')}
                  </div>
                </div>
              </div>
              <button type="button" className="cal-confirm" onClick={onClose}>
                <span>{t('buttons.close')}</span>
                <span className="ico" aria-hidden="true">
                  <ArrowIcon size={14} />
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="cal-head">
                <span className="cal-month">
                  {t(`booking.months.${view.getMonth()}`)} {view.getFullYear()}
                </span>
                <div className="cal-nav">
                  <button
                    type="button"
                    onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                    disabled={isAtCurrentMonth}
                    aria-label={t('booking.prevMonthAriaLabel')}
                  >
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                    aria-label={t('booking.nextMonthAriaLabel')}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>

              <div className="cal-weekdays">
                <span>{t('booking.weekdays.sun')}</span>
                <span>{t('booking.weekdays.mon')}</span>
                <span>{t('booking.weekdays.tue')}</span>
                <span>{t('booking.weekdays.wed')}</span>
                <span>{t('booking.weekdays.thu')}</span>
                <span>{t('booking.weekdays.fri')}</span>
                <span>{t('booking.weekdays.sat')}</span>
              </div>

              <div className="cal-grid" role="grid" aria-label={t('booking.datesGridAriaLabel')}>
                {Array.from({ length: firstDay }).map((_, i) => (
                  <button
                    key={`blank-${i}`}
                    className="cal-day is-empty"
                    disabled
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                  const date = new Date(view.getFullYear(), view.getMonth(), d);
                  const isPast = date < today;
                  const dayOfWeek = date.getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                  const isToday = date.getTime() === today.getTime();
                  const isSelected = selectedDate?.getTime() === date.getTime();
                  const disabled = isPast || isWeekend;

                  const cls = [
                    'cal-day',
                    isPast && 'is-past',
                    !isPast && isWeekend && 'is-disabled',
                    isToday && 'is-today',
                    isSelected && 'is-selected',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <button
                      key={d}
                      type="button"
                      className={cls}
                      disabled={disabled}
                      onClick={() => handleSelectDate(date)}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              <div className="cal-times" aria-label={t('booking.timesAriaLabel')}>
                {selectedDate ? (
                  SAMPLE_TIMES.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`cal-time${selectedTime === time ? ' is-selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <div className="cal-times-empty">{t('booking.timesEmpty')}</div>
                )}
              </div>

              {selectedTime && (
                <div style={{ marginTop: 14, marginBottom: 4 }}>
                  <label
                    htmlFor="booking-email"
                    style={{
                      display: 'block',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#718096',
                      marginBottom: 6,
                    }}
                  >
                    {t('booking.emailLabel')}
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder={t('booking.emailPlaceholder')}
                    aria-invalid={!!errorMsg}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `1px solid ${errorMsg ? '#C0392B' : 'rgba(45,55,72,0.18)'}`,
                      fontSize: 14,
                      color: '#2D3748',
                      outline: 'none',
                      background: '#fff',
                    }}
                  />
                  {errorMsg && (
                    <div style={{ color: '#C0392B', fontSize: 12, marginTop: 6 }}>{errorMsg}</div>
                  )}
                </div>
              )}

              <button
                type="button"
                className="cal-confirm"
                disabled={!selectedDate || !selectedTime || !emailValid || submitting}
                onClick={handleConfirm}
              >
                <span>{submitting ? t('booking.submitting') : confirmLabel}</span>
                <span className="ico" aria-hidden="true">
                  <ArrowIcon size={14} />
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
