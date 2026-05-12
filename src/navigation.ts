import { getPermalink } from './utils/permalinks';
import {
  APP_LOGIN,
  APP_SIGNUP,
  CLASSIC_LOGIN,
  IOS_STORE,
  ANDROID_STORE,
  SUPPORT,
  API_DOCS,
  STATUS,
  GITHUB,
  PATREON,
} from './links';

export const headerData = {
  actions: [
    { text: 'Helium Classic', href: CLASSIC_LOGIN, target: '_blank', class: 'hidden md:inline-flex' },
    { text: 'Sign in', href: APP_LOGIN, target: '_blank' },
    { text: 'Sign up', href: APP_SIGNUP, target: '_blank', variant: 'primary', icon: 'tabler:user-plus', class: 'hidden md:inline-flex' },
  ],
};

export const footerData = {
  links: [
    {
      title: 'App',
      links: [
        { text: 'Sign up', href: APP_SIGNUP },
        { text: 'Sign in', href: APP_LOGIN },
        { text: 'iOS', href: IOS_STORE },
        { text: 'Android', href: ANDROID_STORE },
        { text: 'Helium Classic', href: CLASSIC_LOGIN },
      ],
    },
    {
      title: 'Project',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Support', href: SUPPORT },
        { text: 'Docs', href: API_DOCS },
        { text: 'Status', href: STATUS },
        { text: 'GitHub', href: GITHUB },
        { text: 'Patreon', href: PATREON },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms', href: getPermalink('/terms') },
        { text: 'Privacy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'App Store', icon: 'tabler:brand-apple', href: IOS_STORE },
    { ariaLabel: 'Google Play', icon: 'tabler:brand-google-play', href: ANDROID_STORE },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: GITHUB },
    { ariaLabel: 'Patreon', icon: 'tabler:brand-patreon', href: PATREON },
  ],
  footNote: `&copy; ${new Date().getFullYear()} Helium Edu`,
};
