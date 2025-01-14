'use server'

import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { extractColor, rgbToHex } from '@/lib/colorUtils/colorUtils';


export async function getColorsFromWebsite(url: string) {
  try {
    // Fetch the website content
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML
    const root = parse(html);

    // Extract button colors
    const buttonColors = root.querySelectorAll('button, .button, [class*="btn"]')
      .map(button => {
        const style = button.getAttribute('style');
        const bgColor = extractColor(style ?? null, 'background-color') || extractColor(button.getAttribute('class') || null, 'bg-');
        const textColor = extractColor(style ?? null, 'color');
        return { bgColor, textColor };
      })
      .filter(colors => colors.bgColor || colors.textColor);

    // Extract background colors from CSS
    const bgColors = root.querySelectorAll('*')
      .map(el => extractColor(el.getAttribute('style') ?? null, 'background-color'))
      .filter(Boolean);

    // Extract image URLs
    const imageUrls = root.querySelectorAll('img')
      .map(img => img.getAttribute('src'))
      .filter(Boolean)
      .map(src => src && new URL(src, url).href);
    // Get colors from images
    const imageColors = await Promise.all(
      imageUrls.slice(0, 5).map(async imageUrl => {
        try {
            console.log(imageUrl);
          if (imageUrl) {
              const response = await fetch(imageUrl);
              const arrayBuffer = await response.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const { dominant } = await sharp(buffer).stats();
              return rgbToHex(dominant.r, dominant.g, dominant.b);
          }
        } catch (error) {
          console.error(`Failed to get color from image: ${imageUrl}`, error);
          return null;
        }
      })
    );

    // Combine and count all colors
    const allColors = [
      ...buttonColors.map(c => c.bgColor),
      ...buttonColors.map(c => c.textColor),
      ...bgColors,
      ...imageColors.filter(Boolean)
    ].filter(Boolean) as string[];

    const colorCounts = allColors.reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Sort colors by frequency
    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);

    // Prioritize button colors
    const primaryColor = buttonColors[0]?.bgColor || sortedColors[0] || '#000000';
    const secondaryColor = buttonColors[0]?.textColor || sortedColors[1] || '#ffffff';

    return { primaryColor, secondaryColor };
  } catch (error) {
    console.error('Failed to extract colors from website:', error);
    return null;
  }
}
