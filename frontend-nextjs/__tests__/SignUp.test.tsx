import SignUp from "@/app/(auth)/signup/page";
import { useAuth } from "@/hooks/useAuth";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/hooks/useAuth");

describe("SignUp Page", () => {
  it("renders form and handles input", () => {
    (useAuth as jest.Mock).mockReturnValue({
      signUp: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
    });

    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "newpassword123" } });


    expect(emailInput).toHaveValue("newuser@example.com");
    expect(passwordInput).toHaveValue("newpassword123");
    expect(submitButton).toBeEnabled();
  });
});
