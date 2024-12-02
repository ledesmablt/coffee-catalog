import { ExternalLink } from 'lucide-react'
import type { Product } from '../_types/schema'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from './ImageWithFallback'

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  // TODO: placeholder image for broken or missing images
  return (
    <Card className='w-full max-w-sm overflow-hidden flex flex-col'>
      <CardHeader className='p-0'>
        <ImageWithFallback
          src={product.image_url}
          alt={product.title}
          className='w-full h-full aspect-square object-contain'
        />
      </CardHeader>
      <CardContent className='p-4 flex-grow'>
        <CardTitle className='text-lg font-semibold mb-1'>{product.title}</CardTitle>
        <h3 className='font-light text-sm text-zinc-800'>by {product.brand}</h3>
        <div className='flex flex-col gap-6 mt-6 text-sm'>
          {product.description?.trim() && (
            <div className='text-sm text-zinc-600'>
              {product.description.split('\n').map((line, index) => (
                <p key={`product-${product.id}-desc-${index}`}>{line}</p>
              ))}
            </div>
          )}
          {product.specifications?.trim() && (
            <details open>
              <summary className='font-medium cursor-pointer'>Details</summary>
              <div className='mt-2 text-zinc-600'>
                {product.specifications.split('\n').map((line, index) => (
                  <p key={`product-${product.id}-spec-${index}`}>{line}</p>
                ))}
              </div>
            </details>
          )}
          {!product.description?.trim() && !product.specifications?.trim() && (
            <p className='text-zinc-600'>(no description available)</p>
          )}
        </div>
      </CardContent>
      <CardFooter className='mt-2 p-4 pt-0 flex justify-between items-center'>
        <Button asChild className='w-full'>
          <a href={product.shopify_url} target='_blank' rel='noopener noreferrer' className='no-underline'>
            View on Shopify
            <ExternalLink className='h-4 w-4' />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
