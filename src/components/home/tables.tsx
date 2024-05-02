'use client'

import { ExtendedGroups } from '@/actions/types'
import { fetcher } from '@/helpers/fetcher'
import TableGroup from '@/components/dashboard/home/tables/table-group'
import TableSkeleton from '@/components/dashboard/home/skeletons/table-skeleton'
import TableErrorSkeleton from '@/components/dashboard/home/skeletons/table-error-skeleton'
import useSWR from 'swr'

const Tables = () => {
  const {
    data: data_groups,
    isLoading,
    error
  } = useSWR<ExtendedGroups[]>('/api/groups', fetcher)

  if (error) return <TableErrorSkeleton />
  if (isLoading) return <TableSkeleton />

  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-24 px-5 flex flex-wrap'>
      <ol className='grid grid-cols-8 gap-4 py-8 text-custom-white'>
        {data_groups?.map((group) => (
          <li
            className='col-span-8 md:col-span-4 border-[1px] border-custom-lightgray rounded-lg overflow-hidden'
            key={group.id}
          >
            <h3 className='text-base md:text-xl font-bold uppercase w-full bg-custom-green py-3 px-4 text-center '>
              Group {group.name}
            </h3>

            <TableGroup group={group} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Tables
