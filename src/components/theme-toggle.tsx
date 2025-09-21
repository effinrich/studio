'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export function ThemeToggle() {
    const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setThemeState(isDarkMode ? 'dark' : 'light')
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);
    
    const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
        setThemeState(newTheme);
    }

  return (
    <>
        <DropdownMenuItem onClick={() => setTheme('light')}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
        </DropdownMenuItem>
    </>
  )
}
