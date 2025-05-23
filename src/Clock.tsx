import { useEffect, useState } from 'react';

const pad = (n: number) => n.toString().padStart(2, '0');

export default function Clock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-surface-900 text-surface-50 rounded-lg px-4 py-2 shadow-lg text-lg font-mono z-50 select-none opacity-90">
      {time}
    </div>
  );
}
