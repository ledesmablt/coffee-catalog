import { ExternalLink } from 'lucide-react'
import type { Product } from '@/_types/schema'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from './ImageWithFallback'
import React, { useState } from 'react'
import { ProductDialog } from './ProductDialog'

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
        <p className='mt-6 text-sm text-zinc-600 h-40 line-clamp-[8]'>
          {[product.description ?? '', product.specifications ?? '']
            .join('\n')
            .split('\n')
            .filter(Boolean)
            .map((line, index) => (
              <React.Fragment key={`product-card-desc:${product.id}:${index}`}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>
      </CardContent>
      <CardFooter className='mt-2 p-4 pt-0 flex flex-col gap-2'>
        <Button variant='outline' className='w-full' onClick={() => setIsDialogOpen(true)}>
          View details
        </Button>
        {product.ecommerce_url && (
          <Button asChild className='w-full'>
            <a href={product.ecommerce_url} target='_blank' rel='noopener noreferrer' className='no-underline'>
              View on Shopify
              <ExternalLink className='h-4 w-4' />
            </a>
          </Button>
        )}
      </CardFooter>

      <ProductDialog product={product} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </Card>
  )
}
