import React, { useEffect, useState } from 'react';
import { Switch } from '@skeletonlabs/skeleton-react';
import { Moon as IconMoon, Sun as IconSun } from 'lucide-react';

const LightToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem('mode') || 'light';
    setChecked(mode === 'dark');
  }, []);

  const onCheckedChange = (event: { checked: boolean }) => {
    const mode = event.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('mode', mode);
    setChecked(event.checked);
  };

  return (
    <Switch
      name="mode"
      controlActive="bg-surface-900"
      checked={checked}
      onCheckedChange={onCheckedChange}
      inactiveChild={<IconMoon size="14" />}
      activeChild={<IconSun size="14" />}
    />
  );
};

export default LightToggle;