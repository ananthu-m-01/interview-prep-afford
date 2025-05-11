import { Route, Routes } from 'react-router-dom'
import Calculator from './components/calculator/Calculator.jsx'
import CounterMobX from './components/counter-mobx/CounterMobX.jsx'
import Counter from "./components/counter/Counter.jsx"
import FetchUser from './components/fetch-user/FetchUser.jsx'
import ProductCardUseState from './components/product-card-UseState/ProductCardUseState.jsx'
import ProductCard from './components/product-card/ProductCard.jsx'
import TodoList from "./components/todoList/TodoList.jsx"
import Home from './pages/Home.jsx'
const App = () => {
  return (
    <div>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/counter' element={<Counter/>}></Route>
        <Route path="/todo-list" element={<TodoList/>}></Route>
        <Route path='/calculator' element={<Calculator/>}></Route>
        <Route path='/fetch-user' element={<FetchUser/>}></Route>
        <Route path='/product-card' element={<ProductCard/>}></Route>
        <Route path='/product-card-useState' element={<ProductCardUseState/>}></Route>
        <Route path='/counter-mobx' element={<CounterMobX/>}></Route>
     </Routes>
    </div>
  )
}

export default App
