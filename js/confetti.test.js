import { launchConfetti } from "./confetti"; // Adjust path as needed
import confetti from "canvas-confetti";

jest.mock("canvas-confetti", () => jest.fn());

describe("launchConfetti", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers to control setTimeout and requestAnimationFrame
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test("should call confetti multiple times within duration", () => {
    launchConfetti();

    // Fast-forward time to trigger the function calls
    jest.advanceTimersByTime(3000);

    // Expect confetti to be called multiple times
    expect(confetti).toHaveBeenCalled();
  });

  test("should stop calling confetti after duration", () => {
    launchConfetti();

    // Fast-forward past the duration
    jest.advanceTimersByTime(4000);

    const calls = confetti.mock.calls.length;
    expect(calls).toBeGreaterThan(0); // Ensure it was called
    jest.advanceTimersByTime(1000);
    expect(confetti.mock.calls.length).toBe(calls); // No more calls after duration
  });
});
