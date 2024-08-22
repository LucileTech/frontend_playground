import React, { createContext, useState, useContext, useCallback } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        category: '',
        tags: []
    });

    const setCategory = useCallback((category) => {
        setFilters(prevFilters => ({ ...prevFilters, category }));
    }, []);

    const addTag = useCallback((tag) => {
        setFilters(prevFilters => ({ ...prevFilters, tags: [...prevFilters.tags, tag] }));
    }, []);

    const removeTag = useCallback((tag) => {
        setFilters(prevFilters => ({ ...prevFilters, tags: prevFilters.tags.filter(t => t !== tag) }));
    }, []);

    return (
        <FilterContext.Provider value={{ filters, setCategory, addTag, removeTag }}>
            {children}
        </FilterContext.Provider>
    );
};
