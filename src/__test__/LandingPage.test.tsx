import { render, screen } from "@testing-library/react";
import { LandingPage } from "@/components/pages/LandingPage";

describe("LandingPage", () => {
  test("renders all texts correctly", () => {
    render(<LandingPage />);

    // Check header text
    expect(screen.getByText("Welcome to Lango")).toBeInTheDocument();

    // Check paragraph text
    expect(
      screen.getByText(
        "A freelance platform that help bridging translators with their clients."
      )
    ).toBeInTheDocument();

    // Check buttons text
    expect(
      screen.getByRole("link", { name: "Get Started" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  });
});
