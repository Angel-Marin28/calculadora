import "./App.css";
import React, { useState } from "react";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [result, setResult] = useState(0);

  let initialState = JSON.parse(localStorage.getItem("historial")) || [];

  const [historial, setHistorial] = useState(initialState);

  const deleteHistorial =()=>{
    setHistorial([])
    localStorage.setItem("historial", JSON.stringify([]));
  }
  const removeNote = (index) => {
    const nuevoArreglo = [];
    historial.forEach((historial, i) => {
      if (index !== i) {
        nuevoArreglo.push(historial);
      }
    });
    localStorage.setItem("historial", JSON.stringify(nuevoArreglo));
    setHistorial(nuevoArreglo);
  };

  function allClear() {
    setNumber1("");
    setNumber2("");
    setCurrentOperation("");
    setResult("");
  }
  function clean() {
    if (currentOperation === "") {
      setNumber1(number1.toString().slice(0, -1));
    } else {
      setNumber2(number2.toString().slice(0, -1));
    }
  }

  function clickNumber(val) {
    if (currentOperation === "") {
      setNumber1(number1 + val);
    } else {
      setNumber2(number2 + val);
    }
  }

  function clickOperation(val) {
    setCurrentOperation(val);
  }

  function getResult(val) {
    let resultado;
    switch (currentOperation) {
      case "+":
        resultado=(Number(number1) + Number(number2));
        break;
      case "-":
        resultado=(Number(number1) - Number(number2));
        break;
      case "*":
        resultado=(Number(number1) * Number(number2));
        break;
      case "/":
        resultado=(Number(number1) / Number(number2));
        break;
      default:
        break;
    }
    setResult(resultado);
    const background={numero1:number1,operador:currentOperation,numero2:number2,result:resultado}
    console.log({resultado})
    console.log({background})
    const newArray = [...historial, background]
    setHistorial([...newArray]);
    localStorage.setItem("historial", JSON.stringify(newArray));
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {currentOperation ? number1 + currentOperation : ""}
          </div>
          <div className="current-operand">
            {result ? result : !currentOperation ? number1 : number2}
          </div>
        </div>
        <button onClick={allClear} className="span-two">
          AC
        </button>

        <button onClick={clean}>DEL</button>
        <button
          onClick={() => {
            clickOperation("/");
          }}
          className="com"
        >
          /
        </button>
        <button
          onClick={() => {
            clickNumber(7);
          }}
        >
          7
        </button>
        <button
          onClick={() => {
            clickNumber(8);
          }}
        >
          8
        </button>
        <button
          onClick={() => {
            clickNumber(9);
          }}
        >
          9
        </button>
        <button
          onClick={() => {
            clickOperation("*");
          }}
          className="com"
        >
          *
        </button>
        <button
          onClick={() => {
            clickNumber(4);
          }}
        >
          4
        </button>
        <button
          onClick={() => {
            clickNumber(5);
          }}
        >
          5
        </button>
        <button
          onClick={() => {
            clickNumber(6);
          }}
        >
          6
        </button>
        <button
          onClick={() => {
            clickOperation("+");
          }}
          className="com"
        >
          +
        </button>
        <button
          onClick={() => {
            clickNumber(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            clickNumber(2);
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            clickNumber(3);
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            clickOperation("-");
          }}
          className="com"
        >
          -
        </button>
        <button
          onClick={() => {
            clickNumber(".");
          }}
        >
          .
        </button>
        <button
          onClick={() => {
            clickNumber(0);
          }}
        >
          0
        </button>
        <button onClick={getResult} className="span-two">
          =
        </button>

      </div>
      </div>
      <div className="col">

          <h3>Historial</h3>
          {historial.length === 0 ? (
            <p>El historial está vacio.</p>
          ) : (
            <ul>
              {historial.map((item, index) => {
                return (
                  <li key={index}>
                    {item.numero1} {item.operador} {item.numero2} = {item.result}&nbsp;
                    <i
                  className="bi-x-circle"
                  onClick={() => removeNote(index)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                  }}
                ></i>
                  </li>
                );
              })}
            </ul>
          )}
          <button
        type="button"
        className="btn btn-primary"
        onClick={deleteHistorial}
        disabled={historial.length === 0}
      >
        Limpiar historial
      </button>
      
        </div>
      </div>
    </div>
  );
}

export default App;
