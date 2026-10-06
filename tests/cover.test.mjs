import assert from "node:assert/strict";
import test from "node:test";
import { coverUrl } from "../src/lib/cover.mjs";

test("covers keep source directories, literal percent and deployment mount without invented placeholders", () => {
  assert.equal(coverUrl(undefined, "/MyBlogDoc/"), undefined);
  assert.equal(
    coverUrl("/content-assets/photo.svg", "/MyBlogDoc/"),
    "/MyBlogDoc/content-assets/photo.svg",
  );
  assert.equal(
    coverUrl("/MyBlogDoc/_astro/photo.hash.png", "/MyBlogDoc/"),
    "/MyBlogDoc/_astro/photo.hash.png",
  );
  assert.equal(
    coverUrl("./cover%25.png", "/MyBlogDoc/", "Vue/文章"),
    "/MyBlogDoc/Vue/cover%25.png",
  );
  assert.equal(
    coverUrl("./cover 60%.svg", "/MyBlogDoc/", "Vue/文章"),
    "/MyBlogDoc/Vue/cover%2060%25.svg",
  );
  assert.equal(
    coverUrl("../cover.png", "/MyBlogDoc/", "Vue/深入/文章"),
    "/MyBlogDoc/Vue/cover.png",
  );
  assert.equal(
    coverUrl("https://example.com/image?q=1&size=2"),
    "https://example.com/image?q=1&size=2",
  );
});

test("cover URL rejects executable, credentialed and escaped paths", () => {
  for (const value of [
    "javascript:alert(1)",
    "data:image/svg+xml,test",
    "file:///etc/passwd",
    "https://user:password@example.com/a.png",
    "../../elsewhere.png",
    "#fragment",
  ]) {
    assert.equal(coverUrl(value, "/MyBlogDoc/"), undefined, value);
  }
});
