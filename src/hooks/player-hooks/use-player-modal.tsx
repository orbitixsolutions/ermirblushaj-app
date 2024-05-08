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

    // Evitar crear mas de 10 jugadores por equipo
    if (currentTeamId) {
      startTranstion(async () => {
        const { data, status } = await dataTeamById(currentTeamId)

        if (status === 200) {
          const playersByTeam = data?.players
          const maxPlayersPerTeam = 10

          if (playersByTeam?.length === maxPlayersPerTeam) {
            toast.error('You can only create up to 10 players per team!')
            return
          }
        }
      })
    }

    // Si estamos editando
    if (playerModalEdit) {
      startTranstion(async () => {
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
      })
    }

    // Condiciones generales
    if (data.first_name === '') {
      return toast.info('First name is required!')
    }
    if (teamData.id === '') {
      if (data.team_id === '') {
        return toast.info('Team name is required!')
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
    startTranstion(async () => {
      const { status, message } = await createPlayers(playerData)

      if (imagePlayer.imgFile) {
        uploadImage({
          path: 'players',
          id: playerId,
          imgFile: imagePlayer.imgFile
        })
      }

      if (status === 200) {
        clearState()
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
