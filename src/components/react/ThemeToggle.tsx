import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'dark';

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
      className="font-sans text-sm uppercase tracking-widest text-theme-muted hover:text-brand-gold transition-colors duration-300 ease-in-out px-3 py-1.5 border border-theme rounded flex items-center justify-center min-w-[45px] hover:border-brand-gold"
    >
      <span className={theme === 'dark' ? 'hidden' : ''}>🌙</span>
      <span className={theme === 'dark' ? '' : 'hidden'}>☀️</span>
    </button>
  );
};

export default ThemeToggle;