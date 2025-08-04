import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../Contact";

test("should load contact us component", () => {
  render(<Contact />);
  const heading = screen.getByRole("heading", { name: /contact/i }); // Add the text you're expecting
  expect(heading).toBeInTheDocument();
});




test("should load contact us component", () => {
  render(<Contact />);
  const button = screen.getByRole("button"); // Add the text you're expecting
  expect(button).toBeInTheDocument();
});
