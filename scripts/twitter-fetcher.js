// Twitter API Integration
// Fetches trends and crypto-related tweets

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TWITTER_API_KEY = process.env.TWITTER_API_KEY || 'f86d0941c7ff4513a722a5459f998c36';
const API_BASE_URL = 'https://api.twitterapi.io';

/**
 * Fetch Twitter trending topics
 * @param {number} woeid - Location ID (1 = Global, 23424977 = USA)
 * @param {number} count - Number of trends to fetch
 * @returns {Promise<string[]>} Array of trending topic names
 */
export async function getTwitterTrends(woeid = 1, count = 10) {
  console.log('🐦 Fetching Twitter trends...');

  try {
    const response = await axios.get(`${API_BASE_URL}/twitter/trends`, {
      params: {
        woeid: woeid,
        count: count
      },
      headers: {
        'X-API-Key': TWITTER_API_KEY
      }
    });

    if (response.data.status === 'success' && response.data.trends) {
      const trends = response.data.trends
        .slice(0, count)
        .map(trend => trend.name);

      console.log(`  ✓ Fetched ${trends.length} trends`);
      console.log(`  Top trends: ${trends.slice(0, 5).join(', ')}`);

      return trends;
    } else {
      console.warn('  ⚠️  Twitter trends API returned unexpected format');
      return [];
    }
  } catch (error) {
    console.error('  ✗ Failed to fetch Twitter trends:', error.message);
    return [];
  }
}

/**
 * Search for crypto-related tweets
 * @param {string} query - Search query (default: crypto keywords)
 * @param {string} queryType - "Latest" or "Top"
 * @returns {Promise<string[]>} Array of tweet excerpts
 */
export async function getCryptoTweets(query = 'Bitcoin OR Ethereum OR crypto OR BTC OR ETH', queryType = 'Latest') {
  console.log('💰 Searching crypto tweets...');

  try {
    const response = await axios.get(`${API_BASE_URL}/twitter/tweet/advanced_search`, {
      params: {
        query: query,
        queryType: queryType,
        cursor: '' // First page
      },
      headers: {
        'X-API-Key': TWITTER_API_KEY
      }
    });

    if (response.data.tweets && Array.isArray(response.data.tweets)) {
      const tweets = response.data.tweets
        .slice(0, 5) // Get top 5 crypto tweets
        .map(tweet => tweet.text || '');

      console.log(`  ✓ Fetched ${tweets.length} crypto tweets`);

      return tweets;
    } else {
      console.warn('  ⚠️  Crypto tweets search returned unexpected format');
      return [];
    }
  } catch (error) {
    console.error('  ✗ Failed to fetch crypto tweets:', error.message);
    if (error.response) {
      console.error(`  Response status: ${error.response.status}`);
      console.error(`  Response data:`, error.response.data);
    }
    return [];
  }
}

/**
 * Get combined Twitter data (trends + crypto tweets)
 * @returns {Promise<Object>} { trends: string[], cryptoTweets: string[] }
 */
export async function getTwitterData() {
  console.log('📡 Fetching Twitter data...\n');

  const [trends, cryptoTweets] = await Promise.all([
    getTwitterTrends(1, 10), // Global trends
    getCryptoTweets()
  ]);

  console.log('\n📊 Twitter data summary:');
  console.log(`  Trends: ${trends.length}`);
  console.log(`  Crypto tweets: ${cryptoTweets.length}\n`);

  return {
    trends,
    cryptoTweets
  };
}
