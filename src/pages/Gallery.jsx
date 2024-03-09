import React, { useState, useEffect } from 'react';
import bg from "../assets/img/banner.jpg";
import none from "../assets/img/none.jpg";
import { productFields } from '../helper/ProductField';

const Gallery = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [selectedType, setSelectedtype] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?type=All`);
                
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

    const handleSearch = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search/products?query=${query}`);
            
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

    const handleSelectChange = async (e) => {

        setSelectedtype(e.target.value);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search/products?query=${query}&type=${e.target.value}`);
            
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

  return (
    <>
      <div className='py-5'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className='text-center text-4xl font-bold my-5'>Gallery</h1>
        <div className='text-center py-3'>
            <input 
                className='border rounded py-3 px-5 bg-slate-200 text-xl'
                type="text"
                placeholder='Search product ...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>

        <div className='text-right mr-12 xl:mr-48'>
            <label className='text-xl font-bold'>Sort by type: </label>
            <select className='border rounded px-3 py-2 bg-slate-200 text-xl' id="type" value={selectedType} onChange={handleSelectChange} >
                <option value=""></option>
                {productFields[1].dropdown.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
                ))}
            </select>
        </div>

        { query && (
            <div className="py-3">
                <p className="text-2xl text-center">Search results for: <span className='font-bold text-purple-600'>'{query}'</span></p>
            </div>
        ) }



        <div className="container mx-auto">

            {loading && <p className='text-3xl font-bold'>Loading...</p>}

            {error && <p>Error: {error}</p>}

            {data.length > 0 ? (
                <div className='gallery grid grid-cols-2 md:grid-cols-4 gap-2 '>
                    {data.map((item) => (
                        <div key={item.id} className='gallery-img border border-slate-500 pb-3 bg-slate-500'>
                            {item.image? 
                                <img className='h-96 max-w-full' src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`} alt="" />
                                : <img src={none} className="" alt="" />
                            }
                            
                            <p className='text-center pt-3'><span className='text-white bg-violet-900 px-3 py-1 text-lg rounded font-bold '>{item.type}</span> </p>
                            <h3 className='text-2xl text-center font-bold mt-3'>{item.name.toUpperCase()}</h3>
                            <p className='text-center text-xl text-purple-900'><strong>PHP {item.price}</strong></p>
                        </div>
                    ))}
                </div>
            )
            :
            (
                <div className='py-3'>
                    <p className="text-red-900 text-3xl">No products found.</p>
                </div>
            )
            }
        </div>
      </div>
    </>
  );
};

export default Gallery;
