import { render, screen } from "@testing-library/react";
import { LandingPage } from "./LandingPage";

describe("LandingPage", () => {
  test("renders all texts correctly", () => {
    render(<LandingPage />);

    // Check header text
    expect(screen.getByText(/Welcome to Lango/i)).toBeInTheDocument();

    // Check paragraph text
    expect(
      screen.getByText(
        /A freelance platform that help bridging translators with their clients./i
      )
    ).toBeInTheDocument();

    // Check buttons text
    expect(
      screen.getByRole("link", { name: /Get Started/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();
  });
});
