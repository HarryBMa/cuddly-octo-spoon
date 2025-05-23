import { useEffect, useState } from 'react';
import './clock.css';

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const DigitSegment = ({ digit }: { digit: number }) => {
  const digitClass = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
  ][digit];

  return (
    <div className={digitClass}>
      <span className="d1"></span>
      <span className="d2"></span>
      <span className="d3"></span>
      <span className="d4"></span>
      <span className="d5"></span>
      <span className="d6"></span>
      <span className="d7"></span>
    </div>
  );
};

export default function Clock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      day: now.getDay()
    };
  });

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Watch for theme changes by observing the html element's class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          const isDark = htmlElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Initial theme check
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        day: now.getDay()
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert numbers to padded strings
  const hours = time.hours.toString().padStart(2, '0');
  const minutes = time.minutes.toString().padStart(2, '0');
  const seconds = time.seconds.toString().padStart(2, '0');
  
  // Adjust day index (0 = Sunday) to match MON-SUN format
  const adjustedDay = time.day === 0 ? 6 : time.day - 1;

  return (
    <div id="clock" className={theme}>
      <div className="display">
        <div className="weekdays">
          {WEEKDAYS.map((day, index) => (
            <span key={day} className={index === adjustedDay ? 'active' : ''}>
              {day}
            </span>
          ))}
        </div>
        <div className="digits">
          <DigitSegment digit={parseInt(hours[0])} />
          <DigitSegment digit={parseInt(hours[1])} />
          <div className="dots"></div>
          <DigitSegment digit={parseInt(minutes[0])} />
          <DigitSegment digit={parseInt(minutes[1])} />
          <div className="dots"></div>
          <DigitSegment digit={parseInt(seconds[0])} />
          <DigitSegment digit={parseInt(seconds[1])} />
        </div>
      </div>
    </div>
  );
}
