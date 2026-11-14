import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on('error', (err) => console.error('Redis Client Error', err));
    await client.connect();
  }
  return client;
}

export async function getHomepageText() {
  try {
    const redis = await getRedisClient();
    return {
      hero: (await redis.get('home:hero')) || 'Welcome to TechHub',
      about: (await redis.get('home:about')) || 'Browse our 10 laptops from Dell, Lenovo and Acer',
      cta: (await redis.get('home:cta')) || 'Explore our products',
    };
  } catch (error) {
    console.error("Failed to fetch from Redis:", error);
    return {
      hero: 'Welcome to TechHub',
      about: 'Browse our 10 laptops from Dell, Lenovo and Acer',
      cta: 'Explore our products',
    };
  }
}