import Link from 'next/link'

const LINKS = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/search',
    label: 'smart search',
  },
] as const

export const Nav = () => {
  return (
    <nav className='flex gap-3 mb-8'>
      {LINKS.map((link) => (
        <Link className='text-zinc-600 hover:text-zinc-900 transition-colors' href={link.href} key={link.label}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
