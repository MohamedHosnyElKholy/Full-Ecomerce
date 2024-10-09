// src/app/layout.js
'use client'
import { Provider } from 'react-redux';
import {store} from '../lib/store'; // تأكد من تعديل المسار حسب هيكل مشروعك

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}