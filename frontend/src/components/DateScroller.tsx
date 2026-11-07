import React from 'react';

interface DateScrollerProps {
  selectedDayOffset: number;
  onSelectDate: (offset: number, dateObj: Date) => void;
}

export const DateScroller: React.FC<DateScrollerProps> = ({
  selectedDayOffset,
  onSelectDate
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Generate 10 days array starting from today
  const dates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayLabel = i === 0 ? "Today" : daysOfWeek[d.getDay()];
    const dateNum = `${d.getDate().toString().padStart(2, '0')}, ${months[d.getMonth()]}`;
    return { offset: i, dayLabel, dateNum, dateObj: d };
  });

  return (
    <section className="date-scroller-container">
      <div className="date-scroller">
        {dates.map((item) => (
          <div
            key={item.offset}
            className={`date-card ${selectedDayOffset === item.offset ? 'active' : ''}`}
            onClick={() => onSelectDate(item.offset, item.dateObj)}
          >
            <div className="date-day">{item.dayLabel}</div>
            <div className="date-num">{item.dateNum}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
