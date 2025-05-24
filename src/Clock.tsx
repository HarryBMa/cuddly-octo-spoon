import { useState, useEffect } from 'react';
import './clock.css';

const digitToName = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const weekdayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const day = time.getDay();

  return (
    <div id="clock" className="theme-transition">
      <div className="display">
        <div className="digits">
          <div className={digitToName[parseInt(hours[0])]}>
            <span></span>
          </div>
          <div className={digitToName[parseInt(hours[1])]}>
            <span></span>
          </div>
          <div className="dots">
            <span></span>
          </div>
          <div className={digitToName[parseInt(minutes[0])]}>
            <span></span>
          </div>
          <div className={digitToName[parseInt(minutes[1])]}>
            <span></span>
          </div>
          <div className="dots">
            <span></span>
          </div>
          <div className={digitToName[parseInt(seconds[0])]}>
            <span></span>
          </div>
          <div className={digitToName[parseInt(seconds[1])]}>
            <span></span>
          </div>
        </div>
        <div className="weekdays">
          {weekdayNames.map((name, index) => (
            <span key={name} className={index === day ? 'active' : ''}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
