"use client";
import { useState, useEffect } from "react";
import { formatVolume } from "@/lib/formatNumber"; // Import your utility

export default function Home() {
  const [listings, setListings] = useState([]);
  const [bybitListings, setBybitListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/crypto`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error state (e.g., set an error message)
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/bybit`);
        const data = await res.json();
        setBybitListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error state (e.g., set an error message)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1>Crypto Listings</h1>
      <div className="flex gap-10">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Exchange</th>
              <th>24H Volume</th>
              <th>Tradingview</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.symbol + listing.exchange}>
                <td>{listing.symbol}</td>
                <td>{listing.exchange}</td>
                <td>{formatVolume(listing.volume)}</td>
                <td>
                  <a
                    href={`https://www.tradingview.com/chart/?symbol=Binance:${listing.symbol}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Exchange</th>
              <th>24H Volume</th>
              <th>Tradingview</th>
            </tr>
          </thead>
          <tbody>
            {bybitListings.map((listing) => (
              <tr key={listing.symbol + listing.exchange}>
                <td>{listing.symbol}</td>
                <td>{listing.exchange}</td>
                <td>{formatVolume(listing.volume)}</td>
                <td>
                  <a
                    href={`https://www.tradingview.com/chart/?symbol=BYBIT:${listing.symbol}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
