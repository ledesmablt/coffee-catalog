'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../../_types/schema'
import type { Brand } from '@/db/schema'
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@/app/_components/Pagination'
import { InstagramIcon, ShoppingBagIcon } from 'lucide-react'
import { GOOGLE_MAPS_API_KEY } from '@/lib/env'
import { ImageWithFallback } from '../../_components/ImageWithFallback'
import { ProductGrid } from '@/app/_components/ProductGrid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
          <Input
            type='text'
            placeholder={placeholder}
            className='text-md md:text-md w-80 md:w-96 px-4 py-2 border rounded-md border-zinc-500 text-center placeholder:text-center'
            {...register('q')}
          />
          <button
            type='submit'
            className='mt-2 px-4 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors'
          >
            search
          </button>
        </form>
      </section>

      <section aria-label='brand filters' className='flex flex-col gap-4 items-center max-w-[576px]'>
        <div aria-label='brand selector' className='grid grid-cols-4 gap-2'>
          {brands.map((brand) => {
            // TODO: as more brands are added, this doesn't work. decide how to show 10+ brands
            const isSelected = filters.brand === brand.slug
            let className = 'border rounded py-2 px-2 h-32 cursor-pointer'
            if (isSelected) {
              className += ' border-zinc-800'
            }
            const onClick = () => {
              if (isSelected) {
                onSubmit({ ...filters, page: 1, brand: undefined })
              } else {
                onSubmit({ ...filters, page: 1, brand: brand.slug })
              }
            }
            return (
              <div className={className} onClick={onClick} key={`brand-${brand.slug}`}>
                <div className='flex flex-col items-center justify-center text-center w-full h-full'>
                  <h2>{brand.name}</h2>
                </div>
              </div>
            )
          })}
        </div>

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
