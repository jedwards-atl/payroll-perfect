import PremiumEstimator from "@/components/PremiumEstimator";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-blue-1 p-20">
        <div className="md:container md:mx-auto coronavirus-cover-lookup">
          <div className="module form">
            <div className="module-content">
              <div className="left-content">
                <h2>Estimate in seconds</h2>
                <h3>
                  Workers' Comp in a click. Simply slide your payroll tool to
                  get an estimate for your workers' comp policy!
                </h3>
                <ul>
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
      <section className="home md:container md:mx-auto">
        <div className="home-content">
          <div className="flex flex-col items-center">
            <PremiumEstimator />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
