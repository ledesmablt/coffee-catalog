'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../_types/schema'
import { ProductGrid } from './ProductGrid'
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const PLACEHOLDERS = [
  'Sweet and delicate tasting coffee',
  'Coffee that reminds me of my childhood',
  'Coffee beans good for a sweet espresso',
  'Coffee good for cozy weather',
  'Beans from san roque',
] as const

interface FormValues {
  q?: string
}

const extractFilters = (query: ReadonlyURLSearchParams): FormValues => {
  const data: FormValues = {}
  const q = query.get('q')
  if (q) {
    data.q = q
  }
  return data
}

const filtersToQuery = (filters: FormValues): string => {
  const query = new URLSearchParams()
  if (filters.q) {
    query.set('q', filters.q)
  }
  return query.toString()
}

export const Content = () => {
  const placeholder = useMemo(() => {
    // randomized placeholder text
    const index = Math.floor(Math.random() * PLACEHOLDERS.length)
    return PLACEHOLDERS[index]
  }, [])

  const router = useRouter()
  const query = useSearchParams()
  const filters = useMemo(() => extractFilters(query), [query])

  const { handleSubmit, register } = useForm<FormValues>({
    values: filters,
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/products/search', query.toString()],
    retry: false,
    enabled: !!query.get('q'),
    queryFn: async () => {
      if (!query.get('q')) {
        return []
      }
      const res = await fetch(`/api/products/search?${query.toString()}`)
      if (!res.ok) {
        throw new Error(`server error: ${await res.text()}`)
      }
      const { data } = await res.json()
      return data as Product[]
    },
  })

  const onSubmit = handleSubmit((values) => {
    const q = values.q || placeholder
    const newQuery = filtersToQuery({ ...values, q })

    router.push(`${window.location.pathname}?${newQuery}`, { scroll: false })
  })

  return (
    <>
      <h1 className='text-3xl font-light'>Coffee Catalog</h1>
      <section className='flex flex-col items-center mt-8'>
        <form className='flex gap-2' onSubmit={onSubmit}>
          <Input
            type='text'
            placeholder={placeholder}
            className='text-md md:text-md w-80 md:w-96 px-4 py-2 border rounded-md border-zinc-500'
            {...register('q')}
          />
          <Button type='submit' className='px-4 py-1'>
            Search
          </Button>
        </form>
      </section>

      {isLoading && <p className='mt-4 text-zinc-700'>preparing your ☕️...</p>}
      {!isLoading && <p className='mt-4 text-zinc-700'></p>}

      {error && (
        <div className='text-zinc-600'>
          <p>oops! something went wrong. please try again later.</p>
          <p>Error message: {error.message}</p>
        </div>
      )}
      {!error && <ProductGrid products={data} isLoading={isLoading} />}
    </>
  )
}
