"use client";

import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import HomeComponent from '../components/Home/home';
import Footer  from '../components/Home/footer';


function HomePage() {
  return (
    <SessionProvider>
      <Navbar />
      <HomeComponent />
      <Footer />
    </SessionProvider>
  );
}

export default HomePage;