'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../../_types/schema'
import type { Brand } from '@/db/schema'
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@/app/_components/Pagination'
import { InstagramIcon, ListFilterIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react'
import { GOOGLE_MAPS_API_KEY } from '@/lib/env'
import { ImageWithFallback } from '../../_components/ImageWithFallback'
import { ProductGrid } from '@/app/_components/ProductGrid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface FormValues {
  q?: string
  brand?: string
  page: number
}

const extractFilters = (query: ReadonlyURLSearchParams): FormValues => {
  const data: FormValues = { page: 1 }
  const q = query.get('q')
  if (q) {
    data.q = q
  }
  const brand = query.get('brand')
  if (brand) {
    data.brand = brand
  }
  const page = Number(query.get('page'))
  if (page > 1) {
    data.page = page
  }
  return data
}

const filtersToQuery = (filters: FormValues): string => {
  const query = new URLSearchParams()
  if (filters.q) {
    query.set('q', filters.q)
  }
  if (filters.brand) {
    query.set('brand', filters.brand)
  }
  if (filters.page > 1) {
    query.set('page', filters.page.toString())
  }
  return query.toString()
}

export interface Props {
  brands: Brand[]
}
export const Content = ({ brands }: Props) => {
  const placeholder = 'gesha natural'
  const resultsRef = useRef<HTMLDivElement>(null)
  const [scrollToResults, setScrollToResults] = useState(false)

  const router = useRouter()
  const query = useSearchParams()
  const filters = useMemo(() => extractFilters(query), [query])
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: filters,
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/products', query.toString()],
    retry: false,
    queryFn: async () => {
      const res = await fetch(`/api/products?${query.toString()}`)
      if (!res.ok) {
        throw new Error(`server error: ${await res.text()}`)
      }
      return (await res.json()) as { data: Product[]; maxPages: number }
    },
  })

  useEffect(() => {
    if (!resultsRef.current || !scrollToResults) {
      return
    }

    resultsRef.current.scrollIntoView({ behavior: 'instant' })
    setScrollToResults(false)
  }, [scrollToResults, resultsRef])

  const onSubmit = (values: FormValues) => {
    if (values.q !== filters.q) {
      // reset to first page if search input changed
      values.page = 1
    }
    if (values.page !== filters.page) {
      setScrollToResults(true)
    }
    const newQuery = filtersToQuery(values)
    router.push(`${window.location.pathname}?${newQuery}`, { scroll: false })
  }

  const selectedBrand = brands.find((brand) => filters.brand === brand.slug)

  return (
    <>
      <h1 className='text-3xl font-light'>Browse all products</h1>
      <section aria-label='search input' className='flex flex-col items-center'>
        <form className='flex flex-col items-center mt-4 gap-1' onSubmit={handleSubmit(onSubmit)}>
          <Label className='text-md mb-1' htmlFor={register('q').name}>
            {"I'm looking for..."}
          </Label>
          <div className='flex gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='relative aspect-square px-2' aria-label='Show filters'>
                  <ListFilterIcon />
                  {selectedBrand && (
                    <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-zinc-700 transform translate-x-1/2 -translate-y-1/2' />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='start'>
                <DropdownMenuLabel>Brands</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={filters.brand ?? ''}
                  onValueChange={(brandSlug) => {
                    const isSelected = filters.brand === brandSlug
                    if (isSelected) {
                      onSubmit({ ...filters, page: 1, brand: undefined })
                    } else {
                      onSubmit({ ...filters, page: 1, brand: brandSlug })
                    }
                  }}
                >
                  {brands.map((brand) => (
                    <DropdownMenuRadioItem value={brand.slug} key={brand.slug} className='cursor-pointer'>
                      {brand.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              type='text'
              placeholder={placeholder}
              className='text-md md:text-md w-80 md:w-96 px-4 py-2 border rounded-md border-zinc-500 text-center placeholder:text-center'
              {...register('q')}
            />
            <Button className='px-4'>
              <SearchIcon />
            </Button>
          </div>
        </form>
      </section>

      <section aria-label='selected-brand' className='flex flex-col gap-4 items-center max-w-[576px]'>
        {selectedBrand && (
          <div
            aria-label='selected brand info'
            className='w-full border rounded px-8 py-4 flex flex-col items-center gap-2'
          >
            <div className='h-24 flex justify-center mb-4'>
              <ImageWithFallback
                src={selectedBrand.logo_url ?? ''}
                backgroundColor={selectedBrand.logo_background_color ?? ''}
                alt={`${selectedBrand.name} logo`}
                className='object-contain'
              />
            </div>
            <h2 className='font-bold text-lg'>{selectedBrand.name}</h2>
            <p className='text-center'>{selectedBrand.description}</p>
            <div className='flex gap-3 my-3'>
              {selectedBrand.shop_url && (
                <a
                  href={selectedBrand.shop_url}
                  target='_blank'
                  rel='noreferrer'
                  className='text-zinc-600 hover:text-zinc-900 transition-colors'
                >
                  <ShoppingBagIcon />
                </a>
              )}
              {selectedBrand.instagram_username && (
                <a
                  href={`https://instagram.com/@${selectedBrand.instagram_username}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-zinc-600 hover:text-zinc-900 transition-colors'
                >
                  <InstagramIcon />
                </a>
              )}
            </div>
            {selectedBrand.google_maps_query && (
              <div className='aspect-video relative mt-4 w-full'>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${selectedBrand.google_maps_query}`}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            )}
          </div>
        )}
      </section>

      <section aria-label='product results' className='flex flex-col items-center gap-4 my-6' ref={resultsRef}>
        {error && (
          <div className='text-zinc-600'>
            <p>oops! something went wrong. please try again later.</p>
            <p>Error message: {error.message}</p>
          </div>
        )}
        {!error && (
          <>
            <Pagination
              currentPage={filters.page}
              maxPages={data?.maxPages ?? 0}
              onChangePage={(newPage) => {
                onSubmit({ ...filters, page: newPage })
              }}
            />
            <ProductGrid products={data?.data} isLoading={isLoading} searchQuery={filters.q} />
            <Pagination
              currentPage={filters.page}
              maxPages={data?.maxPages ?? 0}
              onChangePage={(newPage) => {
                onSubmit({ ...filters, page: newPage })
              }}
            />
          </>
        )}
      </section>
    </>
  )
}
