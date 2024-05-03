'use client'

import { ExtendedGroups } from '@/actions/types'
import { fetcher } from '@/helpers/fetcher'
import TableGroup from '@/components/dashboard/home/tables/table-group'
import TableErrorSkeleton from '@/components/dashboard/home/skeletons/table-error-skeleton'
import SkeletonTables from '@/components/home/skeleton/skeleton-tables'
import useSWR from 'swr'

const Tables = () => {
  const {
    data: data_groups,
    isLoading,
    error
  } = useSWR<ExtendedGroups[]>('/api/groups', fetcher)

  const EMPTY_GROUPS = 0
  if (data_groups?.length === EMPTY_GROUPS) return

  if (error) return <TableErrorSkeleton />
  if (isLoading) return <SkeletonTables />

  return (
    <section className='max-w-[1440px] mx-auto py-8 md:py-16 px-5 text-custom-white'>
      <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
        Groups Stage
      </h2>
      <ol className='grid grid-cols-8 gap-4 py-8 w-full'>
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
