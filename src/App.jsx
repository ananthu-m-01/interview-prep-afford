import React from 'react'
import SearchBar from './components/SearchBar'
import UserSearchPage from './pages/UserSearchPage'
const App = () => {
  return (
    <div>
      Searchbar using Debounce
      <SearchBar/>
      <UserSearchPage/>
    </div>
  )
}

export default App
