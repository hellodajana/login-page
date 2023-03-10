import App from "./App";
import { render, screen } from "@testing-library/react";

describe("login app", () => {
  render(<App />);
  const emailInput = screen.getByLabelText("Email", { selector: "input" });
  const passInput = screen.getByLabelText("Password", { selector: "input" });
  const loginBtn = screen.getByRole("button");
  test("The form is initially rendered with empty fields.", () => {
    expect(emailInput).toHaveValue("");
    expect(passInput).toHaveValue("");
  });
  test("The form displays an error message if the email address or password is blank", async () => {
    loginBtn.click();
    await expect(
      screen.findByText("Please type in email and password")
    ).toBeDefined();
  });
  test("The form displays an error message if the login fails", async () => {
    const credentials = { email: "test@gmail.com", password: "testtest" };

    emailInput.value = credentials.email;
    expect(emailInput.value).toBe("test@gmail.com");

    passInput.value = credentials.password;
    expect(passInput.value).toBe("testtest");

    loginBtn.click();

    await expect(screen.findByText("ERROR")).toBeDefined();
  });
});
