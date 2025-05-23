import { useState, useEffect } from 'react';
import LightToggle from './LightToggle';
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
	const [dark] = useState(false);

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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-swatch-book size-5"
				>
					<path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"></path>
					<path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"></path>
					<path d="M 7 17h.01"></path>
					<path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"></path>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-chevron-down size-4 opacity-60"
				>
					<path d="m6 9 6 6 6-6"></path>
				</svg>
			</button>
			{open && (
				<div
					className="card max-h-[60vh] overflow-y-auto bg-surface-50-950 border border-surface-200-800 space-y-4 p-4 absolute right-0 top-12 z-50 w-72 shadow-xl"
					role="dialog"
					style={{ minWidth: 'min(100vw, 260px)' }}
				>
					<div className="flex items-center justify-between mb-2">
						<span className="font-bold">Theme Mode</span>
						<LightToggle />
					</div>
					<div className="flex flex-col gap-2 overflow-y-auto">
						{themes.map((t) => (
							<button
								key={t.name}
								data-theme={t.name}
								className={`w-full flex items-center gap-3 bg-surface-50-950 p-2 preset-outlined-surface-100-900 hover:preset-outlined-surface-950-50 rounded-md transition-all ${
									theme === t.name
										? 'preset-outlined-surface-500 ring-2 ring-primary-500'
										: ''
								}`}
								onClick={() => {
									setTheme(t.name);
									setOpen(false);
								}}
							>
								<span className="text-lg w-6 text-center">{t.emoji}</span>
								<span className="flex-1 text-sm font-bold text-left truncate">
									{t.name}
								</span>
								<span className="flex gap-1">
									<span className="inline-block w-4 h-4 rounded-full bg-primary-500 border border-black/10"></span>
									<span className="inline-block w-4 h-4 rounded-full bg-secondary-500 border border-black/10"></span>
									<span className="inline-block w-4 h-4 rounded-full bg-tertiary-500 border border-black/10"></span>
								</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ThemeSwitcher;
