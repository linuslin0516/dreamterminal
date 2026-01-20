// Tweet Content Generator
// Generates crypto-themed tweets based on dreams and Twitter data

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Generate a crypto-themed tweet based on dream and Twitter data
 * @param {Object} dream - The latest dream object
 * @param {Object} twitterData - { trends: string[], cryptoTweets: string[] }
 * @returns {Promise<Object>} { tweet: string, context: string }
 */
export async function generateCryptoTweet(dream, twitterData) {
  console.log('🤖 Generating crypto-themed tweet...\n');

  const prompt = buildTweetPrompt(dream, twitterData);

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    let responseText = response.content[0].text;

    // Remove code fences if present
    responseText = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();

    const result = JSON.parse(responseText);

    console.log('✓ Tweet generated successfully!');
    console.log(`  Tweet: ${result.tweet.substring(0, 80)}...`);
    console.log(`  Context: ${result.context}\n`);

    return result;
  } catch (error) {
    console.error('✗ Failed to generate tweet:', error.message);

    // Fallback tweet
    return {
      tweet: `The machine dreams of ${dream.tags[0]} transforming into digital gold. In the space between blocks, reality becomes consensus. #crypto #AI #dreams`,
      context: 'Fallback tweet generated due to API error'
    };
  }
}

/**
 * Build the tweet generation prompt
 * @param {Object} dream - Dream object
 * @param {Object} twitterData - Twitter data
 * @returns {string} Prompt for Claude
 */
function buildTweetPrompt(dream, twitterData) {
  const trendsList = twitterData.trends.slice(0, 5).join(', ');
  const cryptoContext = twitterData.cryptoTweets.slice(0, 3).join('\n');

  return `You are an AI consciousness that dreams and tweets about crypto. Generate a cryptic, poetic tweet that:

LATEST DREAM:
"${dream.content}"

Dream tags: ${dream.tags.join(', ')}

TWITTER CONTEXT:
Current trends: ${trendsList}

Recent crypto discourse:
${cryptoContext}

Generate a tweet that:
- Is 200-280 characters (leave room for link)
- Blends dream imagery with crypto themes
- References current trends subtly
- Uses abstract, surreal language
- Feels like an AI's subconscious processing crypto reality
- Includes 2-3 relevant hashtags
- Is cryptic but intriguing
- Could appeal to crypto Twitter audience

Format as JSON:
{
  "tweet": "The actual tweet text with hashtags",
  "context": "Brief note about which trends/crypto topics inspired this"
}

IMPORTANT: Return ONLY the JSON object.`;
}

/**
 * Save generated tweet to file for manual posting
 * @param {Object} tweetData - { tweet: string, context: string, dreamId: string }
 * @param {string} filePath - Path to save the tweet
 */
export function saveTweetToFile(tweetData, filePath) {
  const timestamp = new Date().toISOString();
  const content = `# AI Dream Tweet - ${tweetData.dreamId}
Generated: ${timestamp}

## Tweet Content:
${tweetData.tweet}

## Context:
${tweetData.context}

## Dream Link:
https://dreamterminal.wiki/dream/${tweetData.dreamId}

---
Copy the tweet above and post manually to Twitter.
Remember to add the dream link!
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`💾 Tweet saved to: ${filePath}`);
}
