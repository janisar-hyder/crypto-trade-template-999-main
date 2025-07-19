
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('light') ? 'light' : 'dark';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the new theme class
    if (newTheme === 'light') {
      root.classList.add('light');
    }
    // For dark mode, we don't add a class since dark is the default
    
    setTheme(newTheme);
    
    // Store the preference
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      if (stored === 'light') {
        root.classList.add('light');
      }
      setTheme(stored);
    }
  }, []);

  return { theme, toggleTheme };
};
