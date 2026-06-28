import type SocialLink from ':/SocialLink'

export const IntlSocialLinks: SocialLink[] = [
  {
    name: 'ВКонтакте',
    url: 'https://vk.com/a35hie',
    icon: 'ri:vk-fill',
    lang: 'RU',
  },
  {
    name: 'Одноклассники',
    url: 'https://ok.ru/profile/910193223122',
    icon: 'simple-icons:odnoklassniki',
    lang: 'RU',
  },
  {
    name: '微博',
    url: 'https://weibo.com/a35hie',
    icon: 'simple-icons:sinaweibo',
    lang: 'CN',
  },
]

export const SocialMediaLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:ash@a35.dev',
    icon: 'solar:plain-bold',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/a35hie',
    icon: 'mingcute:github-fill',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/a35hie/',
    icon: 'ri:instagram-fill',
  },
  {
    name: 'Ko-Fi',
    url: 'https://ko-fi.com/a35hie',
    icon: 'cib:ko-fi',
  },
  ...IntlSocialLinks,
  {
    name: 'Discord',
    url: 'https://discord.com/users/1118629361675939860',
    icon: 'ic:baseline-discord',
  },
  {
    name: 'Threads',
    url: 'https://www.threads.com/@a35hie',
    icon: 'ri:threads-fill',
  },
  {
    name: 'Snapchat',
    url: 'https://snapchat.com/t/BzWqgpTE',
    icon: 'mingcute:snapchat-fill',
  },
  {
    name: 'Byg',
    url: 'https://byg.gg/u/a35hie',
    icon: 'glyphs:y-bold',
  },
  {
    name: 'BlueSky',
    url: 'https://bsky.app/profile/a35hie.me',
    icon: 'ri:bluesky-fill',
  },
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
