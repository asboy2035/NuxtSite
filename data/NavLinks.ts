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
    text: 'pages.work',
    icon: 'solar:folder-open-line-duotone',
  },
  {
    link: '/extras',
    text: 'pages.extras',
    icon: 'solar:menu-dots-line-duotone',
  },
]

export function useCurrentNavLink() {
  const route = useRoute()

  return computed(() => NavLinks.find((link) => link.link === route.path))
}
