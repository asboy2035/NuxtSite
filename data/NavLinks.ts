import type { NavLink } from ':/navLink'

export const HomeNavLink: NavLink = {
  link: '/',
  text: 'pages.home',
}

export const NavLinks: NavLink[] = [
  {
    link: '/links',
    text: 'pages.links',
    icon: 'solar:link-minimalistic-2-line-duotone',
  },
  {
    link: '/work',
    text: 'pages.apps',
    icon: 'solar:folder-open-line-duotone',
  },
  {
    link: '/more',
    text: 'pages.goodies',
    icon: 'solar:menu-dots-line-duotone',
  },
]

export function useCurrentNavLink() {
  const route = useRoute()

  return computed(() => NavLinks.find((link) => link.link === route.path))
}
