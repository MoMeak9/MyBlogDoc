import assert from "node:assert/strict";
import test from "node:test";
import {
  prepareSearchQuery,
  createSearchVocabulary,
  queryHasMatches,
} from "../src/lib/search-query.ts";

test("Chinese query segmentation is independent of the interface language", () => {
  const longQuery = prepareSearchQuery("浏览器事件循环");
  assert.equal(longQuery.replaceAll(" ", ""), "浏览器事件循环");
  assert.ok(longQuery.endsWith("事件 循环"));
  assert.equal(prepareSearchQuery("React状态管理"), "React 状态 管理");
  assert.equal(
    prepareSearchQuery('"事件循环" useEffect'),
    '" 事件 循环 " useEffect',
  );
});

test("index vocabulary resolves Chinese dictionary differences and rejects inverse prefix matches", () => {
  const vocabulary = createSearchVocabulary([
    "编辑",
    "器",
    "加载",
    "赘肉",
    "事件",
    "循环",
    "q",
    "zzz",
    "react",
    "1",
    "5mb",
  ]);
  assert.equal(prepareSearchQuery("编辑器加载", vocabulary), "编辑 器 加载");
  assert.equal(prepareSearchQuery("赘肉", vocabulary), "赘肉");
  assert.equal(prepareSearchQuery('"事件循环"', vocabulary), '" 事件 循环 "');
  assert.equal(
    queryHasMatches(prepareSearchQuery("编辑器加载", vocabulary), vocabulary),
    true,
  );
  assert.equal(queryHasMatches("qzxkwvuqprunknown", vocabulary), false);
  assert.equal(queryHasMatches("zzzqkvnomatchesx", vocabulary), false);
  assert.equal(queryHasMatches("rea", vocabulary), true);
  assert.equal(prepareSearchQuery("1.5MB", vocabulary), "1 5MB");
});

test("Latin symbols, quoted phrases and normalized full-width input keep their meaning", () => {
  assert.equal(
    prepareSearchQuery("  Array.prototype.map  "),
    "Array.prototype.map",
  );
  assert.equal(
    prepareSearchQuery('"rich text" OR useEffect'),
    '" rich text " OR useEffect',
  );
  assert.equal(prepareSearchQuery("CJS/ESM"), "CJS / ESM");
  assert.equal(prepareSearchQuery("react-query"), "react - query");
  assert.equal(prepareSearchQuery("Ｒｅａｃｔ　状态管理"), "React 状态 管理");
  assert.equal(prepareSearchQuery(""), "");
});
