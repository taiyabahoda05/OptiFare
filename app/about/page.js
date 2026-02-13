import React from "react";

const page = () => {
  return (
    // <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="min-h-screen bg-cover bg-center px-6 py-16"
          style={{
            backgroundImage: 'url("/about.png")',
          }}
        >
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About OptiFare
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            OptiFare is a smart ride fare comparison platform designed to help
            users make informed travel decisions by comparing estimated prices
            across multiple ride-hailing services.
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            With the growing number of ride options available today, users often
            struggle to determine which service offers the best value. OptiFare
            simplifies this process by presenting a clear comparison based on
            distance.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Do
          </h2>

          <ul className="list-disc list-inside text-gray-700 mb-10 space-y-2">
            <li>Collect pickup and drop location details</li>
            <li>Estimate travel distance</li>
            <li>Compare fares across multiple ride providers</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Why OptiFare
          </h2>

          <p className="text-gray-700 leading-relaxed mb-10">
            Ride prices fluctuate due to demand, timing, and availability.
            OptiFare brings transparency by placing all estimates in one
            interface, allowing users to choose the most cost-effective option
            without switching between apps.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Our Vision
          </h2>

          <p className="text-gray-700 leading-relaxed mb-10">
            Our vision is to build a reliable and scalable platform that
            simplifies daily commuting decisions. OptiFare focuses on usability,
            performance, and clarity to deliver a seamless experience.
          </p>

          <div className="border-t pt-6 text-sm text-center text-gray-600">
            Disclaimer: All prices and distances shown are estimates and may vary due to
            real-time factors such as traffic conditions and surge pricing.
          </div>
        </div>
       </div>
  );
};

export default page;
