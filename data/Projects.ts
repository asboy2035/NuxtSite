import type { Project } from ':/project'
import { Elysia, TypeScript, Vue } from '$/TechStack'

export const BygPlatformProj: Project = {
  name: 'Byg Platform',
  description:
    'The beautiful, unhinged social media. Write posts, chat with friends, and more.',
  link: 'https://byg.gg/',
  preview: 'https://i.ibb.co/CKthPN6G/Byg-2-15-3.png',
  technologies: [ Elysia, Vue, TypeScript ],
}

export const ComProj: Project = {
  name: 'a35hie.com',
  description:
    'About the a35hie company/brand, as well as all projects associated.',
  link: 'https://a35hie.com',
  preview: 'https://i.ibb.co/nsgSLBqG/a35hie-com-en-projects.jpg',
  technologies: [ TypeScript, Vue ],
}

export const OpkProj: Project = {
  name: 'Opk',
  description: 'The universal JS/TS package manager.',
  link: 'https://opk.a35.dev/',
  preview: 'https://i.ibb.co/qMxcgvvy/Opk-Screenshot.jpg',
  technologies: [ TypeScript, Vue ],
}

export const Projects: Project[] = [ BygPlatformProj, ComProj ]
