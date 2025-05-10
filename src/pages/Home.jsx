import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
      Home Page
      <ul>
        <li><Link to='/counter'>Counter App</Link></li>
        <li><Link to='/todo-list'>Todo-List</Link></li>
      </ul>
    </div>
  )
}

export default Home
