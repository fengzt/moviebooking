import React from 'react'
import HomeCarousel from './HomeCarousel/HomeCarousel';
import HomeList from './HomeList/HomeList'
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home(props) {
  return (
    <div>
      <HomeCarousel />

      <div className="container my-4 mb-20">
        <HomeList />

        <HomeMenu />
      </div>
    </div>
  );
}
