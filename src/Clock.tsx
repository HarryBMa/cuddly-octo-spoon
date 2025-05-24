import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './clock.css';

const Clock: React.FC = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const digitToName = 'zero one two three four five six seven eight nine'.split(' ');
  const weekdayNames = 'MON TUE WED THU FRI SAT SUN'.split(' ');
  const currentTime = time.format('HHmmss');
  const dayOfWeek = (time.day() + 6) % 7; // Adjust to make Monday first

  const renderDigit = (digit: string, position: string) => {
    const digitClass = digitToName[parseInt(digit)];
    return (
      <div key={position} className={digitClass}>
        {[...Array(7)].map((_, i) => (
          <span key={i} className={`d${i + 1}`} />
        ))}
      </div>
    );
  };

  return (
    <div id="clock">
      <div className="display">
        <div className="digits">
          {renderDigit(currentTime[0], 'h1')}
          {renderDigit(currentTime[1], 'h2')}
          <div className="dots" />
          {renderDigit(currentTime[2], 'm1')}
          {renderDigit(currentTime[3], 'm2')}
          <div className="dots" />
          {renderDigit(currentTime[4], 's1')}
          {renderDigit(currentTime[5], 's2')}
        </div>
        <div className="weekdays">
          {weekdayNames.map((day, index) => (
            <span key={day} className={index === dayOfWeek ? 'active' : ''}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clock;
