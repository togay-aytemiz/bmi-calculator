"use client";

import { useState, useMemo } from "react";

export default function Home() {
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(180);

  const calculateBMI = () => {
    let heightInKg = height / 100;
    let bmi = weight / (heightInKg * heightInKg);
    return bmi;
  };

  const normalizeBMI = (bmi) => {
    const minBMI = 15; // Minimum possible BMI
    const maxBMI = 40; // Maximum possible BMI
    return (bmi - minBMI) / (maxBMI - minBMI);
  };

  const getProgressColor = (bmi) => {
    if (bmi < 18.5) {
      return "text-blue-500"; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
      return "text-green-500"; // Normal weight
    } else if (bmi >= 25 && bmi < 30) {
      return "text-yellow-500"; // Overweight
    } else {
      return "text-red-500"; // Obese
    }
  };

  const memoizedBMI = useMemo(() => calculateBMI(), [weight, height]);
  const memoizedNormalizedBMI = useMemo(
    () => normalizeBMI(memoizedBMI),
    [memoizedBMI]
  );
  const memoizedProgressColor = useMemo(
    () => getProgressColor(memoizedBMI),
    [memoizedBMI]
  );

  return (
    <div>
      <main className="my-5 sm:mx-auto mx-5 max-w-md p-5 pb-10 bg-white rounded-lg shadow-sm">
        <div className="mb-10">
          <h1 className="text-xl font-light">
            <span className="font-bold">BMI Tracker</span>
            <br />
            Monitor Your Health with Precision
          </h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-5 w-full">
          {/* Kilo */}
          <div className="flex flex-col items-start justify-center gap-3  w-full mb-3">
            <label htmlFor="weight" className="text-xl font-medium">
              Kilo: {weight} kg
            </label>
            <input
              type="range"
              min={40}
              max="200"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="range range-info"
              id="weight"
            />
          </div>

          {/* Boy */}
          <div className="flex flex-col items-start justify-center gap-3  w-full">
            <label htmlFor="weight" className="text-xl font-medium">
              Boy: {height} cm
            </label>
            <input
              type="range"
              min={80}
              max="220"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="range range-info"
              id="weight"
            />
          </div>
        </div>

        <div className="divider my-10"></div>

        {/* BMI */}
        <div className="flex items-center flex-col gap-10">
          <h1 className="text-2xl font-bold">Your calculated BMI</h1>
          <div
            className={`radial-progress ${memoizedProgressColor}`}
            style={{
              "--value": memoizedNormalizedBMI * 100,
              "--size": "12rem",
            }}
            role="progressbar"
          >
            <span className="text-2xl font-bold">{memoizedBMI.toFixed(1)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
