
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Calculator= () => {
  const [display, setDisplay] = useState("");

  useEffect(() =>{
    const getLastCalculation = async() =>{
      try {
        const token = localStorage.getItem("token");
         const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.get(
          `${API_URL}/v1/calculator/getCalculation`,
          {headers:{
            auth:token,
          },
        }
        );
        setDisplay(res.data.calculation.result);
      } catch (error) {
        console.log("No previous Calculation");
      }
    };

    getLastCalculation();

  },[]);
  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleEqual =async() => {
    try {
      const expression = display;

   if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    console.log("Invalid expression");
    return;
    }


      const result = String(eval(expression));
      setDisplay(result);
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/v1/calculator/saveCalculation`,
          {
            expression:expression,
            result:result
          },
          {
            headers:{
              auth : token,
            }
          }
      );
    } catch (error) {
      setDisplay("0");
      console.log("BACKEND ERROR:", error.response?.data);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-5">
          Calculator
        </h1>

        {/* Display */}
        <input
          type="text"
          value={display}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-4 text-right text-2xl mb-4 bg-gray-50"
        />

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">

          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 text-white p-4 rounded-lg hover:bg-red-600"
          >
            Clear
          </button>

          <button
            onClick={() => handleClick("/")}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            ÷
          </button>

          <button
            onClick={() => handleClick("*")}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            ×
          </button>

          <button
            onClick={() => handleClick("7")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            7
          </button>

          <button
            onClick={() => handleClick("8")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            8
          </button>

          <button
            onClick={() => handleClick("9")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            9
          </button>

          <button
            onClick={() => handleClick("-")}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            −
          </button>

          <button
            onClick={() => handleClick("4")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            4
          </button>

          <button
            onClick={() => handleClick("5")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            5
          </button>

          <button
            onClick={() => handleClick("6")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            6
          </button>

          <button
            onClick={() => handleClick("+")}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            +
          </button>

          <button
            onClick={() => handleClick("1")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            1
          </button>

          <button
            onClick={() => handleClick("2")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            2
          </button>

          <button
            onClick={() => handleClick("3")}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            3
          </button>

          <button
            onClick={() => handleClick(".")}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            .
          </button>

          <button
            onClick={() => handleClick("0")}
            className="col-span-2 bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            0
          </button>

          <button
            onClick={handleEqual}
            className="col-span-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700"
          >
            =
          </button>

        </div>
      </div>
    </div>
  );
};

export default Calculator;

