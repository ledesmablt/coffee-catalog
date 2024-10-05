'use client'

import Image from 'next/image'
import React, { useState } from 'react'

interface Project {
  imageUrl: string
  title: string
  description: string
  moreInfoUrl?: string
}

export const projects: Project[] = [
  {
    title: 'quickscope',
    imageUrl: '/images/quickscope-demo.gif',
    description:
      'a chrome & firefox extension for your new tab. build & search custom lists quickly.',
    moreInfoUrl: 'https://github.com/ledesmablt/quickscope',
  },
  {
    title: 'spotify-cli',
    imageUrl: '/images/spotify-cli-demo.gif',
    description:
      'control Spotify playback on any device through the command line.',
    moreInfoUrl: 'https://github.com/ledesmablt/spotify-cli',
  },
  {
    title: 'vim-run',
    imageUrl: '/images/vim-run-demo.gif',
    description:
      'run, view, and manage UNIX shell commands with ease from your favorite code editor.',
    moreInfoUrl: 'https://github.com/ledesmablt/vim-run',
  },
]

export const Projects = () => {
  const [projectIndex, setProjectIndex] = useState(0)

  const project = projects[projectIndex]
  return (
    <>
      <div>
        <div className='relative bg-zinc-200 h-[280px] md:h-[380px]'>
          <Image
            src={project.imageUrl}
            alt={`Project preview: ${project.title}`}
            className='object-contain fi'
            unoptimized
            fill
          />
        </div>
        <p className='mt-4'>
          <b>{project.title}</b>: {project.description}{' '}
          {project.moreInfoUrl && (
            <a href={project.moreInfoUrl} target={'_blank'} rel={'noreferrer'}>
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
          marginTop: 30,
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
    </>
  )
}
