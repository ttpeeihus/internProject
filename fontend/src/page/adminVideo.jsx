import React from 'react';
import { AdminVideoHeader } from '../components/header/adminVideo';
import { Sidebar } from '../components/sidebar/sidebar';
import { Playlist } from '../components/content/managerVideo';

export function AdminVideo() {
  return (
    <>
      <AdminVideoHeader />
      <main>
        <Sidebar />
        <Playlist />
      </main>
    </>
  );
}

export default AdminVideo;
