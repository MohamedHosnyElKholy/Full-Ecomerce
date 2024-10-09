// pages/index.js
'use client'; // تأكد من وجود هذا السطر في بداية الملف

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FirstHomePage from './FirstHomepage/page';
import FlashSales from './FlashSales/page';
import Catgory from './Catgory/page';
import SelleingProduct from './SelleingProduct/page';
import Discoand from './Discoand/page';
import ExplorProduct from './ExplorProduct/page';
import Arrvial from './Arrvial/page';

export default function Home() {


  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <>
      <FirstHomePage />
      <FlashSales />
      <Catgory />
      <SelleingProduct />
      <Discoand />
      <ExplorProduct />
      <Arrvial />
    </>
  );
}
