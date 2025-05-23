import { useState, useEffect } from 'react';

const themes = [
  { name: 'catppuccin', emoji: '🐈' },
  { name: 'cerberus', emoji: '🐺' },
  { name: 'concord', emoji: '🤖' },
  { name: 'crimson', emoji: '🔴' },
  { name: 'fennec', emoji: '🦊' },
  { name: 'hamlindigo', emoji: '👔' },
  { name: 'legacy', emoji: '💀' },
  { name: 'mint', emoji: '🍃' },
  { name: 'modern', emoji: '🌸' },
  { name: 'mona', emoji: '🐙' },
  { name: 'nosh', emoji: '🥙' },
  { name: 'nouveau', emoji: '👑' },
  { name: 'pine', emoji: '🌲' },
  { name: 'reign', emoji: '📒' },
  { name: 'rocket', emoji: '🚀' },
  { name: 'rose', emoji: '🌷' },
  { name: 'sahara', emoji: '🏜️' },
  { name: 'seafoam', emoji: '🧜‍♀️' },
  { name: 'terminus', emoji: '🌑' },
  { name: 'vintage', emoji: '📺' },
  { name: 'vox', emoji: '👾' },
  { name: 'wintry', emoji: '🌨️' },
];

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('cerberus');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', dark ? 'dark' : 'light');
  }, [theme, dark]);

  return (
    <div className="relative inline-block text-left">
      <button
        className="btn hover:preset-tonal gap-1"
        title="Choose Theme"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-swatch-book xl:hidden size-5"><path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"></path><path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"></path><path d="M 7 17h.01"></path><path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"></path></svg>
        <span className="hidden xl:inline">Theme</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down size-4 opacity-60"><path d="m6 9 6 6 6-6"></path></svg>
      </button>
      {open && (
        <div className="card max-h-[75vh] overflow-y-auto bg-surface-50-950 border border-surface-200-800 space-y-4 p-4 pr-2 absolute z-10 mt-2 w-72" role="dialog">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Theme Mode</span>
            <button
              className="btn btn-sm"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {dark ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
            {themes.map((t) => (
              <button
                key={t.name}
                data-theme={t.name}
                className={`w-full bg-surface-50-950 p-3 preset-outlined-surface-100-900 hover:preset-outlined-surface-950-50 rounded-md grid grid-cols-[auto_1fr_auto] items-center gap-4 ${theme === t.name ? 'preset-outlined-surface-500' : ''}`}
                onClick={() => { setTheme(t.name); setOpen(false); }}
              >
                <span>{t.emoji}</span>
                <h3 className="text-sm capitalize font-bold text-left">{t.name}</h3>
                <div className="flex justify-center items-center -space-x-1.5">
                  <div className="aspect-square w-4 bg-primary-500 border-[1px] border-black/10 rounded-full"></div>
                  <div className="aspect-square w-4 bg-secondary-500 border-[1px] border-black/10 rounded-full"></div>
                  <div className="aspect-square w-4 bg-tertiary-500 border-[1px] border-black/10 rounded-full"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
