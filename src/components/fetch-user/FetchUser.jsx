import { useEffect, useState } from "react";
const FetchUser = () => {
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [products,setProducts] = useState({});
    const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setUserLoading(false);
      });
  }, []);

  useEffect(()=>{
    fetch("https://dummyjson.com/products")
    .then((res)=>res.json())
    .then((data)=>{
      setProducts(data)
      setProductsLoading(false)
    })
  },[])

  if (userLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users API (Fetch)</h2>
        <ul className="p-4">
          {users.map((user) => (
            <li key={user.id} className="border-b py-2">{user.name}</li>
          ))}
        </ul>
        <h2>Products API (Fetch) </h2>
        <ul>
          {products.products?.map((product)=>(
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
    </div>
  );
}

export default FetchUser
