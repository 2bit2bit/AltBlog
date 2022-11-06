const readingTime = require("../../utils/reading_time");

describe("Calculating reading time", () => {

  test("Calculate reading time", () => {
    const body = "this is the body";
    expect(readingTime.calcReadingTime(body)).toBe("less than 1 min");
  });

  test("should throw an error if called with an empty body", () => {
    const body = "";
    expect(() => {readingTime.calcReadingTime(body)}).toThrow('body cannot be empty')
  });
});
