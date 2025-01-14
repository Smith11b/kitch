import landerService from "@/app/service/landerService/landerService";

global.fetch = jest.fn(); // Mock the global fetch API

describe('landerService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  describe('saveEmailAddress', () => {
    it('should successfully save the email address', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ success: true }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await landerService.saveEmailAddress('test@example.com');

      expect(global.fetch).toHaveBeenCalledWith('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      expect(result).toEqual({ success: true });
    });

    it('should return null if the server responds with an error', async () => {
      const mockResponse = {
        ok: false,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await landerService.saveEmailAddress('test@example.com');

      expect(global.fetch).toHaveBeenCalledWith('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      expect(result).toBeNull(); // The method should return null on failure
    });

    it('should return null if an exception is thrown during the request', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await landerService.saveEmailAddress('test@example.com');

      expect(global.fetch).toHaveBeenCalledWith('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      expect(result).toBeNull(); // The method should return null if an error occurs
    });
  });

  describe('validateEmail', () => {
    it('should return true for a valid email address', () => {
      const result = landerService.validateEmail('test@example.com');
      expect(result).toBe(true);
    });

    it('should return false for an invalid email address', () => {
      const invalidEmails = [
        '',
        'plainaddress',
        '@missingusername.com',
        'username@.com',
        'username@com',
        'username@site.',
        'username@site.c',
        'username@.site.com',
      ];

      invalidEmails.forEach((email) => {
        const result = landerService.validateEmail(email);
        expect(result).toBe(false);
      });
    });
  });
});
