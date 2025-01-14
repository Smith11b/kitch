import { lightenColor } from "@/lib/colorUtils/colorUtils";


describe("lightenColor", () => {
  it("should lighten the color by the given amount", () => {
    const color = "#000000";
    const amount = 50;
    const newColor = lightenColor(color, amount);
    expect(newColor).toBe("#323232");
  });
});
