import { formatVolume } from "@/lib/formatNumber"; // Your formatting utility
import axios from "axios";

export async function GET(req, res) {
  try {
    const bybitUrl = "https://api.bybit.com/spot/v3/public/quote/ticker/24hr";

    const [bybitResponse] = await Promise.all([axios.get(bybitUrl)]);

    const bybitData = bybitResponse.data.result.list
      .filter((item) => item.s.endsWith("USDT")) // Filter USDT pairs
      .map((item) => ({
        symbol: item.s, // Symbol is in the 's' field
        volume: parseFloat(item.qv), // Quote volume is in the 'qv' field
        exchange: "Bybit",
      }));

    const combinedData = [...bybitData]
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
