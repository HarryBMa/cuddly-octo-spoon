import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { Tabs } from '@skeletonlabs/skeleton-react';
import '@radix-ui/themes/styles.css';
import './index.css';
import './nav.css';
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
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const today = new Date();
  const dayName = weekdays[selectedDay];
  const dateString = today.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

  // Responsive: show 5 rooms at once, flex layout
  const SelectedView = weekdayViews[weekdays[selectedDay]] || (() => null);

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 pb-16 pr-4 bg-surface-50-950 box-border overflow-x-hidden">
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
          <div className="flex justify-center w-full max-w-screen-md">
            <Tabs value={weekdays[selectedDay]} onValueChange={e => setSelectedDay(weekdays.indexOf(e.value))}>
              <Tabs.List>
                {weekdays.map((day, idx) => (
                  <Tabs.Control key={day} value={day}>
                    <span className={`fluid text-xs sm:text-sm px-2 py-1 rounded-md transition-all ${selectedDay === idx ? 'bg-primary-500 text-primary-50 z-10 relative' : 'opacity-60'}`}>{day}</span>
                  </Tabs.Control>
                ))}
              </Tabs.List>
            </Tabs>
          </div>
        </div>
      </div>
      <Clock />
      <nav className="nav">
        <input type="checkbox" className="nav__cb" id="menu-cb"/>
        <div className="nav__content">
          <ul className="nav__items">
            <li className="nav__item" onClick={() => { setMenuOpen(false); navigate('/'); }}>
              <span className="nav__item-text">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </span>
            </li>
            <li className="nav__item" onClick={() => { setMenuOpen(false); navigate('/admin'); }}>
              <span className="nav__item-text">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 20h9"/><path d="M12 4h9"/>
                  <rect width="18" height="18" x="3" y="2" rx="2"/>
                </svg>
                Admin
              </span>
            </li>
            <li className="nav__item" onClick={() => { setMenuOpen(false); navigate('/about'); }}>
              <span className="nav__item-text">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                About
              </span>
            </li>
            <li className="nav__item" onClick={() => { setMenuOpen(false); navigate('/contact'); }}>
              <span className="nav__item-text">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact
              </span>
            </li>
          </ul>
        </div>
        <label className="nav__btn" htmlFor="menu-cb"></label>
      </nav>
    </div>
  );
}

export default App;
