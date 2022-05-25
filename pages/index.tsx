import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const mq = [0, 640, 900].map((bp) => `@media (min-width: ${bp}px)`)

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
      'a chrome & firefox extension for your new tab. build & search custom lists quickly. typos are forgiven.',
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
  imageUrl: string
  title: string
  widthScale: number
}
const socialLinks: SocialLink[] = [
  {
    url: 'https://github.com/ledesmablt',
    imageUrl: 'github.svg',
    title: 'GitHub profile',
    widthScale: 1
  },
  {
    url: 'https://www.linkedin.com/in/benj-ledesma-581a65107/',
    imageUrl: 'linkedin.svg',
    title: 'LinkedIn profile',
    widthScale: 1.2
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
  width: '80%',
  [mq[1]]: {
    marginLeft: 120,
    marginRight: 120,
    width: 'calc(640px * 0.8)'
  }
})

const Section = styled('div')({
  width: '100%'
})

const Divider = styled('div')({
  width: 80,
  borderTop: '1px solid grey',
  margin: 20
})

const ProjectImgContainer = styled('div')({
  height: '80vw',
  [mq[0]]: {
    maxHeight: 455
  },
  [mq[1]]: {
    height: 'auto'
  }
})

const ProjectImg = styled('img')({
  objectFit: 'contain',
  width: '100%',
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

const Home: NextPage = () => {
  const [projectIndex, setProjectIndex] = useState(0)

  const project = projects[projectIndex]

  return (
    <>
      <Head>
        <title>Benj Ledesma</title>
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
                <p style={{ margin: 0, marginLeft: 1 }}>{"hi, i'm"}</p>
                <h1 style={{ margin: 0, marginTop: 2 }}>Benj Ledesma</h1>
                <p style={{ margin: 0, marginTop: 18 }}>
                  i like building useful stuff.
                </p>

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
                        <img
                          src={s.imageUrl}
                          alt={s.title}
                          style={{
                            objectFit: 'contain',
                            width: 24 * s.widthScale
                          }}
                        />
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
              <img
                style={{
                  borderRadius: '100%',
                  width: 210
                }}
                src='/images/me.jpeg'
                alt='me'
              />
            </div>
          </Section>

          <Divider />

          <Section>
            <SectionHeader>some personal projects</SectionHeader>
            <ProjectImgContainer>
              <ProjectImg
                src={project.imageUrl}
                alt={`Project preview: ${project.title}`}
              />
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
            </ProjectImgContainer>
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
        </Container>
      </Wrapper>
    </>
  )
}

export default Home
