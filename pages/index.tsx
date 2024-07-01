import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import GitHub from '../components/svgs/GitHub'
import LinkedIn from '../components/svgs/LinkedIn'
import { getSpotifyTopTracks, SpotifyTrack } from '../utils/spotify'

interface Project {
  imageUrl: string
  title: string
  description: string
  moreInfoUrl?: string
}
const projects: Project[] = [
  {
    title: 'quickscope',
    imageUrl: '/images/quickscope-demo.gif',
    description:
      'a chrome & firefox extension for your new tab. build & search custom lists quickly.',
    moreInfoUrl: 'https://github.com/ledesmablt/quickscope'
  },
  {
    title: 'spotify-cli',
    imageUrl: '/images/spotify-cli-demo.gif',
    description:
      'control Spotify playback on any device through the command line.',
    moreInfoUrl: 'https://github.com/ledesmablt/spotify-cli'
  },
  {
    title: 'vim-run',
    imageUrl: '/images/vim-run-demo.gif',
    description:
      'run, view, and manage UNIX shell commands with ease from your favorite code editor.',
    moreInfoUrl: 'https://github.com/ledesmablt/vim-run'
  }
]

interface SocialLink {
  url: string
  iconElement: ReactElement
  title: string
}
const gitHubSocialLink: SocialLink = {
  url: 'https://github.com/ledesmablt',
  iconElement: <GitHub />,
  title: 'GitHub profile'
}
const linkedInSocialLink: SocialLink = {
  url: 'https://www.linkedin.com/in/ledesmablt',
  iconElement: <LinkedIn />,
  title: 'LinkedIn profile'
}
const socialLinks: SocialLink[] = [gitHubSocialLink, linkedInSocialLink]

const resumeUrl =
  'https://drive.google.com/file/d/1X_QoyyjmAr1KU2VqbRpnvIfh_fGEMd3F/view?usp=sharing'

const comfortableWith = [
  'building typescript MERN apps',
  'graphQL client & server',
  'react component libraries (MUI, Chakra)',
  'building chrome & firefox extensions',
  'python scripts & web scrapers',
  'tailwind CSS',
  'serverless hosting on GCP or AWS',
  'SQL analytics'
]

const triedOut = [
  'nuxt',
  'svelte(kit)',
  'tailwind',
  'integrating google APIs (drive, sheets)',
  'payment gateways (Stripe, PayMongo, PayMaya)',
  'ruby on rails',
  'golang basics',
  'electronJS',
  'figma',
  'other stuff'
]

const uses: { url?: string; description: string; name: string }[] = [
  {
    name: 'MacBook Air M1, 2020 - 16GB RAM, 512GB SSD',
    description: 'Lightweight, durable, and good enough to get the job done.'
  },
  {
    name: 'Any 27" monitor',
    description:
      "The comfiest size for me. Any bigger and I'll have a lot of unused space, especially with dual monitors or ultrawides. Smaller sizes (even on just the MacBook) can work with smart window management."
  },
  {
    name: 'NeoVim + tmux',
    url: 'https://github.com/ledesmablt/dotfiles',
    description:
      "Thanks to these guys, I often only need 2 windows to work - my terminal and my browser. I'm only ever looking at one workspace at a time (great for focus), but switching to another project / repo or spinning up a background job can be done with only a few keystrokes."
  },
  {
    name: 'Notion',
    url: 'https://www.notion.so/',
    description:
      'Everything I need for project management, studying, note-taking, and so on. I love that the interface is mostly a clean black & white, putting full emphasis on the content itself and not the surrounding UI. And of course, the keyboard shortcuts are amazing.'
  },
  {
    name: 'Google Calendar',
    description:
      "Pretty much anything that happens in my life gets calendared - meetings, workouts, chores, hangouts. Tasks always have a due date, whether it's next week or in 6 months. This helps remind me to do things, assess task urgency off the bat, and give quick answers regarding my availability."
  },
  {
    name: 'Sennheiser MTW3',
    url: 'https://www.sennheiser-hearing.com/en-US/p/momentum-true-wireless-3/',
    description:
      "The noise cancellation isn't as good as Sony's WF-1000XM4, but the sound quality is superb - as if you're wearing over-ear headphones. I may not make music as often anymore, but I sure love listening to it."
  }
]

const Divider = () => <div className='w-20 border-t-zinc-400 border-t my-4' />

const BASE_URL = 'https://ledesmablt.com'

interface Props {
  topTracks?: SpotifyTrack[]
  lastRefreshed?: string
}

export const getStaticProps = async (): Promise<{
  props: Props
  revalidate: number
}> => {
  const topTracks = await getSpotifyTopTracks()
  const lastRefreshed = new Date().toISOString()
  return {
    props: {
      topTracks,
      lastRefreshed
    },
    revalidate: 12 * 60 * 60
  }
}

const Home: NextPage = ({ topTracks }: Props) => {
  const [projectIndex, setProjectIndex] = useState(0)

  const project = projects[projectIndex]

  return (
    <>
      <Head>
        <title>Benj Ledesma</title>
        <meta property='og:url' content={BASE_URL} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Benj Ledesma' />
        <meta property='og:image' content={`${BASE_URL}/images/me.jpeg`} />
        <meta
          property='og:description'
          content='i like building useful things.'
        />
      </Head>
      <main className='flex flex-col items-center leading-tight'>
        <div className='flex flex-col items-center gap-5 my-10 w-[90%] max-w-[576px]'>
          <section className='w-full flex gap-2 mb-2'>
            <a className='underline' href='/'>
              home
            </a>
            <a
              className='underline'
              href='/blog'
              target='_blank'
              rel='noreferrer'
            >
              blog
            </a>
            <a
              className='underline'
              href='mailto:benj.ledesma@gmail.com'
              target='_blank'
              rel='noreferrer'
            >
              contact
            </a>
          </section>

          <section>
            <div className='flex flex-center justify-between'>
              <div className='leading-none mt-4'>
                <div className='hidden sm:inline'>
                  <p className='ml-[1px]'>{"hi, i'm"}</p>
                  <h1 className='mt-0.5 mb-[18px] text-3xl font-bold'>
                    Benj Ledesma
                  </h1>
                </div>
                <div className='xs:hidden'>
                  <p className='ml-[1px] mb-2.5'>
                    {"hi, i'm"} <b className='font-bold'>Benj Ledesma</b>.
                  </p>
                </div>
                <p>i like building useful things.</p>

                <div className='mt-[30px] flex flex-col gap-[2px]'>
                  <div className='flex items-center gap-2'>
                    {socialLinks.map((s) => (
                      <a
                        key={`s-${s.title}`}
                        href={s.url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div className='object-contain w-6'>
                          {s.iconElement}
                        </div>
                      </a>
                    ))}
                  </div>
                  <code className='font-mono text-xs mt-1'>@ledesmablt</code>
                </div>
              </div>
              <img
                src='/images/me.jpeg'
                alt='me'
                className='w-40 h-40 rounded-full sm:w-[180px] sm:h-[180px] md:w-[210px] md:h-[210px]'
              />
            </div>
          </section>

          <Divider />

          <section>
            <h3>some personal projects</h3>
            <div>
              <div className='relative bg-zinc-200 h-[280px] md:h-[380px]'>
                <Image
                  src={project.imageUrl}
                  alt={`Project preview: ${project.title}`}
                  layout={'fill'}
                  objectFit={'contain'}
                />
              </div>
              <p className='mt-4'>
                <b>{project.title}</b>: {project.description}{' '}
                {project.moreInfoUrl && (
                  <a
                    href={project.moreInfoUrl}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    more info
                  </a>
                )}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 48,
                justifyContent: 'center',
                marginTop: 30
              }}
            >
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (projectIndex <= 0) {
                    setProjectIndex(projects.length - 1)
                  } else {
                    setProjectIndex(projectIndex - 1)
                  }
                }}
              >
                back
              </a>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (projectIndex >= projects.length - 1) {
                    setProjectIndex(0)
                  } else {
                    setProjectIndex(projectIndex + 1)
                  }
                }}
              >
                next
              </a>
            </div>
          </section>

          <Divider />

          <section>
            <h3>about me</h3>
            <ul>
              <li>full-stack software engineer</li>
              <li>
                ex-
                <a href='https://dashlabs.ai' target='_blank' rel='noreferrer'>
                  Dashlabs.ai
                </a>{' '}
                (YC W21) senior engineer
              </li>
              <li>ex-Shopee PH automation lead</li>
              <li>triathlete (WIP)</li>
              <li>former music org president & jazz guitarist</li>
              <li>enjoys tea, math rock, k-pop, studying 日本語</li>
            </ul>
            <p className='mt-4'>
              (more on my{' '}
              <a
                className='underline'
                href={resumeUrl}
                target='_blank'
                rel='noreferrer'
              >
                resume
              </a>
              {' and '}
              <a
                className='underline'
                href={socialLinks[1].url}
                target='_blank'
                rel='noreferrer'
              >
                LinkedIn profile
              </a>
              )
            </p>
          </section>

          <section>
            <h3>{"i'm comfortable with"}</h3>
            <ul>
              {comfortableWith.map((s, index) => (
                <li key={`cw-${index}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>{"i've tried out"}</h3>
            <ul>
              {triedOut.map((s, index) => (
                <li key={`to-${index}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>{'i use'}</h3>
            <ul>
              {uses.map(({ name, url, description }, index) => (
                <li key={`uses-${index}`}>
                  <div>
                    {url ? (
                      <a
                        className='underline'
                        href={url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </div>
                  {description && (
                    <div
                      style={{
                        lineHeight: 1.4,
                        color: '#3d4852',
                        marginTop: 6,
                        marginBottom: 24
                      }}
                    >
                      {description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {topTracks?.length && (
            <section>
              <h3>{"i'm listening to"}</h3>
              <ol className='list-decimal list-outside leading-normal p-0 pl-5'>
                {topTracks.map((track) => {
                  return (
                    <li className='pl-2' key={`spotify-${track.uri}`}>
                      <a
                        className='no-underline hover:underline'
                        href={track.external_urls.spotify}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {track.artists[0].name} - {track.name}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </section>
          )}

          <Divider />

          <section className='flex justify-center'>
            <p>
              hit me up:{' '}
              <a
                className='underline'
                href='mailto:benj.ledesma@gmail.com'
                target='_blank'
                rel='noreferrer'
              >
                benj.ledesma@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

export default Home
