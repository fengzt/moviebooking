import React, { useEffect, useState } from 'react'
import HomeCarousel from './HomeCarousel/HomeCarousel';
import HomeList from './HomeList/HomeList'
import HomeMenu from './HomeMenu/HomeMenu'
import HomeMenuMobile from './HomeMenu/HomeMenuMobile';

export default function Home(props) {
  //  const [state, setState] = useState({
  //    width: window.innerWidth,
  //    height: window.innerHeight,
  //  });

  //  useEffect(() => {
  //    window.onload = () => {
  //      setState({
  //        width: window.innerWidth,
  //        height: window.innerHeight,
  //      });
  //    };
  //    window.onresize = () => {
  //      setState({
  //        width: window.innerWidth,
  //        height: window.innerHeight,
  //      });
  //    };
  //  }, []);
  const { state } = props;

   const renderComponent = () => {
     if (state.width <= 768) {
       return <HomeMenuMobile />;
     }
     return <HomeMenu />;
  };
  
  return (
    <div className="pt-16 lg:pt-24">
      <HomeCarousel />

      <div className="container mt-4 mb-20">
        <HomeList state={state} />

        {renderComponent()}
      </div>
    </div>
  );
}
