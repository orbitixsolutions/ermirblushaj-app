'use client'

import { User } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSWR from 'swr'
import Loading from '@/components/admin/loading/loading'

const WrapperAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  const {
    data: users,
    isValidating,
    error
  } = useSWR<User[]>(session ? `/api/users/${session.user.id}` : null, fetcher)

  const isLoading = status === 'loading' || (isValidating && !users)

  useEffect(() => {
    if (users === null) {
      signOut()
    }
  }, [users])

  if (error)
    return (
      <div className='absolute top-[50%] left-0 w-full -translate-y-[50%]  text-center'>
        <div>
          <h2 className='text-4xl font-bold text-custom-red'>501</h2>
          <p className='text-2xl font-bold'>An occurred an error.</p>
          <p className='text-2xl font-bold'>Try more later.</p>
        </div>
      </div>
    )
  if (isLoading) return <Loading />

  return <>{children}</>
}

export default WrapperAuth
