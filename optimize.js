import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');
const files = fs.readdirSync(assetsDir);

async function optimizeImages() {
  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i)) {
      const filePath = path.join(assetsDir, file);
      const parsedPath = path.parse(filePath);
      const webpPath = path.join(assetsDir, `${parsedPath.name}.webp`);
      
      console.log(`Optimizing ${file}...`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        console.log(`Created ${parsedPath.name}.webp`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

optimizeImages();
