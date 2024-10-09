
import "./globals.css";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import { Toaster } from "react-hot-toast";
import { pacifico } from './fonts/font'; 
import ReduexProvider from './lib/ReduexProvider'
// Adding Metadata here
export const metadata = {
  title: "E-Commerce Application",
  description: "An online platform to buy and sell products.",
  keywords: ['e-commerce', 'online shopping', 'buy products', 'sell products'],
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={pacifico.className} 
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <ReduexProvider>
          <Navbar />
          <main style={{ flexGrow: 1 }}>{children}</main>
          <Footer />
        </ReduexProvider>

        <Toaster />
      </body>
    </html>
  );
}
