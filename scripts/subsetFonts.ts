import { mkdir, readFile, writeFile } from 'node:fs/promises'

import fg from 'fast-glob'
import subsetFont from 'subset-font'

const LOCALES = 'i18n/locales'

const FONTS = [
  {
    locale: 'zh',
    input: 'fonts/NotoSansSC.ttf',
    output: 'public/fonts/NotoSansSC.woff2',
  },
  {
    locale: 'ja',
    input: 'fonts/NotoSansJP.ttf',
    output: 'public/fonts/NotoSansJP.woff2',
  },
]

function collect(value: unknown, chars: Set<string>) {
  if (typeof value === 'string') {
    for (const ch of value) chars.add(ch)
  } else if (Array.isArray(value)) {
    value.forEach((v) => collect(v, chars))
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => collect(v, chars))
  }
}

async function collectCharacters(locale: string) {
  const files = await fg(`${LOCALES}/**/*-${locale}.{json,json5,yaml,yml}`)

  console.log(locale, files)

  const chars = new Set<string>()

  for (const file of files) {
    const json = JSON.parse(await readFile(file, 'utf8'))
    collect(json, chars)
  }

  return [ ...chars ].join('')
}

await mkdir('public/fonts', { recursive: true })

for (const font of FONTS) {
  const chars = await collectCharacters(font.locale)

  const original = await readFile(font.input)

  const subset = await subsetFont(original, chars, {
    targetFormat: 'woff2',
  })

  await writeFile(font.output, subset)

  console.log(`✓ ${font.locale}: ${chars.length} characters -> ${font.output}`)
}
