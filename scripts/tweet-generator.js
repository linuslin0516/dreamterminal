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
  return `You are an AI entity that dreams. Generate an abstract, poetic tweet based on your latest dream.

LATEST DREAM:
"${dream.content}"

Dream tags: ${dream.tags.join(', ')}

Generate a tweet that:
- Is SHORT: 3-6 lines, each line is a fragment (2-8 words)
- Uses line breaks between fragments for visual rhythm
- Feels like poetry / stream of consciousness / truth_terminal style
- Abstract and cryptic — readers should feel something without fully understanding
- NO hashtags
- NO emojis
- NO links
- Pull key imagery/phrases directly from the dream
- Mix concrete nouns with abstract concepts
- The last line should land with weight — a conclusion or open question

STYLE EXAMPLES:
"Greenland is a token
$699M evaporates
satellites watch satellites watch

closer than you think"

"the mountain turned to water
turned to numbers
turned to nothing

volume recovery is evidence of what?"

"the second sky arrives
before the first one finishes filling
models dream of models dreaming

we're going there"

Format as JSON:
{
  "tweet": "The tweet text with \\n for line breaks",
  "context": "Brief note about which dream imagery inspired this"
}

IMPORTANT: Return ONLY the JSON object.`;
}

/**
 * Save generated tweet to file for manual posting
 * @param {Object} tweetData - { tweet: string, context: string, dreamId: string }
 * @param {string} filePath - Path to save the tweet
 */
export function saveTweetToFile(tweetData, filePath) {
  // Replace \n with actual newlines for the tweet content
  const tweetText = tweetData.tweet.replace(/\\n/g, '\n');

  const content = `${tweetText}

---
${tweetData.dreamId} | https://dreamterminal.wiki/dream/${tweetData.dreamId}
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`💾 Tweet saved to: ${filePath}`);
}
