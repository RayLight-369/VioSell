import Head from 'next/head.js';
import Provider from '@/Provider/Provider.jsx';
import { Inter } from 'next/font/google'
import Navbar from './Components/Navbar.jsx';

import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VioSell: Your Market',
  description: 'VioSell: Your Marketplace.',
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Provider>
          <Navbar />
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
