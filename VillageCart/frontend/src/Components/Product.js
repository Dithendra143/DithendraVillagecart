import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { addToCart } from '../Actions/cartActions'; // Assuming this action is available

function Product({ product }) {
    // Set the default image if no variations exist, otherwise use the first variation's image
    const [selectedImage, setSelectedImage] = useState(
        product.variations && product.variations.length > 0 
        ? product.variations[0]?.image 
        : product.image
    );
    const [selectedVariation, setSelectedVariation] = useState(
        product.variations && product.variations.length > 0 
        ? product.variations[0]?.name 
        : '' // No variation available
    );
    const [quantity, setQuantity] = useState(1); // Quantity for add to cart

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handler for adding to cart
    const addToCartHandler = () => {
        // Dispatch the action to add the product with the selected variation and quantity
        const selectedProduct = {
            ...product,
            selectedVariation,  // Include the selected variation
        };

        dispatch(addToCart(selectedProduct._id, quantity, selectedVariation));
        
        // Navigate to the cart screen
        navigate(`/cart/${product._id}?qty=${quantity}&variation=${selectedVariation}`);
    };

    // Handle variation change
    const handleVariationChange = (e) => {
        const variation = product.variations.find(v => v.name === e.target.value);
        setSelectedVariation(variation.name);
        setSelectedImage(variation.image || product.image); // Change image based on selected variation, fallback to default
    };

    return (
        <Card className="my-3 p-3 rounded card">
            <Link to={`/product/${product._id}`}>
                <Card.Img 
                    src={selectedImage} // Show the selected variation image or default image
                    alt={product.name} 
                    className="card-img-top" 
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825" />
                    </div>
                </Card.Text>

                {/* Offer Price and Discount */}
                <Card.Text as="h3">
                    {product.offerPrice && product.offerPrice < product.price ? (
                        <>
                            <span className="text-muted text-decoration-line-through">${product.price}</span> {/* Original Price */}
                            <span className="text-danger mx-2">${product.offerPrice}</span> {/* Offer Price */}
                        </>
                    ) : (
                        <span>${product.price}</span>
                    )}
                </Card.Text>

                {/* Product Variations with Image Change */}
                {product.variations && product.variations.length > 0 ? (
                    <Form.Group controlId="productVariations">
                        <Form.Label>Select Variation</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedVariation} 
                            onChange={handleVariationChange}
                        >
                            {product.variations.map((variation) => (
                                <option key={variation.name} value={variation.name}>
                                    {variation.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                ) : (
                    <p>No variations available</p> // Display a message if no variations
                )}

                {/* Quantity Selector */}
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))} // Ensure the quantity is a number
                    >
                        {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Add to Cart Button */}
                <Button
                    onClick={addToCartHandler}
                    className="btn-block my-3"
                    type="button"
                    disabled={product.countInStock === 0}
                >
                    {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Product;
