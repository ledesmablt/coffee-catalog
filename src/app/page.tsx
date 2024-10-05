import Link from 'next/link'
import {
  socialLinks,
  comfortableWith,
  triedOut,
  uses,
  resumeUrl
} from './content'
import { Projects } from './projects'
import { getSpotifyTopTracks } from './utils/spotify'

const Divider = () => <div className='w-20 border-t-zinc-400 border-t my-4' />

// revalidate every 12 hrs (12 * 60 * 60)
export const revalidate = 43200

const HomePage = async () => {
  const topTracks = await getSpotifyTopTracks()
  return (
    <>
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
            <Projects />
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

export default HomePage
