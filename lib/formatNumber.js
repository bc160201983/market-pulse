// lib/formatNumber.js
export function formatVolume(volume) {
  if (volume >= 1e12) {
    return (volume / 1e12).toFixed(2) + "T"; // Trillions
  } else if (volume >= 1e9) {
    return (volume / 1e9).toFixed(2) + "B"; // Billions
  } else if (volume >= 1e6) {
    return (volume / 1e6).toFixed(2) + "M"; // Millions
  } else {
    return volume.toString();
  }
}
