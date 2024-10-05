import React, { ReactElement } from 'react'
import GitHub from './svgs/GitHub'
import LinkedIn from './svgs/LinkedIn'

interface SocialLink {
  url: string
  iconElement: ReactElement
  title: string
}
export const gitHubSocialLink: SocialLink = {
  url: 'https://github.com/ledesmablt',
  iconElement: <GitHub />,
  title: 'GitHub profile',
}
const linkedInSocialLink: SocialLink = {
  url: 'https://www.linkedin.com/in/ledesmablt',
  iconElement: <LinkedIn />,
  title: 'LinkedIn profile',
}
export const socialLinks: SocialLink[] = [gitHubSocialLink, linkedInSocialLink]

export const resumeUrl =
  'https://drive.google.com/file/d/1X_QoyyjmAr1KU2VqbRpnvIfh_fGEMd3F/view?usp=sharing'

export const comfortableWith = [
  'building typescript MERN apps',
  'graphQL client & server',
  'ruby on rails',
  'react component libraries (MUI, Chakra)',
  'building chrome & firefox extensions',
  'python scripts & web scrapers',
  'tailwind CSS',
  'serverless hosting on GCP or AWS',
  'SQL analytics',
]

export const triedOut = [
  'nuxt',
  'svelte(kit)',
  'tailwind',
  'integrating google APIs (drive, sheets)',
  'payment gateways (Stripe, PayMongo, PayMaya)',
  'golang basics',
  'electronJS',
  'figma',
  'other stuff',
]

export const uses: { url?: string; description: string; name: string }[] = [
  {
    name: 'MacBook Air M1, 2020 - 16GB RAM, 512GB SSD',
    description: 'Lightweight, durable, and good enough to get the job done.',
  },
  {
    name: 'Any 27" monitor',
    description:
      "The comfiest size for me. Any bigger and I'll have a lot of unused space, especially with dual monitors or ultrawides. Smaller sizes (even on just the MacBook) can work with smart window management.",
  },
  {
    name: 'NeoVim + tmux',
    url: 'https://github.com/ledesmablt/dotfiles',
    description:
      "Thanks to these guys, I often only need 2 windows to work - my terminal and my browser. I'm only ever looking at one workspace at a time (great for focus), but switching to another project / repo or spinning up a background job can be done with only a few keystrokes.",
  },
  {
    name: 'Notion',
    url: 'https://www.notion.so/',
    description:
      'Everything I need for project management, studying, note-taking, and so on. I love that the interface is mostly a clean black & white, putting full emphasis on the content itself and not the surrounding UI. And of course, the keyboard shortcuts are amazing.',
  },
  {
    name: 'Google Calendar',
    description:
      "Pretty much anything that happens in my life gets calendared - meetings, workouts, chores, hangouts. Tasks always have a due date, whether it's next week or in 6 months. This helps remind me to do things, assess task urgency off the bat, and give quick answers regarding my availability.",
  },
  {
    name: 'Sennheiser MTW3',
    url: 'https://www.sennheiser-hearing.com/en-US/p/momentum-true-wireless-3/',
    description:
      "The noise cancellation isn't as good as Sony's WF-1000XM4, but the sound quality is superb - as if you're wearing over-ear headphones. I may not make music as often anymore, but I sure love listening to it.",
  },
]
