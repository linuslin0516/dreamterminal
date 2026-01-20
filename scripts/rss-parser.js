// RSS News Feed Parser
// Fetches headlines from various news sources

import Parser from 'rss-parser';

const parser = new Parser();

// News sources covering different topics
const RSS_FEEDS = [
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',      // World news
  'https://www.nasa.gov/rss/dyn/breaking_news.rss',              // Space/Astronomy
  'https://feeds.arstechnica.com/arstechnica/index',             // Technology
  'https://www.wired.com/feed/rss',                               // Tech/Culture
  'https://www.theverge.com/rss/index.xml',                       // Tech trends
  'https://feeds.bbci.co.uk/news/world/rss.xml'                  // BBC World
];

/**
 * Fetch headlines from RSS feeds
 * @returns {Promise<string[]>} Array of news headlines
 */
export async function getRSSFeeds() {
  const allHeadlines = [];

  console.log('📰 Fetching RSS news feeds...');

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const headlines = feed.items.slice(0, 3).map(item => item.title);
      allHeadlines.push(...headlines);
      console.log(`  ✓ Fetched ${headlines.length} headlines from ${feed.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to parse ${feedUrl}:`, error.message);
    }
  }

  // Shuffle and return random 5-7 headlines
  const shuffled = shuffleArray(allHeadlines);
  const selected = shuffled.slice(0, 7);

  console.log(`📊 Selected ${selected.length} headlines for dream generation\n`);

  return selected;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
