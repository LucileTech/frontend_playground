import React, {useState, useEffect, useRef} from 'react'
import Gifs from '../Gifs/Gifs'
import Paginations from '../Pagination/Paginations'
import './SearchGifs.css'
import {throttle} from '../../helpers/throttle'
import {sanitizeInput} from '../../helpers/sanitizeKeyWords'

function GifSearch () {
    const [keywords, setKeywords] = useState('')
    const [apiSearch, setApiSearch] = useState([])
    const [pagination, setPagination] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const debounceTimeout = useRef(null);

    const handleChange = (event) => {
        setCount(0);
        // Debounce
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

    useEffect(() => {
      const handleApicall = async () => {
          const apiKey = process.env.REACT_APP_API_KEY
          const sanitizeKeyWord = sanitizeInput(keywords)
          console.log("sanitizeKeyWord", sanitizeKeyWord)
          const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${sanitizeKeyWord}&limit=9&offset=${count}`
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