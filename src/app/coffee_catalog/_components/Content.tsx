'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../_types/schema'
import { ProductCard } from './ProductCard'

const PLACEHOLDERS = [
  'sweet and delicate flavors',
  'memories from my childhood',
  'good cup sidamo special',
  'coffee from sitio san roque',
] as const

interface FormValues {
  searchQuery: string
  enableSmartSuggestions: boolean
}

export const Content = () => {
  const placeholder = useMemo(() => {
    // randomized placeholder text
    const index = Math.floor(Math.random() * PLACEHOLDERS.length)
    return PLACEHOLDERS[index]
  }, [])

  const { handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues: {
      enableSmartSuggestions: false,
    },
  })

  const [searchParams, setSearchParams] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['/api/search_products', searchParams],
    enabled: !!searchParams,
    queryFn: async () => {
      if (!searchParams) {
        return []
      }

      // TODO: improve types
      const res = await fetch(`/coffee_catalog/api/search_products?${searchParams}`)
      const { data } = await res.json()
      return data as Product[]
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const q = values.searchQuery || placeholder
    const filterType = values.enableSmartSuggestions ? 'similarity' : ''
    const params = new URLSearchParams({ q, filterType })
    setSearchParams(params.toString())

    // submit the placeholder if it doesn't
    if (!values.searchQuery) {
      setValue('searchQuery', q)
    }
  })

  return (
    <>
      <h1 className='text-2xl'>Coffee Catalog PH</h1>
      <section className='flex flex-col items-center'>
        <form className='flex flex-col items-center mt-4 gap-3' onSubmit={onSubmit}>
          <p className='text-lg'>{"I'm looking for..."}</p>
          <input
            type='text'
            placeholder={placeholder}
            className='w-96 px-4 py-2 border rounded-md border-zinc-500 text-center placeholder:text-center'
            {...register('searchQuery')}
          />
          <button type='submit' className='px-4 py-1 rounded bg-zinc-100 text-zinc-700'>
            search
          </button>
          <span className='flex gap-2 items-center'>
            <input type='checkbox' {...register('enableSmartSuggestions')} />
            <label htmlFor='enableSmartSuggestions'>enable smart suggestions? (development)</label>
          </span>
        </form>

        {isLoading && <p className='mt-4 text-zinc-700'>preparing your ☕️...</p>}
      </section>

      {!!data && (
        <section className='flex flex-col gap-4 items-center'>
          {data.map((product) => {
            return <ProductCard key={`product-${product.id}`} product={product} />
          })}
        </section>
      )}
    </>
  )
}
