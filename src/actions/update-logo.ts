'use server'

import prisma from '@/libs/prisma'

interface Props {
  path: string
  id: string
  imgUrl: string
}

export const updateLogo = async ({
  path: path,
  id: id,
  imgUrl: downloadUrl
}: Props) => {
  try {
    switch (path) {
      case 'teams':
        return await prisma.team.update({
          where: {
            id: id
          },
          data: {
            logo: downloadUrl
          }
        })
      case 'players':
        return await prisma.player.update({
          where: {
            id: id
          },
          data: {
            profilePhoto: downloadUrl
          }
        })
      case 'tournament':
        return await prisma.tournamentGallery.update({
          where: {
            id: id
          },
          data: {
            url: downloadUrl
          }
        })
      case 'tribute':
        return await prisma.tributeGallery.update({
          where: {
            id: id
          },
          data: {
            url: downloadUrl
          }
        })
      default:
        break
    }

    return { success: 'Image updated!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}
