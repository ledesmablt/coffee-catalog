'use client'

import Link from 'next/link'

export const Nav = () => {
  return (
    <section className='w-full flex gap-2 mb-2'>
      <Link className='underline' href='/'>
        home
      </Link>
      <Link className='underline' href='/blog' target='_blank' rel='noreferrer'>
        blog
      </Link>
      <a className='underline' href='mailto:benj.ledesma@gmail.com' target='_blank' rel='noreferrer'>
        contact
      </a>
    </section>
  )
}
