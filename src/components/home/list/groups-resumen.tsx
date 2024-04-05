'use client'

import { ExtendedGroups } from '@/actions/types'
import { fetcher } from '@/helpers/fetcher'
import useSWR from 'swr'
import GroupTable from '@/components/home/tables/group-table'

const GroupsResume = () => {
  const {
    data: getGroups,
    isLoading,
    error
  } = useSWR<ExtendedGroups[]>('/api/groups', fetcher, {
    refreshInterval: 1000
  })

  if (error) {
    return <p>An ocurred a error!</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2 className='text-4xl text-center font-bold'>State groups</h2>
      <ol className='grid grid-cols-8 gap-4 py-8'>
        {getGroups?.map((group) => (
          <li
            className='col-span-4 border-[1px] border-custom-lightgray rounded-lg overflow-hidden'
            key={group.id}
          >
            <h3 className='text-xl font-bold uppercase w-full bg-custom-green py-3 px-4 text-center text-custom-white'>
              Group {group.name}
            </h3>

            <GroupTable group={group} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default GroupsResume
