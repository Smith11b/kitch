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
