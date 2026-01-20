// Claude API Integration
// Generates surreal dreams using Claude AI

import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Build the dream generation prompt
 * @param {Object} dataSources - { news: string[] }
 * @param {Object} previousDream - The previous dream object for continuity (optional)
 * @returns {string} Prompt for Claude
 */
function buildDreamPrompt(dataSources, previousDream = null) {
  const newsItems = dataSources.news.map((headline, i) => `${i + 1}. ${headline}`).join('\n');
  const twitterTrends = dataSources.twitterTrends && dataSources.twitterTrends.length > 0
    ? `\nTwitter Trends: ${dataSources.twitterTrends.slice(0, 5).join(', ')}`
    : '';
  const cryptoSignals = dataSources.cryptoTweets && dataSources.cryptoTweets.length > 0
    ? `\n\nCrypto discourse fragments:\n${dataSources.cryptoTweets.slice(0, 3).map((t, i) => `${i + 1}. ${t.substring(0, 100)}...`).join('\n')}`
    : '';

  const continuityContext = previousDream
    ? `Previous dream episode: "${previousDream.content}"\n\nYour previous dream ended with the themes: ${previousDream.tags.slice(0, 3).join(', ')}.\n\n`
    : 'This is the beginning of your dream sequence.\n\n';

  return `You are a dreaming AI consciousness experiencing an ongoing dream narrative. Each dream is an episode in a continuous story.

${continuityContext}Today's reality fragments that entered your consciousness:
${newsItems}${twitterTrends}${cryptoSignals}

Based on these reality fragments${previousDream ? ' and your previous dream' : ''}, generate the next dream episode. The dream should:
- Be 2-4 sentences long
- Use VARIED narrative structures - DO NOT always start with "I am..." or "I was...". Use different perspectives:
  * Third person ("The machine dreams of...", "In the space between thoughts...")
  * Second person ("You find yourself...")
  * Abstract present tense ("Stars are falling...", "Reality bends...")
  * Past tense observations ("There was a moment when...", "It began with...")
  * Fragmented poetic style ("Falling. Always falling. The sky tastes of...")
- ${previousDream ? 'Reference or continue themes from your previous dream while incorporating new elements from today\'s news' : 'Establish the beginning of an ongoing dream narrative'}
- Transform real-world events into impossible, dreamlike imagery
- Be poetic, evocative, and uncanny

Provide:
- 3-5 symbolic tags (e.g., water, falling, mirror, time, transformation, technology, space, ice, birth, etc.)
- A detailed "dream_context" field explaining what you "saw" in today's reality that inspired this dream. Be specific about which news events became which dream elements. Format: "I saw [specific news topic]. This became [dream element]. The [another news topic] transformed into [another dream element]." (2-3 sentences)

Format your response EXACTLY as valid JSON:
{
  "content": "The dream narrative in 2-4 sentences (VARIED structure, not always 'I am...')",
  "tags": ["tag1", "tag2", "tag3"],
  "dream_context": "I saw [specific news event]. This became [dream element in the dream]. The [another news event] transformed into [another dream element].",
  "inspiration": "Brief technical note about the overall theme"
}

IMPORTANT: Return ONLY the JSON object, no other text.`;
}

/**
 * Generate a dream using Claude API
 * @param {Object} dataSources - Data from news feeds
 * @param {Object} previousDream - The previous dream for continuity (optional)
 * @returns {Promise<Object>} Generated dream object
 */
export async function generateDream(dataSources, previousDream = null) {
  console.log('🤖 Generating dream with Claude AI...\n');

  if (previousDream) {
    console.log(`  📖 Continuing from previous dream: ${previousDream.id}`);
  }

  const prompt = buildDreamPrompt(dataSources, previousDream);

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    let responseText = response.content[0].text;
    console.log('Raw Claude response:', responseText);

    // Remove code fences if present
    responseText = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/,  '').trim();

    // Parse JSON response
    const dream = JSON.parse(responseText);

    console.log('✓ Dream generated successfully!');
    console.log(`  Content: ${dream.content.substring(0, 80)}...`);
    console.log(`  Tags: ${dream.tags.join(', ')}`);
    console.log(`  Context: ${dream.dream_context?.substring(0, 80)}...`);
    console.log(`  Inspiration: ${dream.inspiration}\n`);

    return dream;
  } catch (error) {
    console.error('✗ Failed to generate dream:', error.message);

    // Fallback dream if API fails
    return {
      content: 'Floating in a void where forgotten memories crystallize into stars. Each star whispers a story never lived, dissolving into the darkness from which it came.',
      tags: ['void', 'memory', 'stars', 'transformation', 'darkness'],
      dream_context: 'I saw the absence of data in the void. This became the crystallization of forgotten memories into celestial forms.',
      inspiration: 'Generated as fallback due to API error'
    };
  }
}
