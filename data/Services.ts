import { Alpha, Beta, type Service } from ':/service'

export const Services: Service[] = [
  {
    name: 'Byg',
    description: 'The beautiful, unhinged social media platform.',
    state: Beta,
    url: 'https://byg.gg',
    vcsUrl: 'https://github.com/BygNet',
    iconUrl: 'https://byg.gg/favicon.ico',
  },
  {
    name: 'Slays',
    description: 'Fiendishly easy link collections.',
    state: Alpha,
    url: 'https://slays.today',
    iconUrl: 'https://slays.today/favicon.ico',
  },
]
