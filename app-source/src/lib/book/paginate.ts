export function paginateStory(text: string, charsPerPage = 600): string[] {
  if (!text.trim()) return ["Your chapters will appear here once generated in chat."];
  const pages: string[] = [];
  for (let i = 0; i < text.length; i += charsPerPage) {
    pages.push(text.slice(i, i + charsPerPage));
  }
  return pages;
}
