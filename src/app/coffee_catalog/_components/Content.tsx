'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../_types/schema'
import { ProductCard } from './ProductCard'

const PLACEHOLDERS = ['tastes sweet and delicate', 'reminds me of my childhood summer'] as const

interface FormValues {
  searchQuery: string
}

export const Content = () => {
  const placeholder = useMemo(() => {
    // randomized placeholder text
    const index = Math.floor(Math.random() * PLACEHOLDERS.length)
    return PLACEHOLDERS[index]
  }, [])

  const { handleSubmit, register, setValue } = useForm<FormValues>()

  const [searchParams, setSearchParams] = useState('')
  const { data } = useQuery({
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
    const searchQuery = values.searchQuery || placeholder
    const params = new URLSearchParams({ q: searchQuery })
    setSearchParams(params.toString())

    // submit the placeholder if it doesn't
    if (!values.searchQuery) {
      setValue('searchQuery', searchQuery)
    }
  })

  return (
    <>
      <h1 className='text-2xl'>Coffee Catalog PH</h1>
      <section>
        <form className='flex flex-col items-center mt-4 gap-3' onSubmit={onSubmit}>
          <p className='text-lg'>{"I'm looking for coffee that..."}</p>
          <input
            type='text'
            placeholder={placeholder}
            className='w-96 px-4 py-2 border rounded-md border-zinc-500 text-center placeholder:text-center'
            {...register('searchQuery')}
          />
          <button type='submit' className='px-4 py-1 rounded bg-zinc-100 text-zinc-700'>
            search
          </button>
        </form>
      </section>

      {!!data && (
        <section className='flex flex-col gap-4 items-center'>
          {data.map((product) => {
            return <ProductCard key={`product-${product.name}`} product={product} />
          })}
        </section>
      )}
    </>
  )
}
