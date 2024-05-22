import { formatVolume } from "@/lib/formatNumber"; // Your formatting utility
import axios from "axios";

export async function GET(req, res) {
  try {
    const binanceUrl = "https://api.binance.com/api/v3/ticker/24hr";
    const bybitUrl = "https://api.bybit.com/v2/public/tickers";

    const [binanceResponse, bybitResponse] = await Promise.all([
      axios.get(binanceUrl),
      axios.get(bybitUrl),
    ]);

    const binanceData = binanceResponse.data
      .filter((item) => item.symbol.includes("USDT"))
      .map((item) => ({
        symbol: item.symbol,
        volume: parseFloat(item.quoteVolume),
        exchange: "Binance",
      }));

    const bybitData = bybitResponse.data.result
      .filter((item) => item.symbol.includes("USDT"))
      .map((item) => ({
        symbol: item.symbol,
        volume: parseFloat(item.quote_volume),
        exchange: "Bybit",
      }));

    const combinedData = [...binanceData, ...bybitData]
      .filter((item) => item.volume > 0)
      .sort((a, b) => b.volume - a.volume);

    // return res.status(200).json(combinedData);
    return new Response(JSON.stringify(combinedData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
