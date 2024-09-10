import React, {useState, useEffect, useRef} from 'react'
import Gifs from '../Gifs/Gifs'
import Paginations from '../Pagination/Paginations'
import './SearchGifs.css'
import {throttle} from '../../helpers/throttle'
import {sanitizeInput} from '../../helpers/sanitizeKeyWords'
import createApiUrl from '../../helpers/createApiUrl'

function GifSearch () {
    const [keywords, setKeywords] = useState('')
    const [apiSearch, setApiSearch] = useState([])
    const [pagination, setPagination] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const debounceTimeout = useRef(null);

    const handleChange = (event) => {
        setCount(0);
        // Debounce & closure
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
          setKeywords(event.target.value);
        }, 1000); 
    }

    const handleDecrease = () => {
      if (count >= 9) {
        setCount(count - 9)
      }
    }

    const handleIncrease = () => {
         setCount(count + 9)
    }

    // Set up the base URL, API key, and endpoint
    const baseUrl = 'https://api.giphy.com/v1/gifs/search';
    const apiKey = process.env.REACT_APP_API_KEY;

    // Create the curried function
    const apiUrlBuilder = createApiUrl(baseUrl)(apiKey);

    useEffect(() => {
      const handleApicall = async () => {
          const sanitizeKeyWord = sanitizeInput(keywords)
          const params = {
            q: sanitizeKeyWord,
            limit: 9,
            offset: count,
        };

        const url = apiUrlBuilder(params);
          try {
              const response = await fetch(url)
              const data = await response.json()
              setApiSearch(data.data)
              setPagination(data.pagination)
              setLoading(false)
          } catch (err) {
              console.log(err.message)
          }
      };
      //throttle
      const throttledApiCall = throttle(handleApicall, 2000); // Adjust the limit as needed

      if (keywords) {
        throttledApiCall()
      } else {
        setApiSearch([]);  
        setPagination([]); 
        setLoading(false); 
    }
    }, [keywords, count]);

    return (
        <div>
            <form className="gif-search" id="form">
              <input placeholder='Your key word here' type='text' onChange={handleChange}/>
            </form>
            <Gifs pagination={pagination} count={count} apiSearch={apiSearch} loading={loading}/>
           
              {keywords?  
                <Paginations count={count} pagination={pagination} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
              :
              <div className="pagination">
              </div>
              }
        </div>
    )
}

export default GifSearch