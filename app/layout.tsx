/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>      
      <body className="center-site">      
        <main>
          <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
              <ul className="navbar-nav flex pl-0 list-style-none mr-auto">
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/">Home</Link>
                </li>
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/links">Links</Link>
                </li>
              </ul>
          </nav>
          <br/>
          {children}
        </main>
      </body>
    </html>
  );
}