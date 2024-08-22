import React, { useEffect, useState } from 'react';
import { useFilter } from '../../context/FilterProvider'; // Import your filter context

const GifList = () => {
    const { filters } = useFilter();
    const [filteredGifs, setFilteredGifs] = useState([]);

    useEffect(() => {
        const fetchGifs = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${filters.category}&limit=9`;
            const response = await fetch(url);
            const data = await response.json();
            let gifs = data.data;

            // Apply tag-based filtering
            if (filters.tags.length > 0) {
                gifs = gifs.filter(gif => filters.tags.some(tag => gif.title.includes(tag)));
            }

            setFilteredGifs(gifs);
        };

        fetchGifs();
    }, [filters]);

    return (
        <div>
            {filteredGifs.map(gif => (
                <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
            ))}
        </div>
    );
};

export default GifList;
