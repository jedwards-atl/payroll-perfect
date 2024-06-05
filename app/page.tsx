import PremiumEstimator from "@/components/PremiumEstimator";
import React from "react";

const Home = () => {
  return (
    <section className="home md:container md:mx-auto">
      <div className="home-content">
        <header className="home-header">Payroll Perfect</header>

        <div className="flex flex-col items-center">
          <PremiumEstimator />
        </div>
      </div>
    </section>
  );
};

export default Home;
