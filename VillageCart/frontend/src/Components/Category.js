import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Category({ category }) {
    // Encode the category name to be URL-safe
    const categoryPath = encodeURIComponent(category.name);

    return (
        <Card className="my-3 p-3 rounded uniform-card">
            <Link to={`/api/products/category/${category._id}/`}>
                <Card.Img 
                    src={category.image} 
                    alt={category.name} 
                    className="card-img-top" 
                />
            </Link>

            <Card.Body>
                <Link to={`/api/products/category/${category._id}/`}>
                    <Card.Title as="div">
                        <strong>{category.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Category;
