import { Product } from '@/app/_types/schema'
import { ProductCard } from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  products: Product[] | null | undefined
  isLoading: boolean
  searchQuery?: string
}

export const ProductGrid = ({ products, isLoading, searchQuery }: Props) => {
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-full'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton className='rounded-lg border w-full h-96' key={`product-skeleton:${index}`} />
        ))}
      </div>
    )
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
