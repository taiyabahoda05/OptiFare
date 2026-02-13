"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const page = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("Now");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Jamshedpur");
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [fare, setFare] = useState([]);
  const [best, setBest] = useState(null);
  const pickupTimerRef = useRef(null);
  const dropTimerRef = useRef(null);
  const suggestionsCacheRef = useRef({});
  const [aiPrediction, setAiPrediction] = useState(null);

  const cityViewboxes = {
    Hyderabad: { left: 78.23, top: 17.56, right: 78.62, bottom: 17.26 },
    Jamshedpur: { left: 86.12, top: 22.86, right: 86.32, bottom: 22.72 },
    Kolkata: { left: 88.25, top: 22.65, right: 88.45, bottom: 22.45 },
    Chennai: { left: 80.17, top: 13.15, right: 80.34, bottom: 12.9 },
    Mumbai: { left: 72.77, top: 19.28, right: 72.99, bottom: 18.89 },
    Delhi: { left: 76.84, top: 28.9, right: 77.35, bottom: 28.4 },
    Asansol: { left: 86.9, top: 23.74, right: 87.08, bottom: 23.62 },
  };

  const getCityViewbox = () => {
    const box = cityViewboxes[city];
    if (!box) return "";
    return `${box.left},${box.top},${box.right},${box.bottom}`;
  };

  useEffect(() => {
    setPickupSuggestions([]);
    setDropSuggestions([]);
    suggestionsCacheRef.current = {};
  }, [city]);

  //Convert place name into lat/lon using OpenStreetMap
  const getCoordinates = async (place) => {
    try {
      const viewbox = getCityViewbox();
      const res = await fetch(
        `/api/geocode?q=${encodeURIComponent(place)}&limit=1&viewbox=${encodeURIComponent(viewbox)}`,
      );
      if (!res.ok) return null;
      const json = await res.json();
      const data = Array.isArray(json.data) ? json.data : [];
      if (data.length === 0) return null;

      return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon),
      };
    } catch {
      return null;
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query || query.trim().length < 3) return [];
    const clean = query.trim().toLowerCase();
    const cacheKey = `${city}|${clean}`;
    if (suggestionsCacheRef.current[cacheKey]) {
      return suggestionsCacheRef.current[cacheKey];
    }
    try {
      const viewbox = getCityViewbox();
      const res = await fetch(
        `/api/geocode?q=${encodeURIComponent(`${query},${city}`)}&limit=5&viewbox=${encodeURIComponent(viewbox)}`,
      );
      if (!res.ok) return [];
      const json = await res.json();
      const data = Array.isArray(json.data) ? json.data : [];
      const results = [];
      for (let i = 0; i < data.length; i += 1) {
        const item = data[i];
        if (item.class === "boundary" || item.type === "administrative") {
          continue;
        }
        //Returns the first two parts of the display name (Filtering)
        const parts = String(item.display_name || "").split(",");
        const first = parts[0] ? parts[0].trim() : "";
        const second = parts[1] ? parts[1].trim() : "";
        const label = second ? `${first},${second}` : first;
        if (!label) continue;

        //Removes duplicates
        let exists = false;
        for (let j = 0; j < results.length; j += 1) {
          if (results[j].label === label) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          results.push({ id: item.place_id, label });
        }
      }
      suggestionsCacheRef.current[cacheKey] = results;
      return results;
    } catch {
      return [];
    }
  };

  const handlePickupChange = async (value) => {
    setPickup(value);
    setIsPickupOpen(true);
    if (pickupTimerRef.current) {
      clearTimeout(pickupTimerRef.current);
    }
    if (value.trim().length < 3) {
      setPickupSuggestions([]);
      return;
    }
    pickupTimerRef.current = setTimeout(async () => {
      const suggestions = await fetchSuggestions(value);
      setPickupSuggestions(suggestions);
    }, 200);
  };

  const handleDropChange = async (value) => {
    setDrop(value);
    if (dropTimerRef.current) {
      clearTimeout(dropTimerRef.current);
    }
    if (value.trim().length < 3) {
      setDropSuggestions([]);
      return;
    }
    dropTimerRef.current = setTimeout(async () => {
      const suggestions = await fetchSuggestions(value);
      setDropSuggestions(suggestions);
    }, 200);
  };

  //Get real road diatances using OSRM
  const calculateDistance = async () => {
    setError("");
    setIsLoading(true);
    setDistance("");
    setFare([]);
    setBest(null);

    try {
      if (!pickup.trim() || !drop.trim()) {
        throw new Error("Please enter both pickup and drop locations.");
      }

      const origin =
        (await getCoordinates(`${pickup},${city}`)) ||
        (await getCoordinates(pickup));
      const destination =
        (await getCoordinates(`${drop},${city}`)) ||
        (await getCoordinates(drop));

      if (!origin || !destination) {
        throw new Error(
          "Unable to find one or both locations. Try adding a landmark or area name.",
        );
      }

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`,
      );
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error("No route found between these locations.");
      }

      const km = (data.routes[0].distance / 1000).toFixed(2);
      setDistance(km);

      const aiRes = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          distance: Number(km),
          city,
          time,
        }),
      });

      const aiData = await aiRes.json();
      setAiPrediction(typeof aiData.prediction === "number" ? aiData.prediction : null);

      let timeMultiplier = 1.0;
      if (time === "15 mins") timeMultiplier = 1.05; //5% increase for 15 mins delay
      if (time === "30 mins") timeMultiplier = 1.1; //10% increase for 30 mins delay
      if (time === "1 hour") timeMultiplier = 1.2; //20% increase for 1 hour delay

      const pricing = [
        { name: "Uber", base: 42, perKm: 12.5 },
        { name: "Ola", base: 44, perKm: 12.0 },
        { name: "Rapido", base: 38, perKm: 13.5 },
      ];

      const computedFares = [];
      let bestFare = null;

      for (let i = 0; i < pricing.length; i += 1) {
        const item = pricing[i];
        const fare = Math.round(
          (item.base + Number(km) * item.perKm) * timeMultiplier,
        );

        const row = { name: item.name, fare };
        computedFares.push(row);
        if (!bestFare || fare < bestFare.fare) {
          bestFare = row;
        }
      }

      setFare(computedFares);
      setBest(bestFare);
      await fetch("/api/save-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup,
          drop,
          city,
          distance: km,
          time,
          fares: computedFares,
          best: bestFare,
        }),
      });

      setPickup("");
      setDrop("");
      setPickupSuggestions([]);
      setDropSuggestions([]);
      setIsPickupOpen(false);
      setIsDropOpen(false);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center px-6 py-16"
        style={{
          backgroundImage: 'url("/compare.png")',
        }}
      >
        <div className="flex flex-col max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-xl text-center font-bold mb-6 text-[#516C7B]">
            ─── Compare. Decide. Save ───
          </h1>
          <div className="mb-4 flex items-center gap-4">
            <i
              className="fa-solid fa-location-dot text-4xl"
              style={{ color: "#046dbe" }}
            ></i>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => handlePickupChange(e.target.value)}
                onFocus={() => setIsPickupOpen(true)}
                onBlur={() => setTimeout(() => setIsPickupOpen(false), 150)}
                className="w-full border border-gray-400 rounded-md px-2 py-1"
              />
              {isPickupOpen && pickupSuggestions.length > 0 ? (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow">
                  {pickupSuggestions.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onMouseDown={() => {
                        setPickup(item.label);
                        setIsPickupOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <i
              className="fa-solid fa-location-dot text-4xl"
              style={{ color: "#10a277" }}
            ></i>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter drop location"
                value={drop}
                onChange={(e) => handleDropChange(e.target.value)}
                onFocus={() => setIsDropOpen(true)}
                onBlur={() => setTimeout(() => setIsDropOpen(false), 150)}
                className="w-full border border-gray-400 rounded-md px-2 py-1"
              />
              {isDropOpen && dropSuggestions.length > 0 ? (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow">
                  {dropSuggestions.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onMouseDown={() => {
                        setDrop(item.label);
                        setIsDropOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Hyderabad">Hyderabad</option>
              <option value="Jamshedpur">Jamshedpur</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Asansol">Asansol</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Now">Now</option>
              <option value="15 mins">After 15 mins</option>
              <option value="30 mins">After 30 mins</option>
              <option value="1 hour">After 1 hour</option>
            </select>
          </div>
          <button
            onClick={calculateDistance}
            disabled={isLoading}
            className="text-lg rounded-lg bg-teal-600 text-white px-4 py-1 hover:bg-green-900 transition-colors duration-300 ease-in-out hover:scale-110 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isLoading ? "Calculating..." : "Show Best Price"}
          </button>
          {error ? (
            <p className="text-xs text-red-600 mt-2 text-center">{error}</p>
          ) : null}
          <p className="text-xs text-gray-600 mt-3 text-center">
            Note: Prices and distances shown are estimates.
          </p>

          {fare.length > 0 && best ? (
            <div className="mt-10 bg-white/50 shadow-lg rounded-xl p-6 border border-gray-200">
              <p className="mb-4 text-lg text-center">
                Distance: <b>{Number(distance).toFixed(2)} km</b> | Time:{" "}
                <b>{time}</b>
              </p>

              {fare.map((item) => (
                <div
                  key={item.name}
                  className={`flex justify-between p-4 mb-3 rounded-lg ${
                    item.name === best.name
                      ? "bg-green-100 border border-green-400"
                      : "bg-gray-100"
                  }`}
                >
                  <span className="font-semibold">{item.name}</span>
                  <span>Rs {item.fare}</span>
                </div>
              ))}

              <div className="mt-4 text-green-700 font-bold text-center">
                <Link href="/">Best Option: {best.name} saves you money!</Link>
                {aiPrediction && (
                  <div className="text-blue-700 font-bold text-center mt-2">
                    AI predicted average future fare: Rs {Math.round(aiPrediction)}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default page;


