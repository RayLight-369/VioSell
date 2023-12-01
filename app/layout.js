import Provider from '@/Provider/Provider.jsx';
import { Inter } from 'next/font/google';
import Navbar from './Components/Navbar/Navbar.jsx';


import "./globals.css";
import Footer from './Components/Footer/Footer.jsx';

const inter = Inter( { subsets: [ 'latin' ] } );

export const metadata = {
  title: 'VioSell: Your Market',
  description: 'VioSell: Your Marketplace.',
  openGraph: {
    images: [ "https://viosell.vercel.app/Images/favicon.svg" ]
  }
  // icons: {
  //   icon: "favicon.ico"
  // }
};

export default function RootLayout ( { children } ) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Provider>
          <Navbar />
          <main>
            { children }
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
