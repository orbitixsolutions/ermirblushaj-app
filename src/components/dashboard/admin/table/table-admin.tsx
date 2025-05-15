'use client'

import React, { useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Spinner,
} from '@nextui-org/react'
import { columns } from '@/components/dashboard/admin/data/index'
import { User as TypeUsers, User } from '@prisma/client'
import { IconTrash } from '@tabler/icons-react'
import { deleteAdmin } from '@/actions/services/delete'
import { toast } from 'sonner'
import { useCurrentUser } from '@/hooks/auth/use-current-user'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const TableAdmin = () => {
  const user = useCurrentUser()
  const userId = user?.id

  const { data: users } = useSWR<User[]>('/api/users', fetcher, {
    refreshInterval: 3000,
  })

  const handleDeleteAdmin = async (id: string) => {
    const res = await deleteAdmin(id)

    if (res.status === 200) {
      return toast.success('Admin deleted!')
    }
    return toast.error('An ocurred a error!')
  }

  const renderCell = useCallback((user: TypeUsers, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof TypeUsers]

    switch (columnKey) {
      case 'name':
        return (
          <div className='flex flex-col'>
            <p className='font-bold text-lg capitalize'>{cellValue}</p>
            <p>{user.email}</p>
          </div>
        )
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>{cellValue}</p>
          </div>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip
              color='danger'
              content={'Delete admin'}
            >
              <Button
                onPress={() => handleDeleteAdmin(user.id)}
                isIconOnly
                radius='full'
                color='danger'
              >
                <IconTrash />
              </Button>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table
      classNames={{
        wrapper: 'bg-custom-navy border-[1px] border-custom-lightgray',
        th: 'bg-custom-darkblue text-custom-white font-bold',
      }}
      aria-label='Admin users'
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.id}
            align={column.id === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          <div>
            <p>No admin users</p>
          </div>
        }
      >
        {users &&
          (users.map((user) => {
            if (user.id === userId) return

            return (
              <TableRow key={user.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(user, columnKey)}</TableCell>
                )}
              </TableRow>
            )
          }) as any)}
      </TableBody>
    </Table>
  )
}

export default TableAdmin
