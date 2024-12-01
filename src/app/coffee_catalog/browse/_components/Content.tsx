'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { Brand, Product } from '../../_types/schema'
import { ProductCard } from '../../_components/ProductCard'
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from './Pagination'

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

// TODO: implement brands UI filter (simple dropdown next to search)
export interface Props {
  brands: Brand[]
}
export const Content = ({ brands }: Props) => {
  const placeholder = brands[0].name

  const router = useRouter()
  const query = useSearchParams()
  const filters = useMemo(() => extractFilters(query), [query])
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: filters,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['/api/products', query.toString()],
    queryFn: async () => {
      const res = await fetch(`/coffee_catalog/api/products?${query.toString()}`)
      return (await res.json()) as { data: Product[]; maxPages: number }
    },
  })

  const onSubmit = (values: FormValues) => {
    if (values.q !== filters.q) {
      // reset to first page if search input changed
      values.page = 1
    }
    const newQuery = filtersToQuery(values)
    router.push(`${window.location.pathname}?${newQuery}`)
  }

  return (
    <>
      <h1 className='text-2xl'>Browse Products</h1>
      <section className='flex flex-col items-center'>
        <form className='flex flex-col items-center mt-4 gap-3' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-lg'>{"I'm looking for..."}</p>
          <input
            type='text'
            placeholder={placeholder}
            className='w-80 md:w-96 px-4 py-2 border rounded-md border-zinc-500 text-center placeholder:text-center'
            {...register('q')}
          />
          <button type='submit' className='px-4 py-1 rounded bg-zinc-100 text-zinc-700'>
            search
          </button>
        </form>
      </section>

      <section className='flex gap-2 justify-center'>
        {brands.map((brand) => {
          // TODO: as more brands are added, this doesn't work. decide how to show 10+ brands
          const isSelected = filters.brand === brand.slug
          let className = 'border rounded py-2 px-2 w-32 h-32 cursor-pointer'
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
      </section>

      {isLoading && <p className='mt-4 text-zinc-700'>preparing your ☕️...</p>}

      {!!data?.data && (
        <section className='flex flex-col items-center gap-4 my-6'>
          <Pagination
            currentPage={filters.page}
            maxPages={data.maxPages}
            onChangePage={(newPage) => {
              onSubmit({ ...filters, page: newPage })
            }}
          />
          <div className='flex flex-col gap-4 items-center max-w-[400px] md:max-w-[600px]'>
            {data.data.map((product) => {
              return <ProductCard key={`product-${product.id}`} product={product} />
            })}
          </div>
          <Pagination
            currentPage={filters.page}
            maxPages={data.maxPages}
            onChangePage={(newPage) => {
              onSubmit({ ...filters, page: newPage })
            }}
          />
        </section>
      )}
    </>
  )
}
