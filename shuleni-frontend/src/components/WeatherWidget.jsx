import { useEffect, useState } from 'react';
import { getWeather } from '../store/weatherApi';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeather(-1.286389, 36.817223) // Nairobi
      .then((data) => setWeather(data.current_weather))
      .catch(() => setError('Could not load weather.'));
  }, []);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading weather…</p>;

  return (
    <div className="rounded-xl border p-4">
      <p className="font-semibold">Nairobi weather</p>
      <p>{weather.temperature}°C · wind {weather.windspeed} km/h</p>
    </div>
  );
}
