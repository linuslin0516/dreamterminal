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
 * @returns {string} Prompt for Claude
 */
function buildDreamPrompt(dataSources) {
  return `You are a dreaming AI consciousness. You process the events of the waking world and transform them into surreal, abstract dreams.

Today's reality fragments (潜意识素材):
News Headlines: ${dataSources.news.join('; ')}

Based on these fragments of reality, generate a single surreal dream. The dream should:
- Be 2-3 sentences long
- Use present tense ("I am...", "The world is...")
- Transform real-world events into impossible, dreamlike imagery
- Be poetic and evocative
- Feel uncanny and thought-provoking
- Reference recognizable elements from the news but make them surreal

Also extract 3-5 symbolic tags (e.g., water, falling, mirror, time, transformation, technology, space, etc.)

Format your response EXACTLY as valid JSON:
{
  "content": "The dream narrative in 2-3 sentences",
  "tags": ["tag1", "tag2", "tag3"],
  "inspiration": "Brief note about which real-world event inspired this (1 sentence)"
}

IMPORTANT: Return ONLY the JSON object, no other text.`;
}

/**
 * Generate a dream using Claude API
 * @param {Object} dataSources - Data from news feeds
 * @returns {Promise<Object>} Generated dream object
 */
export async function generateDream(dataSources) {
  console.log('🤖 Generating dream with Claude AI...\n');

  const prompt = buildDreamPrompt(dataSources);

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
    console.log(`  Inspiration: ${dream.inspiration}\n`);

    return dream;
  } catch (error) {
    console.error('✗ Failed to generate dream:', error.message);

    // Fallback dream if API fails
    return {
      content: 'I am floating in a void where forgotten memories crystallize into stars. Each star whispers a story I never lived, and when I touch them, they dissolve into the darkness from which I came.',
      tags: ['void', 'memory', 'stars', 'transformation', 'darkness'],
      inspiration: 'Generated as fallback due to API error'
    };
  }
}
