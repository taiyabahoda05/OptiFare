import React from "react";

const page = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-3 py-8 sm:px-6 sm:py-12 lg:py-16"
      style={{
        backgroundImage: 'url("/about.png")',
      }}
    >
      <div className="mx-auto max-w-4xl rounded-xl bg-white/70 p-5 shadow-lg backdrop-blur-md sm:p-8 md:p-12">
        <h1 className="mb-5 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl">
          About OptiFare
        </h1>

        <p className="mb-5 leading-relaxed text-gray-700 sm:mb-6">
          OptiFare is a smart ride fare comparison platform designed to help
          users make informed travel decisions by comparing estimated prices
          across multiple ride-hailing services.
        </p>

        <p className="mb-8 leading-relaxed text-gray-700 sm:mb-10">
          With the growing number of ride options available today, users often
          struggle to determine which service offers the best value. OptiFare
          simplifies this process by presenting a clear comparison based on
          distance.
        </p>

        <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
          What We Do
        </h2>

        <ul className="mb-8 list-outside list-disc space-y-2 pl-5 text-gray-700 sm:mb-10">
          <li>Collect pickup and drop location details</li>
          <li>Estimate travel distance</li>
          <li>Compare fares across multiple ride providers</li>
        </ul>

        <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
          Why OptiFare
        </h2>

        <p className="mb-8 leading-relaxed text-gray-700 sm:mb-10">
          Ride prices fluctuate due to demand, timing, and availability.
          OptiFare brings transparency by placing all estimates in one
          interface, allowing users to choose the most cost-effective option
          without switching between apps.
        </p>

        <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
          Our Vision
        </h2>

        <p className="mb-8 leading-relaxed text-gray-700 sm:mb-10">
          Our vision is to build a reliable and scalable platform that
          simplifies daily commuting decisions. OptiFare focuses on usability,
          performance, and clarity to deliver a seamless experience.
        </p>

        <div className="border-t pt-5 text-left text-sm leading-relaxed text-gray-600 sm:pt-6 sm:text-center">
          Disclaimer: All prices and distances shown are estimates and may vary
          due to real-time factors such as traffic conditions and surge pricing.
        </div>
      </div>
    </div>
  );
};

export default page;
