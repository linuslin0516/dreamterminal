#!/usr/bin/env node
// Regenerate image for a specific dream

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables BEFORE importing image-generator
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { generateDreamImage } from './image-generator.js';

// Get dream ID from command line argument
const dreamId = process.argv[2];

if (!dreamId) {
  console.error('Usage: node regenerate-image.js DRM-XXXX');
  process.exit(1);
}

async function regenerateImage() {
  console.log(`🎨 Regenerating image for ${dreamId}...\n`);

  // Read dreams data
  const dreamsFilePath = path.join(__dirname, '..', 'dreams-data.js');
  const fileContent = fs.readFileSync(dreamsFilePath, 'utf-8');
  const match = fileContent.match(/const dreamsData = (\[[\s\S]*\]);/);

  if (!match) {
    throw new Error('Could not parse dreams-data.js');
  }

  const dreamsData = eval(`(${match[1]})`);
  const dream = dreamsData.find(d => d.id === dreamId);

  if (!dream) {
    console.error(`Dream ${dreamId} not found!`);
    process.exit(1);
  }

  console.log(`Found dream: ${dream.content.substring(0, 80)}...\n`);

  // Generate new image
  const imageData = await generateDreamImage(dream, dreamId);

  if (imageData) {
    console.log('\n✅ Image regenerated successfully!');
    console.log(`New image saved to: images/dreams/${dreamId}.png`);
    console.log(`\nNext steps:`);
    console.log(`1. Update dreams-data.js with new image metadata`);
    console.log(`2. Commit and push the new image`);
  } else {
    console.error('\n❌ Failed to regenerate image');
    process.exit(1);
  }
}

regenerateImage().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
