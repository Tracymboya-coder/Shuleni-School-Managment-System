// Fetch wrapper for the free Open-Meteo weather API (no key required).
// Kept separate from api.js, which talks specifically to the Flask backend.

export async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }
  return res.json();
}
