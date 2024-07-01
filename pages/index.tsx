import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  socialLinks,
  projects,
  comfortableWith,
  triedOut,
  uses,
  resumeUrl
} from '../src/content'
import { getSpotifyTopTracks, SpotifyTrack } from '../utils/spotify'

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
            <Link className='underline' href='/'>
              home
            </Link>
            <Link
              className='underline'
              href='/blog'
              target='_blank'
              rel='noreferrer'
            >
              blog
            </Link>
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
