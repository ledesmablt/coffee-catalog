import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Product } from '@/_types/schema'
import { ImageWithFallback } from './ImageWithFallback'

interface ProductDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

const breakLines = (text: string, key: string) => {
  // get rid of huge chunks of whitespace from 3+ newlines
  const lines = text.replace(/\n{3,}/g, '\n\n').split('\n')
  return lines.map((line, index) => (
    <React.Fragment key={`${key}:${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ))
}

export const ProductDialog = ({ product, open, onOpenChange }: ProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] md:max-w-[700px] h-full sm:h-auto'>
        <DialogHeader className='pr-8 sm:pl-4'>
          <DialogTitle className='text-2xl font-bold'>{product.title}</DialogTitle>
          <h3 className='font-light text-sm text-zinc-800'>by {product.brand}</h3>
        </DialogHeader>
        <ScrollArea className='h-[calc(100vh-8rem)] sm:h-auto sm:max-h-[calc(100vh-8rem)]'>
          <div className='space-y-8 p-4 pb-8'>
            <div className='w-full border'>
              <ImageWithFallback src={product.image_url} alt={product.title} className='w-full h-auto object-contain' />
            </div>
            {product.description && (
              <div>
                <h3 className='font-semibold mb-2'>Description</h3>
                <p className='text-gray-600'>{breakLines(product.description, 'product-modal-description-line')}</p>
              </div>
            )}
            {product.specifications && (
              <div>
                <h3 className='font-semibold mb-2'>Specifications</h3>
                <p className='text-gray-600'>
                  {breakLines(product.specifications, 'product-modal-specifications-line')}
                </p>
              </div>
            )}
            <a
              href={product.ecommerce_url}
              target='_blank'
              rel='noopener noreferrer'
              className='no-underline flex gap-1 items-center text-zinc-700'
            >
              <ShoppingCart size={20} />
              View on Shopify
            </a>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
