import React from 'react';
import { Users } from '../components/header/users';
import { Sidebar } from '../components/sidebar/sidebar';
import { Playlist } from '../components/content/users';

export const HomeUsers = () => {
  return (
    <>
      <Users />
      <main>
        <Sidebar />
        <Playlist />
      </main>
    </>
  );
}

export default HomeUsers;
