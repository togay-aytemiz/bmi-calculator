"use client";

import { useState, useMemo } from "react";

export default function Home() {
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(180);

  const calculateBMI = useMemo(() => {
    let heightInKg = height / 100;
    let bmi = weight / (heightInKg * heightInKg);
    return bmi;
  }, [weight, height]);

  const normalizeBMI = useMemo(() => {
    const minBMI = 15; // Minimum possible BMI
    const maxBMI = 40; // Maximum possible BMI
    return (calculateBMI - minBMI) / (maxBMI - minBMI);
  }, [calculateBMI]);

  const getProgressColor = useMemo(() => {
    if (calculateBMI < 18.5) {
      return "text-blue-500"; // Underweight
    } else if (calculateBMI >= 18.5 && calculateBMI < 25) {
      return "text-green-500"; // Normal weight
    } else if (calculateBMI >= 25 && calculateBMI < 30) {
      return "text-yellow-500"; // Overweight
    } else {
      return "text-red-500"; // Obese
    }
  }, [calculateBMI]);

  const calculatedBMI = calculateBMI;
  const normalizedBMI = normalizeBMI;
  const calculatedProgressColor = getProgressColor;

  return (
    <div>
      <main className="my-5 sm:mx-auto mx-5 max-w-md p-5 pb-10 mb-10 bg-white rounded-lg shadow-sm">
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
            className={`radial-progress ${calculatedProgressColor}`}
            style={{
              "--value": normalizedBMI * 100,
              "--size": "12rem",
            }}
            role="progressbar"
          >
            <span className="text-2xl font-bold">
              {calculatedBMI.toFixed(1)}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
