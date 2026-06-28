export interface ServiceState {
  id: string
  name: string
  description: string
}

export const Beta: ServiceState = {
  id: 'beta',
  name: 'β',
  description: 'In development, fine to use.',
}

export const Alpha: ServiceState = {
  id: 'alpha',
  name: 'α',
  description: 'In development, not recommended for use.',
}

export const Release: ServiceState = {
  id: 'omega',
  name: 'Ω',
  description: 'Public release.',
}

export interface Service {
  name: string
  description: string
  state: ServiceState
  url: string
  vcsUrl?: string
  iconUrl: string
}
