import React from 'react';
import { Guest } from '../components/header/guest';
import { Sidebar } from '../components/sidebar/sidebar';
import { Playlist } from '../components/content/users';

export const HomeGuest = () => {
  return (
    <>
      <Guest />
      <main>
        <Sidebar />
        <Playlist />
      </main>
    </>
  );
}

export default HomeGuest;
