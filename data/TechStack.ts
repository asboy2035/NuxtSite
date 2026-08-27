import type { Technology } from ':/technology'

// Languages / Frameworks
export const Vue: Technology = {
  name: 'Vue / Nuxt',
  icon: 'logos:nuxt-icon',
  link: 'https://nuxt.com/',
}

export const TypeScript: Technology = {
  name: 'TypeScript',
  icon: 'logos:typescript-icon',
  link: 'https://www.typescriptlang.org/',
}

export const Swift: Technology = {
  name: 'Swift',
  icon: 'logos:swift',
  link: 'https://www.swift.org/',
}

export const Cpp: Technology = {
  name: 'C++',
  icon: 'logos:c-plusplus',
  link: 'https://cplusplus.com/',
}

export const Python: Technology = {
  name: 'Python',
  icon: 'logos:python',
  link: 'https://www.python.org/',
}

export const SQL: Technology = {
  name: '(PG) SQL',
  icon: 'logos:postgresql',
  link: 'https://www.sqlite.org/index.html',
}

export const Go: Technology = {
  name: 'Go',
  icon: 'logos:go',
  isLearning: true,
}

export const Rust: Technology = {
  name: 'Rust',
  icon: 'fluent-mdl2:rust-language-logo',
  isLearning: true,
}

// Other technologies
export const Elysia: Technology = {
  name: 'Elysia',
  icon: 'skill-icons:elysia-light',
  link: 'https://elysiajs.com/',
  isLearning: true,
}

export const Langs: Technology[] = [
  Vue,
  TypeScript,
  Swift,
  Cpp,
  Python,
  SQL,
  Go,
  Rust,
]
