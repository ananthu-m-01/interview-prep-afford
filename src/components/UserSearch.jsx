import React, { useState } from 'react';

const UserSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const text = e.target.value;
        setQuery(text);
        onSearch(text);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search users..."
            />
        </div>
    );
};

export default UserSearch;
