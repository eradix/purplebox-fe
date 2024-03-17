import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import none from "../assets/img/none.jpg";
import { Link } from "react-router-dom";

function BestSeller() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/product-best-seller`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();
                setData(jsonData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
      };
  return (
    <div className="my-5">
        <h2 className="font-bold text-center text-3xl my-8">SHOP OUR BESTSELLERS</h2>

        {loading && <p className='text-3xl font-bold'>Loading...</p>}

        {error && <p>Error: {error}</p>}

            {data.length > 0 ? (
                <div className="slider-container my-5">
                    <Slider {...settings}>
                        {data.map((item) => (
                            <Link to={`/product/${item.id}`} className="px-5">
                                <div key={item.id} className="bestsellerdiv relative">
                                    {item.image? 
                                        <img className='sm:h-96 lg:h-64 max-w-full image' src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`} alt="" />
                                        : <img src={none} alt="" />
                                    }
                                      <div class="overlay">
                                        <div class="text">
                                            <p className='text-center pt-3'><span className='text-white bg-violet-900 px-3 py-1 text-md rounded font-bold '>{item.type}</span> </p>
                                            <h3 className='text-lg text-center font-bold mt-3'>{item.name.toUpperCase()}</h3>
                                            <p className='text-center text-md text-purple-900'><strong>PHP {item.price}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            )
            :
            (
                <div className='py-3'>
                    <p className="text-red-900 text-3xl">No products found.</p>
                </div>
            )}
  </div>
);
}

export default BestSeller;