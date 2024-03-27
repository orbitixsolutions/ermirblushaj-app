'use client'

import { User } from '@prisma/client'
import { signOut, useSession } from 'next-auth/react'
import axios from 'axios'
import useSWR from 'swr'
import Loading from '@/components/admin/loading/loading'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const WrapperAuth = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession()
  const userId = data?.user.id || ''

  const { data: users } = useSWR<User[]>(`/api/users/${userId}`, fetcher, {
    refreshInterval: 3000
  })

  const LOADING_USERS = undefined
  const USER_NO_EXIST = null

  if (users === LOADING_USERS) {
    return <Loading />
  }

  if (users === USER_NO_EXIST) {
    return signOut()
  }

  return <>{children}</>
}

export default WrapperAuth
