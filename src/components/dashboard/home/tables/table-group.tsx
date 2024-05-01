import { ExtendedGroups, Team } from '@/actions/types'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar
} from '@nextui-org/react'

import { useCallback } from 'react'
import { columns } from '@/components/dashboard/home/data'
import { IconCheck, IconMinus, IconX } from '@tabler/icons-react'

const TableGroup = ({ group }: { group: ExtendedGroups }) => {
  const renderCell = useCallback((item: Team, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Team]

    switch (columnKey) {
      case 'team':
        return (
          <div className='flex items-center gap-2'>
            <Avatar size='sm' src={item.logo!} />
            <h2 className='text-xs md:text-sm line-clamp-1'>{item.name}</h2>
          </div>
        )
      case 'gp':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>{item.teamStats.matchPlayed}</h2>
          </div>
        )
      case 'gw':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>{item.teamStats.matchWin}</h2>
          </div>
        )
      case 'gl':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>{item.teamStats.matchLoss}</h2>
          </div>
        )
      case 'gd':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>{item.teamStats.matchDraw}</h2>
          </div>
        )
      case 'gs':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>{item.teamStats.goalsFor}</h2>
          </div>
        )
      case 'ga':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>
              {item.teamStats.goalsAgainst}
            </h2>
          </div>
        )
      case 'dg':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>
              {item.teamStats.goalDifference}
            </h2>
          </div>
        )
      case 'pts':
        return (
          <div>
            <h2 className='text-xs md:text-sm'>{item.teamStats.points}</h2>
          </div>
        )
      case 'history':
        return (
          <ol className='flex items-center gap-1'>
            {item.matchHistory.map((history) => {
              const result = () => {
                switch (history.result) {
                  case 'WIN':
                    return (
                      <div className='bg-custom-green rounded-full p-0.5'>
                        <IconCheck
                          size={16}
                          className='bg-custom-green rounded-full'
                        />
                      </div>
                    )
                  case 'DRAW':
                    return (
                      <div className='bg-custom-gray rounded-full p-0.5'>
                        <IconMinus size={16} />
                      </div>
                    )
                  case 'LOSS':
                    return (
                      <div className='bg-custom-red rounded-full p-0.5'>
                        <IconX
                          size={16}
                          className='bg-custom-red rounded-full'
                        />
                      </div>
                    )
                }
              }
              const isWin = result()

              return <li key={history.id}>{isWin}</li>
            })}
          </ol>
        )

      default:
        return cellValue
    }
  }, [])

  return (
    <Table
      classNames={{
        wrapper: 'bg-transparent',
        thead: 'bg-transparent',
        th: 'bg-transparent text-custom-white'
      }}
      aria-label='Groups'
    >
      <TableHeader className='bg-transparent' columns={columns}>
        {(column) => <TableColumn key={column.id}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={group.teams}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey) as React.ReactNode}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableGroup
