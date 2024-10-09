// src/app/fonts/font.js
import { Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  weight: ['400', '700'], // يمكنك تحديد الأوزان التي تحتاجها
  subsets: ['latin'],
  display: 'swap',
});
