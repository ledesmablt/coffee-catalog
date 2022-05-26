import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import GitHub from '../components/svgs/GitHub'
import LinkedIn from '../components/svgs/LinkedIn'

const mq = [440, 640, 900].map((bp) => `@media (min-width: ${bp}px)`)

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
const socialLinks: SocialLink[] = [
  {
    url: 'https://github.com/ledesmablt',
    iconElement: <GitHub />,
    title: 'GitHub profile'
  },
  {
    url: 'https://www.linkedin.com/in/benj-ledesma-581a65107/',
    iconElement: <LinkedIn />,
    title: 'LinkedIn profile'
  }
]

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
  'svelte(kit)',
  'tailwind',
  'integrating google APIs (drive, sheets)',
  'payment gateways (PayMongo, PayMaya)',
  'electronJS',
  'golang basics',
  'figma',
  'other stuff'
]

const Wrapper = styled('div')({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
  marginTop: 40,
  marginBottom: 40,
  width: '90%',
  maxWidth: 'calc(640px * 0.9)'
})

const Section = styled('div')({
  width: '100%'
})

const Divider = styled('div')({
  width: 80,
  borderTop: '1px solid grey',
  margin: 20
})

const ProfileImg = styled('img')({
  width: 160,
  height: 160,
  borderRadius: '100%',
  paddingLeft: 4,
  [mq[0]]: {
    width: 180,
    height: 180
  },
  [mq[1]]: {
    width: 210,
    height: 210
  }
})

const ProjectImg = styled('div')({
  position: 'relative',
  background: '#e6e6e6',
  height: 280,
  [mq[1]]: {
    height: 380
  }
})

const List = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  paddingLeft: 20,
  '& > li': {
    marginTop: 4
  },
  '& > li:before': {
    content: '"-"',
    position: 'absolute',
    marginLeft: -20
  }
})

const SectionHeader = styled('h3')({
  marginTop: 0
})

const BoxHideSmall = styled('div')({
  display: 'none',
  [mq[0]]: {
    display: 'inherit'
  }
})

const BoxShowSmall = styled('div')({
  [mq[0]]: {
    display: 'none'
  }
})

const Home: NextPage = () => {
  const [projectIndex, setProjectIndex] = useState(0)

  const project = projects[projectIndex]

  return (
    <>
      <Head>
        <title>Benj Ledesma</title>
        <meta property='og:url' content='https://ledesmablt.com' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Benj Ledesma' />
        <meta property='og:image' content='/images/me.jpeg' />
        <meta
          property='og:description'
          content='i like building useful stuff.'
        />
      </Head>
      <Wrapper>
        <Container>
          <Section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <BoxHideSmall>
                  <p style={{ margin: 0, marginLeft: 1 }}>{"hi, i'm"}</p>
                  <h1 style={{ margin: 0, marginTop: 2, marginBottom: 18 }}>
                    Benj Ledesma
                  </h1>
                </BoxHideSmall>
                <BoxShowSmall>
                  <p
                    style={{
                      margin: 0,
                      marginLeft: 1,
                      marginBottom: 10
                    }}
                  >
                    {"hi, i'm"} <b>Benj Ledesma</b>.
                  </p>
                </BoxShowSmall>
                <p style={{ margin: 0 }}>i like building useful stuff.</p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <div
                    style={{
                      marginTop: 30,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    {socialLinks.map((s) => (
                      <a
                        key={`s-${s.title}`}
                        href={s.url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div
                          style={{
                            objectFit: 'contain',
                            width: 24
                          }}
                        >
                          {s.iconElement}
                        </div>
                      </a>
                    ))}
                  </div>
                  <code
                    style={{
                      fontFamily: 'Hack',
                      fontSize: 12
                    }}
                  >
                    @ledesmablt
                  </code>
                </div>
              </div>
              <ProfileImg src='/images/me.jpeg' alt='me' />
            </div>
          </Section>

          <Divider />

          <Section style={{ justifyContent: 'space-between' }}>
            <SectionHeader>some personal projects</SectionHeader>
            <div>
              <ProjectImg>
                <Image
                  src={project.imageUrl}
                  alt={`Project preview: ${project.title}`}
                  layout={'fill'}
                  objectFit={'contain'}
                />
              </ProjectImg>
              <p>
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
          </Section>

          <Divider />

          <Section>
            <SectionHeader>{"i'm comfortable with"}</SectionHeader>
            <List>
              {comfortableWith.map((s, index) => (
                <li key={`cw-${index}`}>{s}</li>
              ))}
            </List>
          </Section>

          <Section>
            <SectionHeader>{"i've tried out"}</SectionHeader>
            <List>
              {triedOut.map((s, index) => (
                <li key={`to-${index}`}>{s}</li>
              ))}
            </List>
          </Section>

          <Divider />

          <Section style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ margin: 0 }}>
              hit me up:{' '}
              <a
                href='mailto:benj.ledesma@gmail.com'
                target={'_blank'}
                rel={'noreferrer'}
              >
                benj.ledesma@gmail.com
              </a>
            </p>
          </Section>
        </Container>
      </Wrapper>
    </>
  )
}

export default Home
