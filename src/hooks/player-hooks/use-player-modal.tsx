import * as z from 'zod'
import { v4 as uuid } from 'uuid'

import { useForm } from 'react-hook-form'
import { useEffect, useTransition } from 'react'
import { useLoadImageStore } from '@/store/use-load-image-store'
import { uploadImage } from '@/helpers/upload-image'
import { editPlayer } from '@/actions/services/edit'
import { useModalPlayerStore } from '@/store/modal/use-modal-player-store'
import { PlayerSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPlayers } from '@/actions/services/create'
import { dataPlayersById, dataTeamById } from '@/actions/services/data'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const usePlayerModal = () => {
  const [isPending, startTranstion] = useTransition()

  const { handleSubmit, setValue, reset, control } = useForm<
    z.infer<typeof PlayerSchema>
  >({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      date_birthday: '',
      height: '',
      number: '',
      nationality: '',
      position: '',
      team_id: ''
    }
  })

  // Estado para las imagenes
  const { imagePlayer, updatedImagePlayer } = useLoadImageStore((state) => ({
    imagePlayer: state.imagePlayer,
    updatedImagePlayer: state.updatedImagePlayer
  }))

  // Estado de los modales
  const { playerModalEdit, playerModalId, playerModalOpen, teamData } =
    useModalPlayerStore((state) => ({
      playerModalOpen: state.playerModalOpen,
      playerModalId: state.playerModalId,
      playerModalEdit: state.playerModalEdit,
      teamData: state.playerModalData
    }))

  const { onPlayerModalClose } = useModalPlayerStore((state) => ({
    onPlayerModalClose: state.onPlayerModalClose
  }))

  // Limpiar el modal una vez se cierra
  useEffect(() => {
    if (playerModalOpen) {
      reset()
      updatedImagePlayer({ imgFile: null, imgPreview: '' })
    }
  }, [playerModalOpen])

  // Si estamos editando rellenamos los campos del modal
  useEffect(() => {
    if (playerModalEdit) {
      startTranstion(() => {
        dataPlayersById(playerModalId)
          .then((res) => {
            const data = res.data

            setValue('first_name', data?.firstName!)
            setValue('last_name', data?.lastName!)
            setValue('date_birthday', data?.dateOfBirth!)
            setValue('number', data?.number!)
            setValue('height', data?.height!)
            setValue('nationality', data?.nationality!)
            setValue('position', data?.position!)
            setValue('team_id', data?.teamId!)
            updatedImagePlayer({
              imgFile: null,
              imgPreview: data?.profilePhoto!
            })
          })
          .catch(() => {
            toast.error('An ocurred a error!')
          })
      })
    }
  }, [playerModalEdit])

  // Limpiar el estado del modal
  const clearState = () => {
    reset()
    onPlayerModalClose()
    updatedImagePlayer({ imgFile: null, imgPreview: '' })
  }

  // Enviamos el form para crear/editar jugador
  const onSubmit = handleSubmit(async (data) => {
    const playerId = uuid()
    const currentTeamId = teamData.id || data.team_id

    const { data: teams, status: statusTeam } = await dataTeamById(
      currentTeamId
    )
    const playersByTeam = teams?.players.length ?? 0
    const maxPlayersPerTeam = 15

    startTranstion(async () => {
      // Evitar crear mas de 15 jugadores por equipo
      if (playersByTeam >= maxPlayersPerTeam) {
        if (statusTeam === 200) {
          toast.error('You can only create up to 15 players per team!')
          return
        }

        toast.error('An ocurred error!')
        return
      }

      // Si estamos editando
      if (playerModalEdit) {
        const { status, message } = await editPlayer(playerModalId, data)

        await uploadImage({
          path: 'players',
          id: playerModalId,
          imgFile: imagePlayer.imgFile
        })

        if (status === 200) {
          clearState()
          mutate('/api/players')
          toast.success(message)
          return
        }

        clearState()
        toast.error('An ocurred error!')
        return
      }

      // Condiciones generales
      if (data.first_name === '') {
        toast.info('First name is required!')
        return
      }
      if (teamData.id === '') {
        if (data.team_id === '') {
          toast.info('Team name is required!')
          return
        }
      }

      // Guardamos los datos en un objeto y lo mandamos a la API
      const playerData = {
        ...data,
        id: playerId,
        EXIST_TEAM_NAME: teamData.name,
        EXIST_TEAM_ID: teamData.id
      }

      // Creamos el jugador
      const { status: statusPlayer, message } = await createPlayers(playerData)

      if (imagePlayer.imgFile) {
        uploadImage({
          path: 'players',
          id: playerId,
          imgFile: imagePlayer.imgFile
        })
      }

      if (statusPlayer === 200) {
        // clearState()
        mutate('/api/players')
        toast.success(message)
        return
      }

      clearState()
      toast.error('An ocurred error!')
      return
    })
  })

  return {
    playerModalOpen,
    playerModalEdit,
    teamData,
    control,
    isPending,
    onSubmit,
    onPlayerModalClose
  }
}
