import Link from 'next/link'

export const Nav = () => {
  return (
    <nav className='flex gap-2 mb-8'>
      <Link href='/coffee_catalog'>home</Link>
      <Link href='/coffee_catalog/browse'>browse</Link>
    </nav>
  )
}
