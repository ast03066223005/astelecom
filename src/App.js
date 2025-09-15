
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home'
import SingleProduct from './pages/SingleProduct'
import ErrorPage from './pages/ErrorPage';

import Header from './components/Header';
import Footer from './components/Footer';
import BannerBar from './components/BannerBar';
import ImageCacheManager from './components/ImageCacheManager';

import { useProductContext } from './context/ProductContext';
import LoadingBar from './components/LoadingBar';


function App() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
  }, []);

  const { isLoading } = useProductContext();
  if(isLoading){
    return (
      <>
      <LoadingBar />
      </>
  )
  }
  return (
 <div className='w-screen  transition-all ease-linear duration-300 bg-gray-100'>
<Router
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>
  <BannerBar />
  <Header />
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/product/:id" element={<SingleProduct />}/>
    <Route path="/*" element={<ErrorPage />}/>
  </Routes>
    <Footer/>
   {scrollY > 100 && <button
   aria-label='scroll-to-top'
     id='scroll-to-top'
     className='fixed bottom-4 right-4 z-50 w-8 h-8 bg-primary hover:bg-primary/80 text-white p-1 rounded-full shadow-lg transition-colors'
     onClick={() => {
      setScrollY(0);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }}>
      <i className="fa-solid fa-arrow-up text-sm"></i>
    </button>}
   {
    process.env.NODE_ENV === 'development' && <ImageCacheManager />
   }
    
</Router>
 </div>

  );
}

export default App;
