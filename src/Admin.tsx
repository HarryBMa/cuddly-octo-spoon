import { useState } from 'react';
import { Tabs } from '@skeletonlabs/skeleton-react';

const weekdays = [
  'Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'
];

export default function Admin() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  // TODO: Add state for rooms and staff, and drag-and-drop logic
  return (
    <div className="min-h-screen flex flex-col p-4 bg-surface-50-950">
      <h1 className="text-2xl font-bold mb-4">Admin: Planera bemanning</h1>
      {/* TODO: Add draggable staff cards and room columns here */}
      <div className="mt-auto w-full">
        <hr className="my-4 border-surface-300" />
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
  );
}
