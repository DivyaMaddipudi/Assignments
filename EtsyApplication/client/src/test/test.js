import Dashboard from "../components/Dashboard.js";
import Cart from "../components/Cart.js";
import { render, screen, fireEvent } from "@testing-library/react";
import React, { useNavigate } from "react";
import "@testing-library/jest-dom";

// import { UserContext } from "../Helper/Context";

test("Checks for shop name", () => {
  render(<Dashboard />);
  const shopName = screen.getByText(/Home/i);
  expect(shopName).toBeInTheDocument();
});

test("Checks for Cart ", () => {
  render(<Cart />);
  const shopName = screen.getByText(/Shopping/i);
  expect(shopName).toBeInTheDocument();
});
