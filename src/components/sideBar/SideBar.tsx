"use client";
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link'; 

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className='fixed z-50 shadow-xl bg-gray-800 w-full p-3 text-white'>
      <button className='ml-4' onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}></div>

      <div className={`fixed top-0 left-0 bg-gray-800 min-h-screen transition-all duration-300 shadow-lg shadow-black/50 ${open ? 'w-80' : 'w-0'}`}>
        <div className={`${!open && "hidden"} pt-3`}>
          <button className='ml-4 text-white mb-14' onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Enlaces de inventario */}
          <Link href="/dashboard/inventory1" passHref>
            <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Dashboard</div>
          </Link>
          <Link href="/dashboard/inventory1" passHref>
            <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Inventario 1</div>
          </Link>
          <Link href="/dashboard/inventory2" passHref>
            <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Inventario 2</div>
          </Link>
          <Link href="/dashboard/inventory3" passHref>
            <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Inventario </div>
          </Link>
          <Link href="/dashboard/inventory4" passHref>
            <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Inventario 4</div>
          </Link>
          {/* <Link href="/dashboard/inventory5" passHref>
            <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Inventario 5</div>
          </Link> */}

          <div className='text-center text-white text-xl cursor-pointer py-3 mb-2'>
            {session ? (
              <button
                onClick={async () => {
                  await signOut({ callbackUrl: '/' }); // Redireccionar al cerrar sesión
                }}
                className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition-all"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
