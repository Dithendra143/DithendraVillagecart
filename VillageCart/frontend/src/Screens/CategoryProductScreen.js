import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import Product from '../Components/Product';

function CategoryProductScreen() {
    const { categoryId } = useParams(); // Get category ID from the URL
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Encode the category name to handle special characters
                const { data } = await axios.get(`/api/category/${categoryId}/products/`);
                setFilteredProducts(data);
            } catch (error) {
                setError('Error fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <h1>Products in this Category</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Row className='row-custom-bg'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))
                    ) : (
                        <p>No products found in this category</p>
                    )}
                </Row>
            )}
        </div>
    );
}

export default CategoryProductScreen;
