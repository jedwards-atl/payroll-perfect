import PremiumEstimator from "@/components/PremiumEstimator";
import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-200 pb-20">
      <div className="bg-blue-1 px-20 pt-32 pb-44">
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

      {/* <section className="home-header flex flex-col justify-between"> */}
      {/* <div className="home-content"> */}
      <div className="-mt-20">
        <PremiumEstimator />
      </div>
      {/* </div> */}
      {/* </section> */}
    </div>
  );
};

export default Home;
