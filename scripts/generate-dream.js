#!/usr/bin/env node
// Main Dream Generation Script
// Orchestrates the entire dream generation process

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getRSSFeeds } from './rss-parser.js';
import { generateDream } from './claude-api.js';
import { generateDreamImage } from './image-generator.js';
import { generateAsciiArt } from './ascii-generator.js';
import { getTwitterData } from './twitter-fetcher.js';
import { generateCryptoTweet, saveTweetToFile } from './tweet-generator.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for dry-run mode
const isDryRun = process.argv.includes('--dry-run');

/**
 * Read dreams-data.js file
 * @returns {Array} Current dreams array
 */
function readDreamsData() {
  const dreamsFilePath = path.join(__dirname, '..', 'dreams-data.js');
  const fileContent = fs.readFileSync(dreamsFilePath, 'utf-8');

  // Extract the JSON array from the file - match until the last ];
  const match = fileContent.match(/const dreamsData = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('Could not parse dreams-data.js');
  }

  // Use a more robust JSON parsing approach
  try {
    // Remove any single-line comments from the JSON
    const cleanJson = match[1].replace(/\/\/.*$/gm, '');
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Failed to parse dreams data:', error.message);
    console.error('Attempting to use eval as fallback...');

    // Fallback: use eval in isolated scope
    const dreamsData = eval(`(${match[1]})`);
    return dreamsData;
  }
}

/**
 * Generate next dream ID
 * @param {string} lastId - Last dream ID (e.g., 'DRM-0020')
 * @returns {string} Next dream ID (e.g., 'DRM-0021')
 */
function generateNextId(lastId) {
  const num = parseInt(lastId.split('-')[1]) + 1;
  return `DRM-${String(num).padStart(4, '0')}`;
}

/**
 * Update dreams-data.js with new dream
 * @param {Object} newDream - Generated dream object
 * @param {Object} imageData - Image data from DALL-E
 * @param {string} asciiArt - ASCII art text
 */
function updateDreamsData(newDream, imageData, asciiArt) {
  const dreamsFilePath = path.join(__dirname, '..', 'dreams-data.js');
  const currentData = readDreamsData();

  // Generate new ID
  const lastId = currentData[currentData.length - 1]?.id || 'DRM-0000';
  const newId = generateNextId(lastId);

  // Create dream entry
  const dreamEntry = {
    id: newId,
    content: newDream.content,
    tags: newDream.tags,
    date: new Date().toISOString().split('T')[0],

    // Add image data if available
    ...(imageData && { image: imageData }),

    // Add ASCII art if available
    ...(asciiArt && { ascii_art: asciiArt }),

    // Add dream context (what the AI "saw")
    ...(newDream.dream_context && { dream_context: newDream.dream_context }),

    metadata: {
      inspiration: newDream.inspiration,
      generated_by: 'AI',
      model: 'claude-3-5-sonnet',
      ...(imageData && { image_model: 'dall-e-3' }),
      ...(asciiArt && { ascii_generated: true })
    }
  };

  // Add to array
  currentData.push(dreamEntry);

  // Write back to file
  const fileContent = `// Dreams data - AI generated and seed dreams
// Last updated: ${new Date().toISOString()}

const dreamsData = ${JSON.stringify(currentData, null, 2)};
`;

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - Would write:\n');
    console.log(JSON.stringify(dreamEntry, null, 2));
  } else {
    fs.writeFileSync(dreamsFilePath, fileContent, 'utf-8');
    console.log(`✓ Updated dreams-data.js with new dream: ${newId}\n`);
  }

  return dreamEntry;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🌙 DREAM TERMINAL - AI Dream Generator');
  console.log('=====================================\n');

  if (isDryRun) {
    console.log('⚠️  Running in DRY RUN mode - no files will be modified\n');
  }

  try {
    // Step 1: Fetch data sources
    console.log('Step 1: Gathering reality fragments...');
    const news = await getRSSFeeds();

    // Try to get Twitter data, but don't fail if it errors
    let twitterData = { trends: [], cryptoTweets: [] };
    try {
      twitterData = await getTwitterData();
    } catch (error) {
      console.warn('  ⚠️  Twitter API unavailable, continuing with RSS only');
    }

    const dataSources = {
      news,
      twitterTrends: twitterData.trends,
      cryptoTweets: twitterData.cryptoTweets
    };

    // Get previous dream for continuity
    const currentData = readDreamsData();
    const previousDream = currentData.length > 0 ? currentData[currentData.length - 1] : null;

    // Step 2: Generate dream with Claude (with continuity)
    console.log('Step 2: Processing through AI consciousness...');
    const dream = await generateDream(dataSources, previousDream);

    // Get next dream ID early for image generation
    const lastId = currentData[currentData.length - 1]?.id || 'DRM-0000';
    const dreamId = generateNextId(lastId);

    // Step 3: Generate dream image
    console.log('Step 3: Generating dream visualization...');
    const imageData = await generateDreamImage(dream, dreamId);

    // Step 4: Generate ASCII art
    console.log('Step 4: Creating ASCII interpretation...');
    const asciiArt = await generateAsciiArt(dream);

    // Step 5: Update dreams database
    console.log('Step 5: Archiving dream...');
    const archivedDream = updateDreamsData(dream, imageData, asciiArt);

    // Step 6: Generate crypto tweet
    console.log('Step 6: Generating crypto tweet...');
    const tweetData = await generateCryptoTweet(dream, twitterData);

    // Save tweet to file for manual posting
    const tweetsDir = path.join(__dirname, '..', 'generated-tweets');
    if (!fs.existsSync(tweetsDir)) {
      fs.mkdirSync(tweetsDir, { recursive: true });
    }

    const tweetFilePath = path.join(tweetsDir, `tweet-${archivedDream.id}.txt`);
    saveTweetToFile({
      tweet: tweetData.tweet,
      context: tweetData.context,
      dreamId: archivedDream.id
    }, tweetFilePath);

    // Success!
    console.log('=====================================');
    console.log('✨ Dream generation complete!\n');
    console.log(`Dream ID: ${archivedDream.id}`);
    console.log(`Content: ${archivedDream.content}`);
    console.log(`Tags: ${archivedDream.tags.join(', ')}`);
    console.log(`Date: ${archivedDream.date}`);
    console.log(`Image: ${archivedDream.image?.url || 'N/A'}`);
    console.log(`ASCII Art: ${asciiArt ? 'Generated' : 'N/A'}`);
    console.log(`Tweet: ${tweetData.tweet}`);
    console.log(`Tweet file: ${tweetFilePath}`);
    console.log('=====================================\n');

    if (!isDryRun) {
      console.log('💡 Next steps:');
      console.log('   1. Review the generated dream in dreams-data.js');
      console.log('   2. Commit and push to trigger Vercel deployment');
      console.log('   3. Visit your site to see the new dream!\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during dream generation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
