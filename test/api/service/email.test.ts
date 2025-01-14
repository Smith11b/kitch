import emailService from "@/app/api/service/emailService";
import { NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("emailService.subscribe", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    fetchMock.resetMocks(); // Reset fetch mocks
  });

  it("returns an error if email is not provided", async () => {
    const mockJson = { error: "Email is required" };
    (NextResponse.json as jest.Mock).mockReturnValueOnce({ json: () => mockJson, status: 400 });

    const response = await emailService.subscribe("");
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Email is required" }, { status: 400 });
    expect(response.status).toBe(400);
  });

  it("handles a successful subscription", async () => {
    const mockSuccessResponse = { id: "123", email_address: "test@example.com", status: "subscribed" };
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 200 });

    const mockJson = { success: true, data: mockSuccessResponse };
    (NextResponse.json as jest.Mock).mockReturnValueOnce({ json: () => mockJson, status: 200 });

    const response = await emailService.subscribe("test@example.com");
    expect(fetch).toHaveBeenCalledWith(process.env.EMAIL_OCT_API_URL_CREATE, expect.any(Object));
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: mockSuccessResponse }, { status: 200 });
    expect(response.status).toBe(200);
  });

  it("handles a failed subscription", async () => {
    const mockErrorResponse = { error: "Subscription failed" };
    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 400 });

    const mockJson = { error: "Subscription failed" };
    (NextResponse.json as jest.Mock).mockReturnValueOnce({ json: () => mockJson, status: 400 });

    const response = await emailService.subscribe("test@example.com");
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Subscription failed" }, { status: 400 });
    expect(response.status).toBe(400);
  });

  it("handles an internal server error", async () => {
    fetchMock.mockRejectOnce(new Error("Internal Server Error"));

    const mockJson = { error: "Internal Server Error" };
    (NextResponse.json as jest.Mock).mockReturnValueOnce({ json: () => mockJson, status: 500 });

    const response = await emailService.subscribe("test@example.com");
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" }, { status: 500 });
    expect(response.status).toBe(500);
  });
});
