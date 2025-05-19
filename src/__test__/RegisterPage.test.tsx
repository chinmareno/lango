import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterPage } from "@/components/pages/auth/RegisterPage/RegisterPage";
jest.mock("next-auth/react");

describe("RegisterPage", () => {
  test("renders RegisterPage", () => {
    render(<RegisterPage />);
    // Check input fields
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    // Check eye toogle visibility button for password and confirm password
    expect(
      screen.getByRole("button", { name: "Click to show password" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Click to show confirm password" })
    ).toBeInTheDocument();
    // Check register button
    expect(
      screen.getByRole("button", { name: "Submit to register" })
    ).toBeInTheDocument();
    // Check "Already have an account?" text and Login link button
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Go to login page" })
    ).toBeInTheDocument();
  });

  test("toggles password visibility", async () => {
    render(<RegisterPage />);
    const user = userEvent.setup();
    // Password input initially is type of password
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    // Click eye toggle to make password visible
    const passwordToggleButton = screen.getByRole("button", {
      name: "Click to show password",
    });
    await user.click(passwordToggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(passwordToggleButton).toHaveAttribute(
      "aria-label",
      "Click to hide password"
    );
    // Click again to make password visible
    await user.click(passwordToggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordToggleButton).toHaveAttribute(
      "aria-label",
      "Click to show password"
    );
  });

  test("toggles confirm password visibility", async () => {
    render(<RegisterPage />);
    const user = userEvent.setup();
    // Confirm password input initially is type password
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    // Click eye toggle to make confirm password visible
    const confirmPasswordToggleButton = screen.getByRole("button", {
      name: "Click to show confirm password",
    });
    await user.click(confirmPasswordToggleButton);
    expect(confirmPasswordInput).toHaveAttribute("type", "text");
    expect(confirmPasswordToggleButton).toHaveAttribute(
      "aria-label",
      "Click to hide confirm password"
    );
    // Click again to make confirm password back invisible
    await user.click(confirmPasswordToggleButton);
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordToggleButton).toHaveAttribute(
      "aria-label",
      "Click to show confirm password"
    );
  });
});
