import { Route, Routes } from 'react-router-dom'
import Counter from "./components/counter/Counter.jsx"
import TodoList from "./components/todoList/TodoList.jsx"
import Home from './pages/Home.jsx'
const App = () => {
  return (
    <div>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/counter' element={<Counter/>}></Route>
        <Route path="/todo-list" element={<TodoList/>}></Route>
     </Routes>
    </div>
  )
}

export default App
