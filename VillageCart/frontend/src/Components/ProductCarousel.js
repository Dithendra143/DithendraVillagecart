import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import Product from '../Components/Product';

const ProductCarousel = ({ products = [] }) => {
    const itemsPerSlide = 4; // Number of items per slide
    const [index, setIndex] = useState(0); // State to track the active slide

    // Ensure products is not undefined or empty
    if (!products.length) {
        return <div>No products available</div>;
    }

    // Split products into chunks of itemsPerSlide
    const productChunks = [];
    for (let i = 0; i < products.length; i += itemsPerSlide) {
        productChunks.push(products.slice(i, i + itemsPerSlide));
    }

    // Handle next slide
    const handleNext = () => {
        if (index < productChunks.length - 1) {
            setIndex(index + 1);
        }
    };

    // Handle previous slide
    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    return (
        <div className="position-relative">
            <Carousel activeIndex={index} onSelect={() => {}} controls={false} indicators={false}>
                {productChunks.map((chunk, idx) => (
                    <Carousel.Item key={idx}>
                        <div className="d-flex justify-content-between row-custom-bg">
                            {chunk.map(product => (
                                <div key={product._id} className="p-2">
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Custom Previous Button */}
            <Button
                variant="primary"
                onClick={handlePrev}
                disabled={index === 0} // Disable button on the first slide
                className="custom-carousel-control-prev"
            >
                &#10094; {/* Left Arrow Symbol */}
            </Button>

            {/* Custom Next Button */}
            <Button
                variant="primary"
                onClick={handleNext}
                disabled={index === productChunks.length - 1} // Disable button on the last slide
                className="custom-carousel-control-next"
            >
                &#10095; {/* Right Arrow Symbol */}
            </Button>
        </div>
    );
};

export default ProductCarousel;
