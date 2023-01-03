'use client';

/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <html>      
      <body className="center-site dark:bg-gray-700">      
        <main>
          <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-100 hover:text-gray-700 focus:text-gray-700 shadow-lg">
              <ul className="navbar-nav flex pl-0 list-style-none mr-auto">
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/">Home</Link>
                </li>
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/links">Links</Link>
                </li>
              </ul>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
              <label className="inline-flex relative items-center cursor-pointer darkModeToggle">
                <input type="checkbox" value="" className="sr-only peer" onClick={handleThemeSwitch}/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
          </nav>
          <br/>
          {children}
        </main>
      </body>
    </html>
  );
}