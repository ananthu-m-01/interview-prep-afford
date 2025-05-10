import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import UserList from '../components/UserList';

const UserSearchPage = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(
    debounce(async (searchText) => {
      if (!searchText.trim()) {
        setUsers([]);
        return;
      }

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        const filtered = data.filter(user =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setUsers(filtered);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    fetchUsers(text);
  };

  useEffect(() => {
    return () => {
      fetchUsers.cancel();
    };
  }, [fetchUsers]);

  return (
    <div>
      <h2>User Search (with Debounce)</h2>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search users by name..."
      />
      <UserList users={users} />
    </div>
  );
};

export default UserSearchPage;
