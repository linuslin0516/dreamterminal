// Image Generator - DALL-E Integration
// Generates dreamscape images using OpenAI DALL-E API

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Build DALL-E prompt from dream content
 * @param {Object} dream - { content: string, tags: string[] }
 * @returns {string} DALL-E prompt
 */
function buildImagePrompt(dream) {
  // Use the full dream content for more relevant imagery
  const dreamContent = dream.content
    .replace(/I am |I was |There was a moment when /gi, '')
    .substring(0, 300); // Increased length for more context

  const tagContext = dream.tags.slice(0, 3).join(', ');

  return `DO NOT include any text, words, letters, captions, subtitles, or written characters anywhere in this image. This is a photograph only.

Create a dreamcore/weirdcore aesthetic photograph capturing the mood of: ${tagContext}

Style requirements:
- Liminal spaces: empty corridors, abandoned places, waiting rooms, transitional spaces
- Nostalgic and uncanny: familiar yet unsettling, childhood memories distorted
- Visual quality: VHS grain, soft focus, faded pastel colors (pink, blue, yellow), dim fluorescent lighting
- Weirdcore: surreal juxtapositions, impossible architecture, eerie calm, dreamlike atmosphere
- Mood: unsettling nostalgia, the familiar gone wrong, liminal unease
- Empty environments: no people, no crowds, solitary spaces

Visual metaphor for: "${dreamContent.substring(0, 150)}"

ABSOLUTE REQUIREMENTS - NO EXCEPTIONS:
- ZERO TEXT: No letters, words, typography, captions, subtitles, or any written language
- ZERO SIGNS: No exit signs, street signs, room numbers, labels, or directional text
- ZERO SCREENS WITH TEXT: Monitors show only colors/patterns/static
- Pure photography: Only physical spaces, objects, lighting, and atmosphere
- NO overlays, NO captions, NO text elements of any kind

This must be a pure photograph without any textual elements whatsoever.`;
}

/**
 * Generate dream image using DALL-E
 * @param {Object} dream - Dream object
 * @param {string} dreamId - Dream ID (e.g., "DRM-0001")
 * @returns {Promise<Object>} Image info { url, localPath, prompt }
 */
export async function generateDreamImage(dream, dreamId) {
  console.log(`🎨 Generating image for ${dreamId}...`);

  const prompt = buildImagePrompt(dream);
  console.log(`  Prompt: ${prompt.substring(0, 100)}...`);

  try {
    // Call DALL-E API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    const imageUrl = response.data[0].url;
    console.log(`  ✓ Image generated: ${imageUrl}`);

    // Download image to local
    const localPath = await downloadImage(imageUrl, dreamId);
    console.log(`  ✓ Image saved: ${localPath}\n`);

    return {
      url: `/images/dreams/${dreamId}.png`,
      prompt: prompt,
      generated_at: new Date().toISOString(),
      dalle_url: imageUrl // Temporary URL, expires in 24h
    };
  } catch (error) {
    console.error(`  ✗ Failed to generate image:`, error.message);

    // Return null, don't block the flow
    return null;
  }
}

/**
 * Download DALL-E image to local filesystem
 * @param {string} imageUrl - DALL-E image URL
 * @param {string} dreamId - Dream ID
 * @returns {Promise<string>} Local file path
 */
async function downloadImage(imageUrl, dreamId) {
  return new Promise((resolve, reject) => {
    // Ensure directory exists
    const imagesDir = path.join(__dirname, '..', 'images', 'dreams');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const filePath = path.join(imagesDir, `${dreamId}.png`);
    const file = fs.createWriteStream(filePath);

    https.get(imageUrl, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete incomplete file
      reject(err);
    });
  });
}
