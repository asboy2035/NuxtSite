import type SocialLink from ':/SocialLink'

export const IntlSocialLinks: SocialLink[] = [
  {
    name: 'ВКонтакте',
    url: 'https://vk.ru/a35hie',
    icon: 'thesvg-color:vk',
    lang: 'RU',
  },
  {
    name: 'Одноклассники',
    url: 'https://ok.ru/profile/910193223122',
    icon: 'thesvg-color:odnoklassniki',
    lang: 'RU',
  },
  {
    name: '微博',
    url: 'https://weibo.com/a35hie',
    icon: 'thesvg-color:sina-weibo',
    lang: 'CN',
  },
]

export const SocialMediaLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:ash@a35.dev',
    icon: 'fluent-color:mail-20',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/a35hie',
    icon: 'skill-icons:github-light',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/1118629361675939860',
    icon: 'logos:discord-icon',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/a35hie/',
    icon: 'skill-icons:instagram',
  },
  {
    name: 'Ko-Fi',
    url: 'https://ko-fi.com/a35hie',
    icon: 'selfhst:ko-fi',
  },
  ...IntlSocialLinks,
]

export const MoreLinks: SocialLink[] = [
  {
    name: 'Warp',
    url: 'https://app.warp.dev/referral/KVWRZZ',
    icon: 'mingcute:terminal-fill',
  },
  {
    name: 'FaH',
    url: 'https://stats.foldingathome.org/donor/id/732018511',
    icon: 'material-symbols:network-node',
  },
  {
    name: 'Last.fm',
    url: 'https://www.last.fm/user/a35hie',
    icon: 'ph:lastfm-logo-bold',
  },
]

export const SocialLinks: SocialLink[] = [ ...SocialMediaLinks, ...MoreLinks ]
