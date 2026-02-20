'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Circle } from 'lucide-react';

const festivals: Record<string, string> = {
    '2026-03-25': '🎆 Holi',
    '2026-04-14': '🌟 Ugadi',
    '2026-04-14_2': '🌟 Tamil New Year',
    '2026-08-15': '🇮🇳 Independence Day',
    '2026-11-14': '✨ Diwali',
    '2026-12-25': '🎄 Christmas',
    '2026-01-26': '🇮🇳 Republic Day',
    '2026-02-14': '❤️ Valentine\'s Day',
};

const sampleData: Record<string, 'completed' | 'scheduled' | 'missed'> = {
    '2026-02-01': 'completed', '2026-02-02': 'completed', '2026-02-03': 'completed',
    '2026-02-04': 'missed', '2026-02-05': 'completed', '2026-02-06': 'completed',
    '2026-02-07': 'scheduled', '2026-02-08': 'scheduled', '2026-02-10': 'scheduled',
    '2026-02-12': 'scheduled', '2026-02-15': 'scheduled', '2026-02-20': 'scheduled',
};

export default function CalendarPage() {
    const today = new Date('2026-02-20');
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const getStatus = (dateStr: string) => {
        if (festivals[dateStr]) return 'festival';
        return sampleData[dateStr] || 'empty';
    };

    const statusColors: Record<string, string> = {
        completed: '#10b981', scheduled: '#6c63ff', missed: '#ef4444', festival: '#f59e0b', empty: 'transparent',
    };

    return (
        <div className="calendar-page animate-fade-in">
            {/* Legend */}
            <div className="legend">
                {[['completed', '#10b981', 'Completed'], ['scheduled', '#6c63ff', 'Scheduled'], ['missed', '#ef4444', 'Missed'], ['festival', '#f59e0b', 'Festival']].map(([key, color, label]) => (
                    <div key={key} className="legend-item">
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color as string }} />
                        <span>{label}</span>
                    </div>
                ))}
            </div>

            {/* Calendar */}
            <div className="glass-card calendar-card">
                <div className="cal-header">
                    <button className="btn btn-ghost btn-icon" onClick={prevMonth} id="prev-month"><ChevronLeft size={18} /></button>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem' }}>{monthNames[month]} {year}</h3>
                    <button className="btn btn-ghost btn-icon" onClick={nextMonth} id="next-month"><ChevronRight size={18} /></button>
                </div>

                <div className="day-names">
                    {dayNames.map(d => <div key={d} className="day-name">{d}</div>)}
                </div>

                <div className="days-grid">
                    {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const dateStr = getDateStr(day);
                        const status = getStatus(dateStr);
                        const isToday = dateStr === '2026-02-20';
                        const isSelected = selectedDay === dateStr;
                        return (
                            <div key={day} className={`day-cell ${status} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                                style={{ '--sc': statusColors[status] } as any}
                            >
                                <div className="day-num">{day}</div>
                                {status !== 'empty' && <div className="status-dot" style={{ background: statusColors[status] }} />}
                                {festivals[dateStr] && <div className="festival-label">{festivals[dateStr].split(' ')[0]}</div>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Selected Day Detail */}
            {selectedDay && (
                <div className="glass-card day-detail animate-slide-up">
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                        <CalIcon size={16} style={{ marginRight: 6, color: 'var(--primary)', verticalAlign: 'middle' }} />
                        {selectedDay}
                        {festivals[selectedDay] && <span className="badge badge-accent" style={{ marginLeft: 8 }}>{festivals[selectedDay]}</span>}
                    </div>
                    {sampleData[selectedDay] ? (
                        <div>
                            <span className={`badge ${sampleData[selectedDay] === 'completed' ? 'badge-success' : sampleData[selectedDay] === 'scheduled' ? 'badge-primary' : 'badge-danger'}`}>
                                {sampleData[selectedDay]}
                            </span>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                {sampleData[selectedDay] === 'completed' ? '✅ Post was published successfully!' :
                                    sampleData[selectedDay] === 'scheduled' ? '⏰ Post scheduled for today. Click Generate to create content.' :
                                        '❌ No post was made this day.'}
                            </p>
                        </div>
                    ) : <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>No content scheduled for this day.</p>}
                </div>
            )}

            {/* Monthly Summary */}
            <div className="summary-row">
                {[
                    { label: 'Completed', value: Object.values(sampleData).filter(s => s === 'completed').length, color: '#10b981' },
                    { label: 'Scheduled', value: Object.values(sampleData).filter(s => s === 'scheduled').length, color: '#6c63ff' },
                    { label: 'Missed', value: Object.values(sampleData).filter(s => s === 'missed').length, color: '#ef4444' },
                    { label: 'Festivals', value: 4, color: '#f59e0b' },
                ].map(({ label, value, color }) => (
                    <div key={label} className="stat-card" style={{ borderTop: `3px solid ${color}`, textAlign: 'center' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-display)', color }}>{value}</div>
                        <div className="stat-label">{label}</div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .calendar-page { display:flex; flex-direction:column; gap:1.25rem; }
        .legend { display:flex; flex-wrap:wrap; gap:1rem; }
        .legend-item { display:flex; align-items:center; gap:6px; font-size:0.78rem; color:var(--text2); }
        .cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; }
        .day-names { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; margin-bottom:4px; }
        .day-name { text-align:center; font-size:0.72rem; font-weight:700; color:var(--text3); padding:4px 0; }
        .days-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
        .day-cell {
          aspect-ratio:1; display:flex; flex-direction:column; align-items:center;
          justify-content:center; border-radius:8px; cursor:pointer;
          border:2px solid transparent; position:relative;
          transition:all var(--transition); background:var(--bg3);
        }
        .day-cell:hover { border-color:var(--border); }
        .day-cell.today { border-color:var(--primary); background:rgba(108,99,255,0.1); }
        .day-cell.selected { border-color:var(--primary); box-shadow:0 0 0 2px rgba(108,99,255,0.3); }
        .day-cell.festival { background:rgba(245,158,11,0.1); }
        .day-num { font-size:0.78rem; font-weight:600; }
        .status-dot { width:5px; height:5px; border-radius:50%; margin-top:2px; }
        .festival-label { font-size:0.55rem; margin-top:1px; }
        .summary-row { display:grid; grid-template-columns:repeat(4,1fr); gap:0.75rem; }
        @media(max-width:500px){.summary-row{grid-template-columns:repeat(2,1fr);}}
      `}</style>
        </div>
    );
}
