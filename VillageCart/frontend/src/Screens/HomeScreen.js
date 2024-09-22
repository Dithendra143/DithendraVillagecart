import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCarousel from '../Components/ProductCarousel';
import Category from '../Components/Category';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productActions'; 
import axios from 'axios';

function HomeScreen() {
    const [smartProducts, setSmartProducts] = useState([]);
    const [featureProducts, setFeatureProducts] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all products and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [smartResponse, featureResponse, bestSellerResponse, categoriesResponse] = await Promise.all([
                    axios.get('/api/products/mySmartBasket/'),
                    axios.get('/api/products/myFeatureBasket/'),
                    axios.get('/api/products/myBestSellerBasket/'),
                    axios.get('/api/products/category/')
                ]);

                setSmartProducts(smartResponse.data);
                setFeatureProducts(featureResponse.data);
                setBestSellerProducts(bestSellerResponse.data);
                setCategories(categoriesResponse.data);
            } catch (err) {
                setError('Failed to load data.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch latest products using Redux
    const dispatch = useDispatch();
    const { loading: reduxLoading, error: reduxError, products } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <h1>SHOP BY CATEGORY</h1>
            {loading ? <Loader /> 
                : error ? <Message variant='danger'>{error}</Message> 
                : categories && categories.length > 0 && (
                    <Row className='row-custom-bg'>
                        {categories.map(category => (
                            <Col key={category._id} sm={12} md={6} lg={4} xl={3}>
                                <Category category={category} />
                            </Col>
                        ))}
                    </Row>
            )}

            <h1>Latest Products</h1>
            {reduxLoading ? <Loader />
                : reduxError ? <Message variant='danger'>{reduxError}</Message>
                : products && products.length > 0 ? (
                    <ProductCarousel products={products} />
                ) : <Message>No products available</Message>
            }

            <h1>My Smart Basket</h1>
            {smartProducts && smartProducts.length > 0 ? (
                <ProductCarousel products={smartProducts} />
            ) : <Message>No smart products available</Message>}

            <h1>My Feature Basket</h1>
            {featureProducts && featureProducts.length > 0 ? (
                <ProductCarousel products={featureProducts} />
            ) : <Message>No featured products available</Message>}

            <h1>Best Sellers</h1>
            {bestSellerProducts && bestSellerProducts.length > 0 ? (
                <ProductCarousel products={bestSellerProducts} />
            ) : <Message>No best seller products available</Message>}
        </div>
    );
}

export default HomeScreen;
