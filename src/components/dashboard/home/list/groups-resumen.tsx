'use client'

import { ExtendedGroups } from '@/actions/types'
import { fetcher } from '@/helpers/fetcher'
import TableGroup from '@/components/dashboard/home/tables/table-group'
import TableSkeleton from '@/components/dashboard/home/skeletons/table-skeleton'
import ErrorTable from '@/components/dashboard/home/errors/error-table'
import useSWR from 'swr'

const GroupsResume = () => {
  const {
    data: data_groups,
    isLoading,
    error
  } = useSWR<ExtendedGroups[]>('/api/groups', fetcher)

  const EMPTY_GROUPS = !data_groups?.length

  if (error) return <ErrorTable />
  if (isLoading) return <TableSkeleton />

  return (
    <div className='space-y-8'>
      <h2 className='text-xl lg:text-3xl font-bold text-center'>
        Groups Resume
      </h2>

      <ol className='flex flex-wrap justify-center gap-8'>
        {!EMPTY_GROUPS ? (
          data_groups?.map((group) => (
            <li
              className='border-[1px] border-custom-lightgray rounded-lg overflow-hidden'
              key={group.id}
            >
              <h3 className='text-base md:text-xl font-bold uppercase w-full bg-custom-green py-3 px-4 text-center text-custom-white'>
                Group {group.name}
              </h3>
              <TableGroup group={group} />
            </li>
          ))
        ) : (
          <div className='col-span-8'>
            <h3 className='text-center text-base md:text-lg'>
              No data available.
            </h3>
          </div>
        )}
      </ol>
    </div>
  )
}

export default GroupsResume
