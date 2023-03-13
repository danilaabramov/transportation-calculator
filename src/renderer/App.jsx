import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState } from "react";

const Calculator = () => {
  const [transportType, setTransportType] = useState("railway");
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState();
  const [result2, setResult2] = useState();

  const calculateCost = () => {
    let S = 0;
    let K = 0;
    if (transportType === "railway") {
      // расчет для ж/д
      const M = 65;
      const A = 1000;
      const Spos = 57.6;
      const TS = 5000;
      const N = 1.2;
      S = (M * A + Spos * distance + TS) * N;
      K = S * 3 / 65000 * weight;
    } else if (transportType === "auto") {
      // расчет для авто
      const Spos = 45 * 0.28;
      const TS = 3000;
      const Pr = 5;
      const ZP = 700;
      const N = 1.2;
      S = ((Spos + Pr) * distance + TS + ZP) * N;
      K = S * 3 / 20 * weight;
    } else if (transportType === "aviation") {
      // расчет для авиации
    }
    setResult(S.toFixed(2));
    setResult2(K.toFixed(2));
  };

  return (
    <div className="calculator"> {/* добавляем класс "calculator" */}
      <h1>Калькулятор стоимости перевозок</h1>
      <label>
        Выберите тип транспорта:
        <select value={transportType} onChange={(e) => setTransportType(e.target.value)}>
          <option value="railway">Железнодорожный</option>
          <option value="auto">Автомобильный</option>
          {/* <option value="aviation">Авиационный</option> */}
        </select>
      </label>
      <label>
        Расстояние (в км):
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </label>
      <label>
        Вес груза (в кг):
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <button onClick={calculateCost}>Рассчитать</button>
      {result && <p>Стоимость перевозки: {result} рублей</p>}
      {result2 && <p>Цена для клиентов: {result2} рублей</p>}
    </div>
  );
};


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </Router>
  );
}
