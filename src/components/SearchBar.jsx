import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import searchItems from '../api/searchItems';
import './SearchBar.css';
const SearchBar = () => {

    // for state management
    const [query,setQuery] = useState('');
    const [result,setResult] = useState([]);

    // Debouncing for API call
    const debouncedSearch = useCallback(
        debounce(async (text) =>{
            const data = await searchItems(text);
            setResult(data);
        }),
        []
    );

    const handleChange = (e) =>{
        const text = e.target.value;
        setQuery(text);
        debouncedSearch(text);
    }

    useEffect(() => {
        return () => {
          debouncedSearch.cancel(); // cleanup on unmount
        };
      }, [debouncedSearch]);


    
  return (
    <div>
      <input type="text" name="" id="" value = {query} onChange={handleChange} placeholder='Search Something...'/>
      <ul>
            {Array.isArray(result) && result.length > 0 ? (
            result.map((item) => (
            <li key={item.id}>{item.name}</li>
            ))
            ) : (
            <li>No results found</li>
            )}
</ul>

    </div>
  )
}

export default SearchBar
