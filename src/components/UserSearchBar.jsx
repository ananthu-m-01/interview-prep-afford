import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';

const UserSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search users..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default UserSearchBar;
