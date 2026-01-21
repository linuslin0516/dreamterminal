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

  return `Create a dreamcore/weirdcore aesthetic photograph based on this surreal narrative:
"${dreamContent}"

Style requirements:
- Liminal spaces aesthetic: empty corridors, abandoned places, transitional spaces
- Nostalgic and uncanny: familiar yet unsettling, childhood memories gone wrong
- Visual quality: VHS grain, soft focus, faded pastel colors, dim fluorescent lighting
- Weirdcore elements: surreal juxtapositions, impossible architecture, eerie calm
- Mood: unsettling nostalgia, familiar yet wrong, dreamlike unease

Key themes to visualize: ${tagContext}

CRITICAL REQUIREMENTS:
- NO text, NO words, NO letters, NO signs, NO writing anywhere in the image
- Pure visual imagery only - use objects, spaces, lighting, and atmosphere to convey meaning
- Must directly relate to the narrative elements described above`;
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
