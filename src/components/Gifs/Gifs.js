import React from 'react'
import './Gifs.css'
function Gifs({count, apiSearch, loading, pagination}) {
    if (loading) {
        return <h2>loading</h2>
    }
  return (
    <div className="grid-gifs">
    {apiSearch.map((gif) => {
        return (
            <div className="grid-item" key={gif.id}>
                <img src={gif.images.fixed_height.url} alt={gif.title} className="gifIframe"></img>
            </div>
        )
    })}
    </div>
  )
}

export default Gifs