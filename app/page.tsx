import PremiumEstimator from "@/components/PremiumEstimator";
import React from "react";

const Home = () => {
  return (
    <section className="home md:container md:mx-auto">
      <div className="home-content">
        <header className="home-header">Payroll Perfect</header>
        <PremiumEstimator />
      </div>
    </section>
  );
};

export default Home;
