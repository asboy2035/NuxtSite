export interface App {
  name: string
  description: string
  image: string
  link: string
  disabled?: boolean
  github?: string
}

export interface AppCategory {
  name: string
  apps: App[]
}
