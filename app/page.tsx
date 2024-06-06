"use client";

import PayrollCalculator from "@/components/PayrollCalculator";
import PremiumEstimator from "@/components/PremiumEstimator";
import React, { useState } from "react";
import ReactCardFlip from 'react-card-flip';

const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [payroll, setPayroll] = useState(0);

  function handleSetPayrollCalculator(new_payroll: number) {
    setIsFlipped(!isFlipped);
    if (new_payroll > 0) {
      setPayroll(new_payroll);
    }
  }

  return (
    <div className="bg-gray-200 pb-20">
      <div className="bg-blue-1 px-20 pt-32 pb-80">
        <div className="md:container md:mx-auto coronavirus-cover-lookup">
          <div className="module form">
            <div className="module-content">
              <div className="left-content">
                <h2>Estimate in seconds</h2>
                <h3 className="mb-6 text-26 w-3/4">
                  Workers' Comp in a click. Simply slide your payroll tool to
                  get an estimate for your workers' comp policy!
                </h3>
                <ul className="text-26">
                  <li className="credit-card">Slide</li>
                  <li className="file-certificate">Estimate</li>
                  <li className="message-smile">Insure</li>
                </ul>
              </div>
              <div className="right-content">
                <img
                  alt="Woman and man looking at laptop"
                  src="woman-and-man-looking-at-laptop.png"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-64">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" infinite={false}>
          <PremiumEstimator toggleCalculator={handleSetPayrollCalculator} payroll={payroll}/>
          <PayrollCalculator toggleCalculator={handleSetPayrollCalculator} />
        </ReactCardFlip>
      </div>
    </div>
  );
};

export default Home;
