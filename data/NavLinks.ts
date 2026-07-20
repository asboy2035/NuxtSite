import type { NavLink } from ':/navLink'

export const HomeNavLink: NavLink = {
  link: '/home',
  text: 'pages.home',
}

export const NavLinks: NavLink[] = [
  {
    link: '/links',
    text: 'pages.links',
    icon: 'solar:link-minimalistic-2-line-duotone',
  },
  {
    link: '/apps',
    text: 'pages.apps',
    icon: 'solar:widget-3-line-duotone',
  },
  {
    link: '/projects',
    text: 'pages.projects',
    icon: 'solar:folder-open-line-duotone',
  },
  {
    link: '/services',
    text: 'pages.services',
    icon: 'solar:cloud-line-duotone',
  },
  {
    link: '/goodies',
    text: 'pages.goodies',
    icon: 'solar:inbox-line-line-duotone',
  },
  {
    link: '/languages',
    text: 'pages.languages',
    icon: 'solar:global-line-duotone',
  },
]

export function useCurrentNavLink() {
  const route = useRoute()

  return computed(() =>
    NavLinks.find(link => link.link === route.path)
  )
}
