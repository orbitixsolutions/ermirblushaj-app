import { ExtendedGroups } from '@/actions/types'
import { getTranslations } from 'next-intl/server'
import TableGroup from '@/components/dashboard/home/tables/table-group'
import ErrorDates from '@/components/home/errors/error-dates'
import prisma from '@/libs/prisma'

const getGroups = async () => {
  try {
    const groups = await prisma.group.findMany({
      include: {
        teams: {
          orderBy: [
            {
              teamStats: {
                points: 'desc'
              }
            },
            {
              teamStats: {
                goalsFor: 'desc'
              }
            }
          ],

          include: {
            teamStats: true,
            matchHistory: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return { data: groups as ExtendedGroups[], status: 200, message: 'Success' }
  } catch (error: any) {
    return { data: null, status: 500, message: error.message }
  }
}

const Tables = async () => {
  const content = await getTranslations('Groups')

  const { data: groups, status } = await getGroups()

  const EMPTY_GROUPS = !groups?.length
  if (EMPTY_GROUPS) return

  if (status === 500) {
    return <ErrorDates message='Error loading data.' />
  }

  return (
    <section
      id='classification'
      className='max-w-[1440px] mx-auto py-8 md:py-16 px-5 space-y-8 text-custom-white'
    >
      <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
        {content('title')}
      </h2>
      <ol className='flex flex-wrap justify-center gap-8'>
        {groups?.map((group, index) => (
          <li
            className='w-full max-w-[600px] border-[1px] border-custom-lightgray rounded-lg overflow-hidden'
            key={index}
          >
            <h3 className='text-base md:text-xl font-bold uppercase w-full bg-custom-green py-3 px-4 text-center '>
              {content('group_title')} {group.name}
            </h3>

            <TableGroup group={group} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Tables
