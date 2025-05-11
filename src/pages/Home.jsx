import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
      Home Page
      <ul>
        <li><Link to='/counter'>Counter App</Link></li>
        <li><Link to='/todo-list'>Todo-List</Link></li>
        <li><Link to='/calculator'>Calculator</Link></li>
        <li><Link to='/fetch-user'>Fetch User</Link></li>
        <li><Link to='/product-card'>Product Card - MobX</Link></li>
        <li><Link to='/product-card-useState'>Product Card - UseState</Link></li>
      </ul>
    </div>
  )
}

export default Home
