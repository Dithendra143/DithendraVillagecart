import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CategoryProductScreen from './Screens/CategoryProductScreen';
import { Container } from 'react-bootstrap';
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/cart/:id' Component={CartScreen} />
            <Route path='/cart/' Component={CartScreen} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/category/:categoryId/products" element={<CategoryProductScreen />} />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/register' Component={RegisterScreen} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

