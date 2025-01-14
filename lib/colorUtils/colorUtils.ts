export function lightenColor(hexColor: string, amount: number) {
    // Remove the # if present
    hexColor = hexColor.replace("#", "");

    // Convert hex to RGB
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    // Lighten the color by increasing RGB values
    const newR = Math.min(r + amount, 255);
    const newG = Math.min(g + amount, 255);
    const newB = Math.min(b + amount, 255);

    // Convert back to hex
    const newHex = "#" + Math.round((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);

    return newHex;
  }

  export function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  export function extractColor(style: string | null, property: string): string | null {
      const match = style?.match(new RegExp(`(?:^|;)\\s*${property}:\\s*(#[0-9A-Fa-f]{3,6}|rgba?\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+(?:,\\s*\\d*\\.?\\d+)?\\s*\\))`, 'i'));
      if (match) {
        const colorValue = match[1];
        if (colorValue.startsWith('#')) {
          return colorValue; // Return hex color directly
        } else {
          const rgb = colorValue.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            return rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
          }
        }
      }
      console.log(`Color not found for property: ${property}`);
      return null;
    }
