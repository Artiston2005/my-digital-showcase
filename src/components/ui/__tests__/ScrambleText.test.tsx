import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ScrambleText } from "../ScrambleText";

describe("ScrambleText Component", () => {
    it("renders the scrambled text eventually resolving to final text", () => {
        vi.useFakeTimers();

        render(<ScrambleText text="Ashwin" delay={0} />);

        // Fast-forward time past the scramble duration (800ms)
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        // We can't easily test intermediate characters since they are random, 
        // but we can test that it settles on the correct text.
        expect(screen.getByText("Ashwin")).toBeDefined();

        vi.useRealTimers();
    });
});
