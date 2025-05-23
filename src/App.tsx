import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { Tabs } from '@skeletonlabs/skeleton-react';
import '@radix-ui/themes/styles.css';
import './index.css';
import Clock from './Clock';
import Måndag from './Måndag';
import Tisdag from './Tisdag';
import Onsdag from './Onsdag';
import Torsdag from './Torsdag';
import Fredag from './Fredag';
import Lördag from './Lördag';
import Söndag from './Söndag';

const weekdays = [
  'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'
];

const demoRooms = [
  {
    number: 'Sal 1',
    type: 'Ortopedi',
    staff: [
      { name: 'Dr. Anna Svensson', role: 'Operatör', time: '07:00-15:00' },
      { name: 'Maria Andersson', role: 'Op.sjuksköterska', time: '07:00-15:00' },
      { name: 'Erik Nilsson', role: 'Anestesiläkare', time: '08:00-12:00', extra: true },
    ]
  },
  {
    number: 'Sal 2',
    type: 'Allmänkirurgi',
    staff: [
      { name: 'Dr. Lars Pettersson', role: 'Operatör', time: '08:00-16:00' },
      { name: 'Sara Johansson', role: 'Op.sjuksköterska', time: '08:00-16:00' },
      { name: 'Thomas Berg', role: 'Anestesisköterska', time: '07:30-15:30' },
    ]
  },
  {
    number: 'Sal 3',
    type: 'Kardiologi',
    staff: [
      { name: 'Dr. Emma Lindström', role: 'Operatör', time: '09:00-17:00' },
      { name: 'Karl Gustafsson', role: 'Op.sjuksköterska', time: '10:00-14:00', extra: true },
    ]
  },
  {
    number: 'Sal 4',
    type: 'Neurokirurgi',
    staff: []
  }
];

const weekdayViews: Record<string, React.FC> = {
  Måndag,
  Tisdag,
  Onsdag,
  Torsdag,
  Fredag,
  Lördag,
  Söndag,
};

function App() {
  const [rooms] = useState(demoRooms);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const today = new Date();
  const dayName = weekdays[selectedDay];
  const dateString = today.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

  // Responsive: show 5 rooms at once, flex layout
  const SelectedView = weekdayViews[weekdays[selectedDay]] || (() => null);

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 pb-16 pr-4 bg-surface-50-950 box-border">
      <header className="flex flex-wrap justify-end items-center gap-2 mb-4">
        <ThemeSwitcher />
      </header>
      <div className="flex flex-col items-center w-full">
        <div className="header text-center text-primary-900 mb-4">
          <span className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow">
            Idag är det {dayName} {dateString}
          </span>
        </div>
        <div className="schedule-container flex flex-wrap justify-center gap-4 max-w-screen-xl mx-auto">
          {rooms.slice(0, 5).map((room, idx) => (
            <div key={idx} className="operation-room card flex flex-col w-72 min-w-[220px] max-w-xs flex-shrink-0 overflow-hidden transition-transform hover:-translate-y-1">
              <div className="room-header bg-primary-500 text-primary-50 p-4 text-center flex flex-col items-center">
                <div className="room-number text-lg sm:text-2xl font-bold mb-1">{room.number}</div>
                <div className="room-type text-xs sm:text-sm opacity-90">{room.type}</div>
              </div>
              <div className="staff-list flex flex-col gap-2 p-4">
                {room.staff.length === 0 ? (
                  <div className="no-staff text-center text-surface-500 italic py-4">Ingen personal inplanerad</div>
                ) : (
                  room.staff.map((staff, sidx) => (
                    <div key={sidx} className={`staff-member flex items-center justify-between gap-2 mb-1 p-2 rounded-lg border-l-4 ${staff.extra ? 'border-error-500 bg-error-50' : 'border-primary-300 bg-surface-100'} transition-all hover:bg-surface-200`}>
                      <div className="staff-info flex-1 min-w-0">
                        <div className="staff-name font-bold text-surface-900 text-xs sm:text-base truncate">
                          {staff.name} {staff.extra && <span className="extra-indicator bg-error-500 text-error-50 px-2 py-0.5 rounded-lg text-xs ml-2">EXTRA</span>}
                        </div>
                        <div className="staff-role text-xs text-surface-500">{staff.role}</div>
                      </div>
                      <div className="staff-time bg-surface-200 px-2 py-1 rounded-full text-xs sm:text-sm font-medium text-surface-700 whitespace-nowrap">{staff.time}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <SelectedView />
        <Clock />
        <div className="w-full flex flex-col items-center mt-8">
          <hr className="my-4 border-surface-300 w-full max-w-screen-md" />
          <Tabs value={weekdays[selectedDay]} onValueChange={e => setSelectedDay(weekdays.indexOf(e.value))}>
            <Tabs.List>
              {weekdays.map((day, idx) => (
                <Tabs.Control key={day} value={day}>
                  <span className={`text-xs sm:text-sm px-2 py-1 rounded-md transition-all ${selectedDay === idx ? 'bg-primary-500 text-primary-50 z-10 relative' : 'opacity-60'}`}>{day}</span>
                </Tabs.Control>
              ))}
            </Tabs.List>
          </Tabs>
        </div>
      </div>
      <Clock />
      {/* Floating menu button in lower right */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="rounded-full w-16 h-16 bg-primary-500 text-primary-50 shadow-lg flex items-center justify-center text-3xl hover:bg-primary-600 transition-all focus:outline-none"
          aria-label="Öppna meny"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Öppna meny</span>
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        </button>
        {menuOpen && (
          <div className="absolute bottom-20 right-0 bg-surface-50-950 border border-surface-200-800 rounded-xl shadow-xl py-2 w-48 flex flex-col animate-fade-in">
            <button
              className="w-full text-left px-4 py-3 hover:bg-primary-100 rounded-xl text-primary-900 font-semibold flex items-center gap-2"
              onClick={() => { setMenuOpen(false); navigate('/admin'); }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4h9"/><rect width="18" height="18" x="3" y="2" rx="2"/></svg>
              Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
