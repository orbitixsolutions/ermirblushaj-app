'use client'

import { ExtendedGroups } from '@/actions/types'
import { fetcher } from '@/helpers/fetcher'
import TableGroup from '@/components/home/tables/table-group'
import TableSkeleton from '@/components/home/skeletons/table-skeleton'
import TableErrorSkeleton from '@/components/home/skeletons/table-error-skeleton'
import useSWR from 'swr'

const GroupsResume = () => {
  const {
    data: data_groups,
    isLoading,
    error
  } = useSWR<ExtendedGroups[]>('/api/groups', fetcher)

  if (error) return <TableErrorSkeleton />
  if (isLoading) return <TableSkeleton />

  return (
    <ol className='grid grid-cols-8 gap-4 py-8'>
      {data_groups?.map((group) => (
        <li
          className='col-span-8 md:col-span-4 border-[1px] border-custom-lightgray rounded-lg overflow-hidden'
          key={group.id}
        >
          <h3 className='text-base md:text-xl font-bold uppercase w-full bg-custom-green py-3 px-4 text-center text-custom-white'>
            Group {group.name}
          </h3>

          <TableGroup group={group} />
        </li>
      ))}
    </ol>
  )
}

export default GroupsResume
