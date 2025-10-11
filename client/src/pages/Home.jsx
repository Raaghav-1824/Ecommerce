import React from 'react';
import Navbar from '../Components/layout/Navbar';
import Announcements from '../Components/home/Announcements';
import Slider from '../Components/home/Slider';
import Categories from '../Components/home/Categories';
import Products from '../Components/products/Products';
import Newsletter from '../Components/home/Newsletter';
import Footer from '../Components/layout/Footer';

function Home() {
  return (
    <div>
      {/* <Announcements /> */}
      <Navbar />
      <Slider/>
      <Categories/>
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}

export default Home