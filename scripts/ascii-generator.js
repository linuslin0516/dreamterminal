// ASCII Art Generator
// Generates abstract ASCII art using Claude AI

import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Build ASCII art generation prompt
 * @param {Object} dream - Dream object
 * @returns {string} Claude prompt
 */
function buildAsciiPrompt(dream) {
  return `You are an ASCII artist. Based on this surreal dream, create a simple, abstract ASCII art representation (5-10 lines max).

Dream content: "${dream.content}"

Tags: ${dream.tags.join(', ')}

Create ASCII art that:
- Is 5-10 lines tall
- Uses box-drawing characters (═ ║ ╔ ╗ ╚ ╝ ─ │ ┌ ┐ └ ┘)
- Uses symbols like: ⚡ ☆ ∿ ░ ▒ ▓ █ ◆ ● ○ ◇ ✦ ✧
- Captures the dream's essence abstractly
- Fits within 60 characters width
- Is visually balanced and aesthetic

Return ONLY the ASCII art, no explanations or markdown code blocks.`;
}

/**
 * Generate ASCII art using Claude
 * @param {Object} dream - Dream object
 * @returns {Promise<string>} ASCII art text
 */
export async function generateAsciiArt(dream) {
  console.log('🖼️  Generating ASCII art...');

  const prompt = buildAsciiPrompt(dream);

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

    let asciiArt = response.content[0].text.trim();

    // Clean up possible markdown code blocks
    asciiArt = asciiArt.replace(/^```[\s\S]*?\n/, '').replace(/\n```$/, '');

    console.log('  ✓ ASCII art generated:\n');
    console.log(asciiArt);
    console.log('');

    return asciiArt;
  } catch (error) {
    console.error('  ✗ Failed to generate ASCII art:', error.message);

    // Return simple fallback ASCII
    return generateFallbackAscii(dream.tags[0] || 'dream');
  }
}

/**
 * Generate simple fallback ASCII art
 * @param {string} keyword - Keyword
 * @returns {string} ASCII art
 */
function generateFallbackAscii(keyword) {
  return `
╔═══════════════════════════════╗
║     ✧･ﾟ: *✧･ﾟ:* DREAM *:･ﾟ✧*:･ﾟ✧     ║
║          [ ${keyword.toUpperCase()} ]          ║
╚═══════════════════════════════╝
`;
}
