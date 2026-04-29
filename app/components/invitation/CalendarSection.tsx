'use client';

import { useMemo } from 'react';

interface CalendarSectionProps {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

export function CalendarSection({ date, time }: CalendarSectionProps) {
  const { year, month, day, dayOfWeek, cells, dDay } = useMemo(() => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dayOfWeek = DOW[d.getDay()];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const firstDow = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    const cells: (number | null)[] = [
      ...Array(firstDow).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    return { year, month, day, dayOfWeek, cells, dDay: diff };
  }, [date]);

  return (
    <section className="inv-section">
      <div className="inv-container">
        <h2 className="inv-title" data-aos="fade-in">결혼식 날짜</h2>

        <div className="inv-calendar" data-aos="fade-in" data-aos-delay="100">
          <p className="inv-calendar__header">
            {year}년&nbsp;{String(month).padStart(2, '0')}월&nbsp;
            {String(day).padStart(2, '0')}일({dayOfWeek})
          </p>

          <hr className="inv-calendar__divider" />

          <div className="inv-calendar__grid">
            {DOW.map((d, i) => (
              <span
                key={d}
                className={`inv-calendar__dow${i === 0 ? ' inv-calendar__dow--sun' : ''}`}
              >
                {d}
              </span>
            ))}

            {cells.map((d, i) => {
              const col = i % 7;
              return (
                <span
                  key={i}
                  className={[
                    'inv-calendar__cell',
                    d === day ? 'inv-calendar__cell--target' : '',
                    col === 0 && d ? 'inv-calendar__cell--sun' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {d ?? ''}
                </span>
              );
            })}
          </div>

          {/* <p className="inv-calendar__time">{time}</p> */}

          <div className="inv-calendar__dday">
            <span className="inv-calendar__dday-label">
              {dDay === 0 ? '오늘이 결혼식 날입니다' : dDay > 0 ? '결혼식까지' : '결혼한 지'}
            </span>
            <span className={`inv-calendar__dday-value${dDay <= 0 ? ' inv-calendar__dday-value--past' : ''}`}>
              {dDay === 0 ? 'D-DAY' : dDay > 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
