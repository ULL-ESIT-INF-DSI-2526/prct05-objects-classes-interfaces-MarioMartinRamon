import { describe, expect, test } from "vitest";
import { add } from "../src/ejercicio-1";

describe("add function tests", () => {
  test("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).toBe(9);
  });
});