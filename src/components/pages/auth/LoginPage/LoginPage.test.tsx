import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "./LoginPage";
jest.mock("next-auth/react");

describe("LoginPage", () => {
  test("renders LoginPage", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit to login" })
    ).toBeInTheDocument();
    // Check "Don't have an account?" text and Register link button
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Go to register page" })
    ).toBeInTheDocument();
  });

  test("toggles password visibility", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    const passwordToggleButton = screen.getByRole("button", {
      name: "Click to show password",
    });

    await user.click(passwordToggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(passwordToggleButton).toHaveAttribute(
      "aria-label",
      "Click to hide password"
    );

    await user.click(passwordToggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordToggleButton).toHaveAttribute(
      "aria-label",
      "Click to show password"
    );
  });

  //   test("submits valid login data and calls signIn", async () => {
  //     const user = userEvent.setup();
  //     (loginAction as jest.mo).mockResolvedValue({
  //       success: true,
  //       email: "test@example.com",
  //     });

  //     render(<LoginPage />);
  //     await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
  //     await user.type(screen.getByPlaceholderText("Password"), "password123");
  //     await user.click(screen.getByRole("button", { name: /login/i }));

  //     await waitFor(() => {
  //       expect(loginAction).toHaveBeenCalledWith({
  //         email: "test@example.com",
  //         password: "password123",
  //       });
  //       expect(signIn).toHaveBeenCalledWith("credentials", {
  //         email: "test@example.com",
  //       });
  //     });
  //   });

  //   test("shows error toast if login fails", async () => {
  //     const user = userEvent.setup();
  //     (loginAction as jest.Mock).mockResolvedValue({
  //       success: false,
  //       message: "Invalid credentials",
  //     });

  //     render(<LoginPage />);
  //     await user.type(screen.getByPlaceholderText("Email"), "wrong@email.com");
  //     await user.type(screen.getByPlaceholderText("Password"), "wrongpass");
  //     await user.click(screen.getByRole("button", { name: /login/i }));

  //     await waitFor(() => {
  //       expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  //     });
  //   });
});
