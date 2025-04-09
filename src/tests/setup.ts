import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// 在每次测试后自动清理
afterEach(() => {
  cleanup();
});
