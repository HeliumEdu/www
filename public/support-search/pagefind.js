import * as pagefind from '/pagefind/pagefind.js';

export * from '/pagefind/pagefind.js';

const MIN_KEYWORD_LENGTH = 3;
const STOPWORDS = new Set([
  'about', 'after', 'again', 'all', 'also', 'and', 'any', 'are', 'because', 'been', 'before', 'being', 'but',
  'can', 'cannot', 'cant', 'could', 'did', 'didnt', 'does', 'doesnt', 'dont', 'even', 'for', 'from', 'get',
  'gets', 'getting', 'got', 'had', 'has', 'have', 'hello', 'here', 'how', 'into', 'isnt', 'its', 'just', 'keep',
  'keeps', 'like', 'more', 'not', 'now', 'off', 'only', 'our', 'out', 'please', 'should', 'some', 'still',
  'than', 'thank', 'thanks', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'too', 'very', 'was', 'wasnt', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'why', 'will', 'with',
  'without', 'wont', 'would', 'you', 'your',
  'bug', 'bugs', 'report', 'issue', 'issues', 'problem', 'problems', 'help', 'question', 'questions', 'helium',
]);

function extractKeywords(term) {
  const words = term
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .split(/[^a-z0-9]+/);
  return [...new Set(words.filter((word) => word.length >= MIN_KEYWORD_LENGTH && !STOPWORDS.has(word)))];
}

/**
 * Searches each keyword separately and keeps pages matching at least half of them, ranked by how many keywords
 * they match, then by combined score. Plain Pagefind search requires every word to match, which returns nothing
 * for question-style queries like "reminders not arriving on my phone".
 */
async function searchByKeywords(plainSearch, term, options) {
  const keywords = typeof term === 'string' ? extractKeywords(term) : [];
  if (keywords.length < 2) return plainSearch(keywords[0] ?? term, options);

  const searches = await Promise.all(keywords.map((keyword) => plainSearch(keyword, options)));
  const ranked = new Map();
  for (const search of searches) {
    for (const result of search?.results ?? []) {
      const entry = ranked.get(result.id) ?? { result, matched: 0, score: 0 };
      entry.matched += 1;
      entry.score += result.score;
      ranked.set(result.id, entry);
    }
  }
  const minMatched = Math.ceil(keywords.length / 2);
  const results = [...ranked.values()]
    .filter((entry) => entry.matched >= minMatched)
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .map((entry) => entry.result);
  return { ...searches[0], results, unfilteredResultCount: results.length };
}

export function createInstance(options) {
  const instance = pagefind.createInstance(options);
  const plainSearch = instance.search.bind(instance);
  instance.search = (term, searchOptions) => searchByKeywords(plainSearch, term, searchOptions);
  return instance;
}
