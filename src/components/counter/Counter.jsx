import { useState } from "react";
import './Counter.css';
const Counter = () => {
    const [count,setCount] = useState(0);
    const handleCount = (data) =>{
      if(data == "increment"){
        setCount(count+1);
      }else if(data == "decrement"){
        setCount(count-1);
      }else{
        setCount(0);
      }
    }
  return (
    <div>
      <h2 className="counter-head">1.Counter App</h2>
      <div className="counter">
        <div className="counter-div">
            <h2>COUNT : {count}</h2>
            <button className="counter-btn" onClick={()=>handleCount("increment")}>Increment</button>
            <button className="counter-btn" onClick={()=>handleCount("decrement")}>Decrement</button>
            <button className="counter-btn" onClick={()=>handleCount("reset")}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Counter
