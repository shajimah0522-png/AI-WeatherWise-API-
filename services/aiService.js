const { GoogleGenerativeAI } = require('@google/generative-ai');

function fallbackInsights(w) {
  const t = w.temperature;
  const wet = /rain|drizzle|storm|thunder/i.test(w.condition);
  let clothing = 'Light, comfortable clothing.';
  if (t < 10) clothing = 'Wear a warm jacket and layers.';
  else if (t < 20) clothing = 'A light jacket or sweater is good.';
  else if (t > 32) clothing = 'Wear breathable cotton and carry water.';

  let activity = 'Great day for a walk or sightseeing.';
  if (wet) activity = 'Better for indoor plans like museums or cafes.';
  else if (t > 35) activity = 'Avoid midday outdoors; go early morning or evening.';
  else if (t < 5) activity = 'Keep outdoor time short; try indoor activities.';

  return {
    summary: `It is ${t}°C in ${w.city} with ${w.condition}. Humidity is ${w.humidity}%.`,
    recommendations: [clothing, activity],
    source: 'fallback',
  };
}

exports.getInsights = async (weather) => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return fallbackInsights(weather);

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    });
    const prompt = `Weather in ${weather.city}: ${weather.temperature}°C (feels ${weather.feelsLike}°C), ${weather.condition}, humidity ${weather.humidity}%, wind ${weather.windSpeed} m/s.
Reply with a 2-sentence friendly summary, then 3 short bullet recommendations for clothing and outdoor activities.`;
    const result = await model.generateContent(prompt);
    return { text: result.response.text(), source: 'gemini' };
  } catch (err) {
    console.error('Gemini failed, using fallback:', err.message);
    return fallbackInsights(weather);
  }
};
