import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="font-sans text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-brand-gold transition-colors duration-300 ease-in-out px-3 py-1.5 border border-neutral-300 dark:border-neutral-600 hover:border-brand-gold rounded flex items-center justify-center min-w-[45px]"
    >
      <span className={theme === 'dark' ? 'hidden' : ''}>🌙</span>
      <span className={theme === 'dark' ? '' : 'hidden'}>☀️</span>
    </button>
  );
};

export default ThemeToggle;