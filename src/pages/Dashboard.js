import React from 'react';
import {User, Search, Navbar} from '../components';
import loadingImage from '../images/preloader.gif';

const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <User />
    </main>
  );
};

export default Dashboard;
