export const createGitHubLink = (path = '') => {
  const repo = `${process.env.VERCEL_GIT_REPO_OWNER ?? 'ensdomains'}/${
    process.env.VERCEL_GIT_REPO_SLUG ?? 'thorin'
  }`
  const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'main'
  return `https://github.com/${repo}/tree/${branch}${path?.replace(
    '/vercel/path0',
    '',
  )}`
}
