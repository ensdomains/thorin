export const createGitHubLink = (path = '') => {
  const branch = process.env.CF_PAGES_BRANCH ?? 'main'
  return `https://github.com/ensdomains/thorin/tree/${branch}${path?.replace(
    '/opt/buildhome/repo',
    '',
  )}`
}
