"use client";
import "./globals.css";
import { useState, useEffect } from 'react';
import Image from "next/image";
import DarkIcon from "../../src/app/assets/night-mode.png"
import DayIcon from "../../src/app/assets/day-mode.png"



export default function RootLayout({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedDarkMode = localStorage.getItem('darkMode');

        if (storedDarkMode === null) {
            setDarkMode(systemPrefersDark);
            document.documentElement.classList.toggle('dark', systemPrefersDark);
        } else {
            const isDark = storedDarkMode === 'true';
            setDarkMode(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        }

        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('darkMode')) {
                setDarkMode(e.matches);
                document.documentElement.classList.toggle('dark', e.matches);
            }
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };

    return (
        <html lang="en">
        <body className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo List</h1>
                <button
                    onClick={toggleDarkMode}
                    className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded flex items-center justify-center px-4"
                >
                    <Image
                        src={!darkMode ? DarkIcon : DayIcon}
                        alt={"Mode"}
                        className={"w-[25px] object-contain mr-2"}
                    />
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            {children}
        </div>
        </body>
        </html>
    );
}
