type Locale =
  | 'en'
  | 'fr'
  | 'es'
  | 'ja'
  | 'zh'
  | 'de'
  | 'ru'
  | 'uk'
  | 'pt'
  | 'kk'
  | 'fi'
  | 'pl'

const latinRules: Record<Locale, Array<[RegExp, string]>> = {
  en: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
    [ /ove/gi, 'owe' ],
    [ /th/gi, 'f' ],
  ],

  fr: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
    [ /ou/gi, 'ouw' ],
  ],

  es: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
    [ /rr/g, 'ww' ],
    [ /RR/g, 'WW' ],
  ],

  de: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
  ],

  pt: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
    [ /lh/gi, 'wh' ],
  ],

  fi: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
  ],

  pl: [
    [ /r/g, 'w' ],
    [ /R/g, 'W' ],
    [ /l/g, 'w' ],
    [ /L/g, 'W' ],
    [ /rz/gi, 'wz' ],
  ],

  // Cyrillic languages
  ru: [
    [ /р/g, 'в' ],
    [ /Р/g, 'В' ],
    [ /л/g, 'в' ],
    [ /Л/g, 'В' ],
  ],

  uk: [
    [ /р/g, 'в' ],
    [ /Р/g, 'В' ],
    [ /л/g, 'в' ],
    [ /Л/g, 'В' ],
  ],

  kk: [
    [ /р/g, 'у' ],
    [ /Р/g, 'У' ],
  ],

  // These use their own script rules below.
  ja: [],
  zh: [],
}

const japaneseRules: Array<[RegExp, string]> = [
  [ /ら/g, 'わ' ],
  [ /り/g, 'うぃ' ],
  [ /る/g, 'う' ],
  [ /れ/g, 'うぇ' ],
  [ /ろ/g, 'を' ],
  [ /ラ/g, 'ワ' ],
  [ /リ/g, 'ウィ' ],
  [ /ル/g, 'ウ' ],
  [ /レ/g, 'ウェ' ],
  [ /ロ/g, 'ヲ' ],
]

const chineseRules: Array<[RegExp, string]> = [
  // Keep this deliberately conservative.
  // Chinese doesn't have an equivalent of English r/l replacement.
  [ /了/g, '惹' ],
]

function preserveCase(original: string, replacement: string) {
  if (original === original.toUpperCase()) {
    return replacement.toUpperCase()
  }

  if (
    original[0] === original[0]!.toUpperCase() &&
    original[0] !== original[0].toLowerCase()
  ) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1)
  }

  return replacement
}

const suffixes = {
  en: [ ' :3', ' nya~', ' uwu' ],
  fr: [ ' :3', ' nya~', ' uwu' ],
  es: [ ' :3', ' nya~', ' uwu' ],
  ja: [ ' にゃ〜', ' :3', ' uwu' ],
  zh: [ ' 喵~', ' :3', ' uwu' ],
  de: [ ' :3', ' nya~', ' uwu' ],
  ru: [ ' :3', ' ня~', ' uwu' ],
  uk: [ ' :3', ' ня~', ' uwu' ],
  pt: [ ' :3', ' nya~', ' uwu' ],
  kk: [ ' :3', ' ня~', ' uwu' ],
  fi: [ ' :3', ' nya~', ' uwu' ],
  pl: [ ' :3', ' nya~', ' uwu' ],
} satisfies Record<Locale, string[]>

function hashString(value: string) {
  let hash = 0

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

export function uwuify(input: string, locale: Locale): string {
  if (!input) return input

  let result = input

  if (locale === 'ja') {
    for (const [ pattern, replacement ] of japaneseRules) {
      result = result.replace(pattern, replacement)
    }
  } else if (locale === 'zh') {
    for (const [ pattern, replacement ] of chineseRules) {
      result = result.replace(pattern, replacement)
    }
  } else {
    for (const [ pattern, replacement ] of latinRules[locale]) {
      result = result.replace(pattern, (match) =>
        preserveCase(match, replacement)
      )
    }
  }

  const available = suffixes[locale]
  const suffix = available[hashString(input) % available.length]

  return `${result}${suffix}`
}
