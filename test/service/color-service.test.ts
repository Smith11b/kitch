
import fetch from 'node-fetch';
import * as colorService from '@/app/service/colorService/colors';
import { extractColor, rgbToHex } from '@/lib/colorUtils/colorUtils';


jest.mock('node-fetch', () => jest.fn());
const mockedFetch = fetch as jest.Mock;

// Mock sharp's functionality
jest.mock('sharp', () => () => ({
  stats: jest.fn().mockResolvedValue({ dominant: { r: 255, g: 255, b: 255 } }),
}));

describe('rgbToHex', () => {
  it('should convert RGB values to hex correctly', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
  });
});

describe('extractColor', () => {
  it('should extract hex colors from style attribute', () => {
    const style = 'background-color: #ff0000; color: #00ff00;';
    expect(extractColor(style, 'background-color')).toBe('#ff0000');
    expect(extractColor(style, 'color')).toBe('#00ff00');
  });

  it('should extract RGB colors from style and convert to hex', () => {
    const style = 'background-color: rgb(0, 255, 0);';
    expect(extractColor(style, 'background-color')).toBe('#00ff00');
  });

  it('should return null if the color is not found', () => {
    const style = 'border-color: #0000ff;';
    expect(extractColor(style, 'background-color')).toBeNull();
  });
});

describe('getColorsFromWebsite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return primary and secondary colors from a simple page', async () => {
    const mockHtml = `
      <html>
        <body>
          <button style="background-color: #ff0000; color: #00ff00;">Click me</button>
          <div style="background-color: rgb(0, 0, 255);"></div>
          <img src="/image1.jpg" />
        </body>
      </html>
    `;

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml,
    });

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      arrayBuffer: async () => Buffer.from([0]),
    });

    const result = await colorService.getColorsFromWebsite('https://example.com');
    expect(result).toEqual({
      primaryColor: '#ff0000', // Button background color
      secondaryColor: '#00ff00', // Button text color
    });

    expect(mockedFetch).toHaveBeenCalledTimes(2); // Once for the HTML, once for the image
  });

  it('should handle missing style attributes gracefully', async () => {
    const mockHtml = `
      <html>
        <body>
          <button class="btn">Click me</button>
          <div>No styles here</div>
        </body>
      </html>
    `;

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml,
    });

    const result = await colorService.getColorsFromWebsite('https://example.com');
    expect(result).toEqual({
      primaryColor: '#000000', // Default color if no primary color is found
      secondaryColor: '#ffffff',
    });
  });

  it('should skip failed image fetches', async () => {
    const mockHtml = `
      <html>
        <body>
          <img src="/invalid.jpg" />
        </body>
      </html>
    `;

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml,
    });

    mockedFetch.mockRejectedValueOnce(new Error('Failed to fetch image'));

    const result = await colorService.getColorsFromWebsite('https://example.com');
    expect(result).toEqual({
      primaryColor: '#000000', // No color data from images
      secondaryColor: '#ffffff',
    });
  });

  it("should throw an error if the image URL can't be resolved", async () => {
    const mockHtml = `
      <html>
        <body>
        </body>
      </html>
    `;

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml,
    });

    const result = await colorService.getColorsFromWebsite('https://example.com');
    expect(result).toEqual({
      primaryColor: '#000000', // No color data from images
      secondaryColor: '#ffffff',
    });
  });


  it('should return null if the URL fetch fails', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await colorService.getColorsFromWebsite('https://example.com');
    expect(result).toBeNull();
  });

  it('should return null if the HTML response is not OK', async () => {
    mockedFetch.mockResolvedValueOnce({ ok: false });

    const result = await colorService.getColorsFromWebsite('https://example.com');
    expect(result).toBeNull();
  });

  it('should return default colors when no styles or classes are present', async () => {
    const mockHtml = `
      <html>
        <body>
          <button>Click me</button> <!-- No bg- class or inline style -->
        </body>
      </html>
    `;

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml,
    });

    const result = await colorService.getColorsFromWebsite('https://example.com');

    expect(result).toEqual({
      primaryColor: '#000000', // Default fallback for primary color
      secondaryColor: '#ffffff', // Default fallback for secondary color
    });
  });


});
