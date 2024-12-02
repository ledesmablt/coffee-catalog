import Link from 'next/link'

const LINKS = [
  {
    href: '/coffee_catalog',
    label: 'home',
  },
  {
    href: '/coffee_catalog/browse',
    label: 'browse',
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
