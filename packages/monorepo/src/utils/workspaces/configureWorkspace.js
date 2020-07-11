import { git } from '../cli/Git'

export function configureWorkspace (context) {
  const { origin, repositoryUrl, logger, env: { GH_TOKEN, CI, EMAIL, USER, CI_NAME }, branchName } = context

  if (CI) {
    if (EMAIL && USER) {
      git.config('--global', 'user.email', EMAIL)
      git.config('--global', 'user.name', USER)
    }

    git.checkout(branchName).sync()
    git.branch(`--set-upstream-to=${origin}/${branchName}`, branchName).sync()

    logger.info(`${CI_NAME} CI Installed`)

    if (!GH_TOKEN) {
      logger.error('GH_TOKEN is required')
      process.exit(-1)
    }

    const repository = repositoryUrl.replace('https://', '')
    logger.info(`Configure remote repository ${repository}`)
    git.remote('remove', origin).sync()
    git.remote('add', origin, `https://${GH_TOKEN}@${repository}`).sync()
  } else {
    logger.warn('Not in CI environment')
  }
}
