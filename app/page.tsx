import PremiumEstimator from "@/components/PremiumEstimator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
                <h3 className="mb-6 text-26 w-3/4">
                  Workers' Comp in a click. Simply slide your payroll tool to
                  get an estimate for your workers' comp policy!
                </h3>
                <ul>
                <ul className="text-26">
                  <li className="credit-card">Slide</li>
                  <li className="file-certificate">Estimate</li>
                  <li className="message-smile">Insure</li>
                </ul>
                <Button
                  className="mt-6 text-26 rounded border border-white bg-white font-semibold text-blue-2 shadow-form py-8 px-8"
                  type="submit"
                >
                  <p className="text-24">Payroll Calculator</p>
                  <Image
                    src="arrowIcon.svg"
                    alt="Arrow pointing right"
                    width={30}
                    height={30}
                    className="ml-4"
                  />
                </Button>
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
