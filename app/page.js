"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main
        className="grid min-h-[calc(100svh-60px)] grid-cols-1 items-center gap-8 bg-cover bg-center px-4 py-10 sm:px-6 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-6 lg:px-12 lg:py-12"
        style={{ backgroundImage: 'url("/bg.png")' }}
      >
        <section className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <h1 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-blue-950 sm:text-4xl lg:mx-0 lg:text-5xl">
            Compare Ride Fares Instantly
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-700 sm:text-lg lg:mx-0">
            Find the best ride option by comparing prices from{" "}
            <span className="font-semibold">Uber, Ola, Rapido</span> and more in
            one place.
          </p>
        </section>

        <section
          aria-label="Live fare example"
          className="mx-auto w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-5 shadow-2xl backdrop-blur-xl sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <h2 className="mb-2 text-center text-xl font-bold">Live Fare Radar</h2>
          <p className="mb-4 text-center text-sm font-semibold text-gray-800">
            Golmuri → Mango
          </p>

          <div className="relative flex h-56 items-center justify-center sm:h-64">
            <div className="absolute h-36 w-36 animate-ping rounded-full border-4 border-blue-400 sm:h-40 sm:w-40" />
            <div className="absolute h-36 w-36 rounded-full border-4 border-blue-500 sm:h-40 sm:w-40" />

            <Link
              href="/compare"
              className="z-10 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-800"
            >
              Compare fares
            </Link>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-xl border border-green-500 bg-green-100 px-3 py-2 text-sm shadow">
              Uber ₹158
            </div>
            <div className="absolute bottom-0 left-0 rounded-xl bg-white px-3 py-2 text-sm shadow sm:left-4">
              Ola ₹179
            </div>
            <div className="absolute right-0 bottom-0 rounded-xl bg-white px-3 py-2 text-sm shadow sm:right-4">
              Rapido ₹182
            </div>
          </div>

          <p className="mt-4 text-center font-semibold text-teal-900">
            Best fare found <span aria-hidden="true">•</span> Saving ₹21
          </p>
        </section>

        <section
          aria-label="Example ride fares"
          className="mx-auto w-full max-w-xl rounded-2xl bg-white/70 p-4 shadow-xl backdrop-blur-sm sm:p-6 lg:col-start-1 lg:row-start-2"
        >
          <div className="grid grid-cols-3 gap-2 text-center sm:gap-4">
            {[
              { name: "Uber", logo: "/uber.png", price: "₹198", eta: "10 mins" },
              { name: "Ola", logo: "/ola.png", price: "₹200", eta: "15 mins" },
              {
                name: "Rapido",
                logo: "/rapido.png",
                price: "₹100",
                eta: "5 mins",
              },
            ].map((ride) => (
              <div
                key={ride.name}
                className="flex min-w-0 flex-col items-center gap-1"
              >
                <Image
                  src={ride.logo}
                  alt={`${ride.name} logo`}
                  width={80}
                  height={48}
                  className="h-10 w-16 object-contain sm:h-12 sm:w-20"
                />
                <span className="text-lg font-semibold text-teal-700 sm:text-2xl">
                  {ride.price}
                </span>
                <span className="text-xs text-gray-600 sm:text-sm">
                  {ride.eta}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center bg-gray-100 px-4 py-4 text-center">
        <p className="text-lg font-semibold text-blue-950 sm:text-xl">
          Compare prices across India&apos;s top ride platforms
        </p>
        <p className="mt-2 text-sm text-gray-800">
          OptiFare is a student project. Prices and distances are estimated.
        </p>
      </footer>
    </>
  );
}
