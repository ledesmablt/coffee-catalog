import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='mt-8 text-zinc-600'>
      <Link target='_blank' rel='noreferrer' href='https://github.com/ledesmablt/coffee-catalog'>
        view on GitHub
      </Link>
    </footer>
  )
}
