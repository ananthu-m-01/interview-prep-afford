import { observer } from "mobx-react-lite";
import "./CounterMobX.css";
import counterStore from "./CounterStore";

const CounterMobX = observer(() => {
  return (
    <div>
      <h2 className="counter-head">1. Counter App</h2>
      <div className="counter">
        <div className="counter-div">
          <h2>COUNT : {counterStore.count}</h2>
          <button
            className="counter-btn"
            id="increment"
            onClick={() => counterStore.increment()}
          >
            Increment
          </button>
          <button
            className="counter-btn"
            onClick={() => counterStore.reset()}
          >
            Reset
          </button>
          <button
            className="counter-btn"
            id="decrement"
            onClick={() => counterStore.decrement()}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
});

export default CounterMobX;
