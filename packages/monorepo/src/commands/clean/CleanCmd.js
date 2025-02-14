import { clean } from '../../utils/common/clean'
import { cleanTagsDocker } from '../../utils/docker/cleanTagsDocker'

export class CleanCmd {
  mapContext (commander) {
    return {
      type: commander.type
    }
  }

  getTasks (context) {
    return [
      {
        title: 'Clean workspace',
        enabled: () => ["workspace"].includes(context.type),
        task: () => context.clean(context.type)
      },
      {
        title: "Clean docker images on DockerHub",
        enabled: () => ['docker'].includes(context.type),
        task: () => context.clean(context.type)
      }
    ]
  }
}
