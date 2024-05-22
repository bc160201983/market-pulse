"use client";
import { useState, useEffect } from "react";
import { formatVolume } from "@/lib/formatNumber"; // Import your utility
import styles from "../styles/Home.module.css";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [bybitListings, setBybitListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/crypto`);
        const data = await res.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error state (e.g., set an error message)
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/bybit`);
        const data = await res.json();
        setBybitListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error state (e.g., set an error message)
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>Crypto Listings</h1>
      <p>
        Application that fetches and displays 24-hour trading volume data for
        cryptocurrency pairs spot (USDT) from Binance and Bybit, allowing users
        to filter results by minimum volume.
      </p>
      <div className="flex gap-10">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Exchange</th>
              <th>24H Volume</th>
              <th>Tradingview</th>
            </tr>
          </thead>
          <tbody>
            {listings?.map((listing) => (
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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Exchange</th>
              <th>24H Volume</th>
              <th>Tradingview</th>
            </tr>
          </thead>
          <tbody>
            {bybitListings?.map((listing) => (
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
