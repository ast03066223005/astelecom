
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import SingleProduct from './pages/SingleProduct'
import ErrorPage from './pages/ErrorPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BannerBar from './pages/pageComponents/homeCompnents/BannerBar';

import { useProductContext } from './context/ProductContext';
import LoadingBar from './components/LoadingBar';




function App() {

  const { isLoading } = useProductContext();
  if(isLoading){
    return (
      <>
      <LoadingBar />
      </>
  )
  }
  return (
 
<Router>
  <BannerBar />
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/shop" element={<Shop />}/>
    <Route path="/shop/:category" element={<Shop />}/>

    
    <Route path="/product/:id" element={<SingleProduct />}/>
    <Route path="/contact" element={<Contact />}/>
    <Route path="/*" element={<ErrorPage />}/>
  </Routes>
    <Footer/>
</Router>
  );
}

export default App;
