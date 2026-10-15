import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import  FavoritesPage  from "./favorites";
import { FavoritesProvider } from './FavoritesProvider'

test("shows a message when there are no favorites", () => {
  render(
  <FavoritesProvider><FavoritesPage /></FavoritesProvider>
  );
  expect(screen.getByText("No favorites yet")).toBeInTheDocument();
});