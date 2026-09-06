import type { NavLink } from ':/navLink'

export const HomeNavLink: NavLink = {
  link: '/',
  text: 'pages.home',
  icon: 'solar:home-angle-line-duotone',
  tint: '#7358eb',
}

export const LinksNavLink: NavLink = {
  link: '/links',
  text: 'pages.links',
  icon: 'solar:link-minimalistic-2-line-duotone',
  tint: '#af58eb',
}

export const WorkNavLink: NavLink = {
  link: '/work',
  text: 'pages.work',
  icon: 'solar:folder-open-line-duotone',
  tint: '#378be7',
}

export const ExtrasNavLink: NavLink = {
  link: '/extras',
  text: 'pages.extras',
  icon: 'solar:layers-minimalistic-line-duotone',
  tint: '#dfac3b',
}

export const RingNavLink: NavLink = {
  link: '/ring',
  text: 'ring.title',
  icon: 'solar:gamepad-line-duotone',
  tint: '#77d8b0',
}

export const CreatorsNavLink: NavLink = {
  link: '/creator',
  text: 'navbar.launchers.creators',
  icon: 'solar:pen-new-square-line-duotone',
  tint: '#d877af',
}

export const PlaylistsNavLink: NavLink = {
  link: '/playlists',
  text: '',
  icon: 'solar:music-notes-line-duotone',
  tint: '#c95d68',
}

export const NavLinks: NavLink[] = [ LinksNavLink, WorkNavLink, ExtrasNavLink ]
