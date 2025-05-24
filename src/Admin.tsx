import { useState } from 'react';

const weekdayNames = 'MON TUE WED THU FRI SAT SUN'.split(' ');

function Admin() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  // TODO: Add state for rooms and staff, and drag-and-drop logic
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="flex gap-2">
        {weekdayNames.map((day, idx) => (
          <button
            key={day}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedDay === idx
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            }`}
            onClick={() => setSelectedDay(idx)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Admin;
