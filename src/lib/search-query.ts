let chineseSegmenter: Intl.Segmenter | undefined;

export type SearchVocabulary = {
  words: readonly string[];
  exact: ReadonlySet<string>;
  maxChineseLength: number;
};

export function createSearchVocabulary(words: string[]): SearchVocabulary {
  const sorted = [...new Set(words)].sort();
  return {
    words: sorted,
    exact: new Set(sorted),
    maxChineseLength: sorted.reduce(
      (max, word) =>
        /^\p{Script=Han}+$/u.test(word) ? Math.max(max, [...word].length) : max,
      1,
    ),
  };
}

function splitChinese(run: string, vocabulary: SearchVocabulary) {
  const letters = [...run];
  const costs = Array<number>(letters.length + 1).fill(Infinity);
  const next = Array<number>(letters.length);
  costs[letters.length] = 0;
  for (let start = letters.length - 1; start >= 0; start--) {
    costs[start] = 100 + costs[start + 1];
    next[start] = start + 1;
    for (
      let size = Math.min(vocabulary.maxChineseLength, letters.length - start);
      size > 0;
      size--
    ) {
      const word = letters.slice(start, start + size).join("");
      if (
        vocabulary.exact.has(word) &&
        1 + costs[start + size] < costs[start]
      ) {
        costs[start] = 1 + costs[start + size];
        next[start] = start + size;
      }
    }
  }
  const words: string[] = [];
  for (let start = 0; start < letters.length; start = next[start])
    words.push(letters.slice(start, next[start]).join(""));
  return words.join(" ");
}

const normalizeWord = (word: string) =>
  word
    .normalize("NFKC")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\p{Pc}]/gu, "");

function hasPrefix(word: string, vocabulary: SearchVocabulary) {
  let low = 0,
    high = vocabulary.words.length;
  while (low < high) {
    const middle = (low + high) >>> 1;
    if (vocabulary.words[middle] < word) low = middle + 1;
    else high = middle;
  }
  return vocabulary.words[low]?.startsWith(word) ?? false;
}

/** Pagefind's reverse-prefix fallback must not turn an unknown word into a short unrelated match. */
export function queryHasMatches(query: string, vocabulary: SearchVocabulary) {
  const words = query.split(/\s+/).map(normalizeWord).filter(Boolean);
  return words.length > 0 && words.every((word) => hasPrefix(word, vocabulary));
}

/** Both interface languages search the same Chinese corpus with the same tokens. */
export function prepareSearchQuery(
  value: string,
  vocabulary?: SearchVocabulary,
) {
  const query = value.normalize("NFKC").trim();
  if (typeof Intl.Segmenter !== "function") return query;
  chineseSegmenter ??= new Intl.Segmenter("zh", { granularity: "word" });
  if (vocabulary) {
    return query
      .split(/(\p{Script=Han}+)/u)
      .flatMap((part) => {
        if (/^\p{Script=Han}+$/u.test(part))
          return [splitChinese(part, vocabulary)];
        return [...chineseSegmenter!.segment(part)].map(({ segment }) => {
          const word = normalizeWord(segment);
          if (word && !hasPrefix(word, vocabulary) && /[./+-]/.test(segment))
            return segment.split(/[./+-]+/).join(" ");
          return segment;
        });
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return [...chineseSegmenter.segment(query)]
    .map((part) => part.segment)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
