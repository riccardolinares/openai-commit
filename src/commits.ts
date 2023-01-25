export function parseCommit(commit: string) {
  return commit.trim().replace(/#twito/g, "");
}
