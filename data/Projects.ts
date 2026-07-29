import type { Project } from ':/project'
import { Elysia, TypeScript, Vue } from '$/TechStack'

export const BygPlatformProj: Project = {
  name: 'Byg Platform',
  description:
    'The beautiful, unhinged social media. Write posts, chat with friends, and more.',
  link: 'https://byg.gg/',
  preview: 'https://i.ibb.co/HLPpxC3m/Byg-2-15-3.png',
  technologies: [ Elysia, Vue, TypeScript ],
}

export const OpkProj: Project = {
  name: 'Opk',
  description: 'The universal JS/TS package manager.',
  link: 'https://opk.a35.dev/',
  preview: 'https://i.ibb.co/qMxcgvvy/Opk-Screenshot.jpg',
  technologies: [ TypeScript, Vue ],
}

export const Projects: Project[] = [ BygPlatformProj, OpkProj ]
