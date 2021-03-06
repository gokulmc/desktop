import { replaceHost } from '../helpers/nameHelper'

class Application {
  types: number[] = []
  title: string = 'URL'
  icon: string = 'arrow-right'
  launchUrl: string = 'http://[host]:[port]'
  copyUrl: string = '[host]:[port]'
  prompt: boolean = false
  iconRotate: boolean = false

  constructor(options: { [key in keyof Application]?: any }) {
    Object.assign(this, options)
  }

  launch(connection: IConnection) {
    return this.parse(connection.launchUrl || this.launchUrl, connection)
  }

  copy(connection: IConnection) {
    return this.parse(this.copyUrl, connection)
  }

  parse(url: string, connection: IConnection) {
    for (const key in connection) url = url.replace(`[${key}]`, encodeURI(connection[key]))
    url = replaceHost(url)
    return url
  }

  missingTokens(url: string, connection: IConnection) {
    const result = this.parse(url, connection)
    const matches: string[] = result.match(/\[[^\]]*\]/g) || []
    return matches.map(m => m.slice(1, -1))
  }
}

const applications: Application[] = [
  new Application({
    types: [4],
    title: 'VNC',
    icon: 'desktop',
    launchUrl: 'vnc://[host]:[port]',
  }),
  new Application({
    types: [28],
    title: 'SSH',
    icon: 'terminal',
    prompt: true,
    launchUrl: 'ssh://[username]@[host]:[port]',
    copyUrl: 'ssh -l [username] [host] -p [port] -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile /dev/null"',
  }),
  new Application({
    types: [8, 10, 33],
    title: 'Secure Browser',
    icon: 'arrow-right',
    iconRotate: true,
    launchUrl: 'https://[host]:[port]',
  }),
  new Application({
    types: [7, 30, 38],
    title: 'Browser',
    icon: 'arrow-right',
    iconRotate: true,
    launchUrl: 'http://[host]:[port]',
  }),
]

const defaultApp = new Application({
  types: [],
  title: 'URL',
  icon: 'arrow-right',
  iconRotate: true,
  launchUrl: 'https://[host]:[port]',
})

export function useApplication(type?: number) {
  let app = applications.find(a => a.types.includes(type || 0))
  return app || defaultApp
}
