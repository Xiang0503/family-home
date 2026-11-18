// Cloudflare Pages Function: /api/weather
// Fetches the forecast server-side so phones that block third-party requests still get weather.
const URL_ = "https://api.open-meteo.com/v1/forecast?latitude=23.8925&longitude=120.4631&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTaipei&forecast_days=1";

export async function onRequestGet() {
  try {
    const r = await fetch(URL_, { cf: { cacheTtl: 600, cacheEverything: true } });
    if (!r.ok) return new Response("upstream " + r.status, { status: 502 });
    return new Response(r.body, {
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300" },
    });
  } catch (e) {
    return new Response("upstream error", { status: 502 });
  }
}
