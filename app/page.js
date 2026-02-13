"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <main>
          <section className="grid grid-cols-2 h-[50vh]">
            <div>
              <div className="flex flex-col gap-4 items-center justify-center mt-20">
                <p className="text-blue-950 text-4xl font-bold">
                  Compare Ride Fares Instantly
                </p>
                <p className="text-lg font-stretch-50% text-center text-gray-600">
                  Find the best ride option by comparing prices from
                  <span className="font-semibold"> Uber, Ola, Rapido </span>
                  and more in one place.
                </p>
              </div>
              <div className="mt-12 mx-10 rounded-2xl bg-white/50 shadow-2xl p-8">
                <div className="flex justify-between items-center text-center">
                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <Image
                      src="/uber.png"
                      alt="Uber Logo"
                      width={100}
                      height={100}
                    />
                    <span className="text-2xl font-semibold text-teal-700">
                      ₹198
                    </span>
                    <span className="text-sm text-gray-600 mb-2.5">
                      10 mins
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <Image
                      src="/ola.png"
                      alt="Ola Logo"
                      width={100}
                      height={100}
                    />
                    <span className="text-2xl font-semibold text-teal-700">
                      ₹200
                    </span>
                    <span className="text-sm text-gray-600">15 mins</span>
                  </div>

                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <Image
                      src="/rapido.png"
                      alt="Rapido Logo"
                      width={100}
                      height={100}
                    />
                    <span className="text-2xl font-semibold text-teal-700 mt-2">
                      ₹100
                    </span>
                    <span className="text-sm text-gray-600">5 mins</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-130 w-full flex items-center justify-center">
              <div className="w-112.5 h-112.5 backdrop-blur-xl bg-white/50 border border-white/40 rounded-3xl shadow-2xl p-6 mt-10">
                <h2 className="text-xl font-bold text-center mb-3">
                  Live Fare Radar
                </h2>
                <p className="text-sm font-semibold text-gray-800 text-center mb-5"> Golmuri → Mango </p>

                <div className="relative flex items-center justify-center h-65">
                  <div className="absolute w-40 h-40 rounded-full border-4 border-blue-400 animate-ping"></div>
                  <div className="absolute w-40 h-40 rounded-full border-4 border-blue-500"></div>

                  <div className="z-40 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:scale-90 hover:shadow-2xl">
                   <Link href="/compare">Comparing...</Link>
                  </div>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 border border-green-500 px-4 py-2 rounded-xl shadow">
                    Uber ₹158
                  </div>

                  <div className="absolute bottom-0 left-10 bg-white px-4 py-2 rounded-xl shadow">
                    Ola ₹179
                  </div>

                  <div className="absolute bottom-0 right-10 bg-white px-4 py-2 rounded-xl shadow">
                    Rapido ₹182
                  </div>
                </div>

                <p className="text-center mt-6 text-teal-900 font-semibold">
                  Best Fare Found • Saving ₹21
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="flex flex-col items-center bg-gray-100">
        <p className="text-blue-950 text-center text-xl font-semibold mt-2">
          Compare prices across India's top ride platforms
        </p>
        <p className="text-sm text-gray-800 text-center mt-2 pb-5">
          Optifare is a student project. Prices and distances are estimated.
        </p>
      </div>
    </>
  );
}
