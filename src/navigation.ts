import { getPermalink } from './utils/permalinks';
import {
  APP_SIGNIN,
  APP_SIGNUP,
  IOS_STORE,
  ANDROID_STORE,
  API_DOCS,
  STATUS,
  GITHUB,
  PATREON,
} from './links';

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/about') },
    { text: 'Support', href: getPermalink('/support') },
  ],
  actions: [
    { text: 'Sign in', href: APP_SIGNIN, target: '_blank', class: 'hidden md:inline-flex' },
    { text: 'Sign up', href: APP_SIGNUP, target: '_blank', variant: 'primary', icon: 'tabler:user-plus', class: 'hidden md:inline-flex' },
  ],
  mobileExtras: [
    {
      title: 'Account',
      links: [
        { text: 'Sign in', href: APP_SIGNIN, target: '_blank' },
        { text: 'Sign up', href: APP_SIGNUP, target: '_blank' },
      ],
    },
    {
      title: 'More',
      links: [
        { text: 'Press', href: getPermalink('/press') },
        { text: 'Service Status', href: STATUS, target: '_blank' },
        { text: 'GitHub', href: GITHUB, target: '_blank' },
        { text: 'Patreon', href: PATREON, target: '_blank' },
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
};

export const footerData = {
  links: [
    {
      title: 'App',
      links: [
        { text: 'Sign up', href: APP_SIGNUP, target: '_blank' },
        { text: 'Sign in', href: APP_SIGNIN, target: '_blank' },
        { text: 'iOS', href: IOS_STORE, target: '_blank' },
        { text: 'Android', href: ANDROID_STORE, target: '_blank' },
      ],
    },
    {
      title: 'Project',
      links: [
        { text: 'Support', href: getPermalink('/support') },
        { text: 'Press', href: getPermalink('/press') },
        { text: 'API', href: API_DOCS, target: '_blank' },
        { text: 'Service Status', href: STATUS, target: '_blank' },
        { text: 'GitHub', href: GITHUB, target: '_blank' },
        { text: 'Patreon', href: PATREON, target: '_blank' },
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
