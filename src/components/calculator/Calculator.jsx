import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setExpression('');
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      try {
        setExpression(eval(expression).toString());
      } catch {
        setExpression('Error');
      }
    } else {
      setExpression(prev => prev + value);
    }
  };

  return (
    <div>
      <h2 className="calc-head">Calculator</h2>
      <div className="calculator-main">
        <div className="answer">Answer : {expression}</div>
        
        <div className="row-1">
          <button onClick={() => handleButtonClick('AC')}>AC</button>
          <button onClick={() => handleButtonClick('DEL')}>DEL</button>
          <button onClick={() => handleButtonClick('%')}>%</button>
          <button id="operator" onClick={() => handleButtonClick('/')}>/</button>
        </div>
        <div className="row-2">
          <button id="number" onClick={() => handleButtonClick('7')}>7</button>
          <button id="number" onClick={() => handleButtonClick('8')}>8</button>
          <button id="number" onClick={() => handleButtonClick('9')}>9</button>
          <button id="operator" onClick={() => handleButtonClick('*')}>*</button>
        </div>
        <div className="row-3">
          <button id="number" onClick={() => handleButtonClick('4')}>4</button>
          <button id="number" onClick={() => handleButtonClick('5')}>5</button>
          <button id="number" onClick={() => handleButtonClick('6')}>6</button>
          <button id="operator" onClick={() => handleButtonClick('-')}>-</button>
        </div>
        <div className="row-4">
          <button id="number" onClick={() => handleButtonClick('1')}>1</button>
          <button id="number" onClick={() => handleButtonClick('2')}>2</button>
          <button id="number" onClick={() => handleButtonClick('3')}>3</button>
          <button id="operator" onClick={() => handleButtonClick('+')}>+</button>
        </div>
        <div className="row-5">
          <button id="number" onClick={() => handleButtonClick('0')}>0</button>
          <button id="number" onClick={() => handleButtonClick('.')}>.</button>
          <button onClick={() => handleButtonClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
