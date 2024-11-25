/**
 * convert string into slug
 * @param {*} text
 * @returns
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-/, "")
    .replace(/-$/, "");
}

/**
 * converting my favorite date format (yymmdd) into js-date
 * @param {*} num
 * @returns
 */
export function numberToDate(num) {
  const str = num.toString();
  const year = parseInt(str.substring(0, 2)) + 2000;
  const month = parseInt(str.substring(2, 4)) - 1;
  const day = parseInt(str.substring(4, 6));
  return new Date(year, month, day);
}

/**
 * output js-date for website, back to number_date (yymmdd)
 * @param {*} date
 * @returns
 */
export function dateToNumber(date) {
  const d = new Date(date);
  const year = d.getFullYear().toString().slice(-2);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * format .md to blogposts
 * @param {*} posts
 * @param {*} options
 * @returns
 */
export function formatBlogPosts(
  posts,
  {
    filter_draft = true,
    filter_future_post = true,
    sort_by_date = true,
    limit = undefined,
  } = {},
) {
  const filtered_posts = posts.reduce((acc, post) => {
    const { pubDate, draft } = post.data;
    if (filter_draft && draft) return acc;
    if (filter_future_post && new Date(pubDate) > new Date()) return acc;
    acc.push(post);
    return acc;
  }, []);

  if (sort_by_date) {
    filtered_posts.sort(
      (a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate),
    );
  } else {
    filtered_posts.sort(() => Math.random() - 0.5);
  }

  if (typeof limit === "number") return filtered_posts.slice(0, limit);

  return filtered_posts;
}

/**
 * zero padding for numbers
 * @param {*} number
 * @param {*} padding
 * @returns
 */
export function addZeroPadding(number, padding) {
  return number.toString().padStart(padding, "0");
  // console.log(addZeroPadding(5, 3)); // "005"
  // console.log(addZeroPadding(123, 5)); // "00123"
  // console.log(addZeroPadding(1234, 2)); // "1234"
}

/**
 * copy to clipboard
 */
export async function copyToClipboard(string) {
  try {
    await navigator.clipboard.writeText(string);
    // console.log("copied to clipboard:", string);
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
  }
}
