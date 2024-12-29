'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../_types/schema'
import { ProductGrid } from './ProductGrid'
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PLACEHOLDERS = [
  'sweet and delicate flavors',
  'memories from my childhood',
  'good cup sidamo special',
  'coffee from sitio san roque',
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

  const { handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues: filters,
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
    // // submit the placeholder if it doesn't exist
    if (!values.q) {
      setValue('q', q)
    }

    router.push(`${window.location.pathname}?${newQuery}`, { scroll: false })
  })

  return (
    <>
      <h1 className='text-3xl font-light'>Coffee Catalog</h1>
      <section className='flex flex-col items-center'>
        <form className='flex flex-col items-center mt-4 gap-1' onSubmit={onSubmit}>
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
