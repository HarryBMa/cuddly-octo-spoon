import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const themes = [
	{ name: 'Claude', emoji: '🤖', value: 'claude' },
	{ name: 'Candyland', emoji: '🍬', value: 'candyland' },
	{ name: 'Caffeine', emoji: '☕', value: 'caffeine' },
	{ name: 'Bold Tech', emoji: '💻', value: 'bold-tech' },
	{ name: 'Midnight Bloom', emoji: '🌙', value: 'midnight-bloom' },
	{ name: 'Claymorphism', emoji: '🏺', value: 'claymorphism' },
	{ name: 'Clean Slate', emoji: '📝', value: 'clean-slate' },
	{ name: 'Cyberpunk', emoji: '🤖', value: 'cyberpunk' },
	{ name: 'Nature', emoji: '🌿', value: 'nature' },
	{ name: 'Northern Lights', emoji: '🌌', value: 'northern-lights' },
	{ name: 'Ocean Breeze', emoji: '🌊', value: 'ocean-breeze' },
	{ name: 'Retro Arcade', emoji: '🎮', value: 'retro-arcade' },
	{ name: 'Sunset Horizon', emoji: '🌅', value: 'sunset-horizon' },
	{ name: 'Neo Brutalism', emoji: '🏗️', value: 'neo-brutalism' },
	{ name: 'Modern Minimal', emoji: '✨', value: 'modern-minimal' },
	{ name: 'Ghibli Studio', emoji: '🎨', value: 'ghibli-studio' },
	{ name: 'Elegant Luxury', emoji: '💎', value: 'elegant-luxury' },
	{ name: 'Corporate', emoji: '💼', value: 'corporate' }
];

const ThemeSwitcher = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [mode, setMode] = useState<'light' | 'dark'>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('theme-mode') as 'light' | 'dark') || 'light';
		}
		return 'light';
	});

	const [selectedTheme, setSelectedTheme] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('selectedTheme') || 'claude';
		}
		return 'claude';
	});

	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(mode);
		root.setAttribute('data-theme', mode);
		localStorage.setItem('theme-mode', mode);
	}, [mode]);

	useEffect(() => {
		const root = window.document.documentElement;
		themes.forEach(t => root.classList.remove(t.value));
		root.classList.add(selectedTheme);
		localStorage.setItem('selectedTheme', selectedTheme);
	}, [selectedTheme]);

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" ref={dropdownRef}>
			<div className="relative">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent"
				>
					<span>Theme</span>
					<ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
				</button>
				{isOpen && (
					<div className="absolute bottom-full right-0 mb-2 w-64 rounded-lg border bg-background p-2 shadow-lg">
						<div className="max-h-[60vh] overflow-y-auto">
							<Tabs
								value={selectedTheme}
								onValueChange={(value) => {
									setSelectedTheme(value);
									setIsOpen(false);
								}}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-6 gap-2">
									{themes.map((t) => (
										<TabsTrigger
											key={t.value}
											value={t.value}
											className="flex items-center gap-2"
										>
											<span>{t.emoji}</span>
											<span>{t.name}</span>
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						</div>
					</div>
				)}
			</div>
			<Button
				variant="outline"
				size="icon"
				onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
				className="rounded-full"
			>
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		</div>
	);
};

export default ThemeSwitcher;
