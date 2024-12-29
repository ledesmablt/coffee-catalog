import { Product } from '@/app/_types/schema'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[] | null | undefined
  isLoading: boolean
  searchQuery?: string
}

export const ProductGrid = ({ products, isLoading, searchQuery }: Props) => {
  if (isLoading) {
    return <p className='mt-4 text-zinc-700'>preparing your ☕️...</p>
  }

  if (!products) {
    return null
  }

  if (!products.length) {
    return (
      <div className='text-zinc-700 text-center'>
        <p>no results matching "{searchQuery || 'your filters'}"</p>
        <p>try using other keywords or adjusting the filters.</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4'>
      {products.map((product) => {
        return <ProductCard key={`product-${product.id}`} product={product} />
      })}
    </div>
  )
}
