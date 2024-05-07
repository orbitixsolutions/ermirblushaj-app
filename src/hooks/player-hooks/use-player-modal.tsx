import * as z from 'zod'
import { v4 as uuid } from 'uuid'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLoadImageStore } from '@/store/use-load-image-store'
import { uploadImage } from '@/helpers/upload-image'
import { toast } from 'sonner'
import { editPlayer } from '@/actions/services/edit'
import { useModalPlayerStore } from '@/store/modal/use-modal-player-store'
import { PlayerSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPlayers } from '@/actions/services/create'
import { mutate } from 'swr'
import axios from 'axios'

export const usePlayerModal = () => {
  const [isPending, setIsPending] = useState(false)

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
      setIsPending(true)
      axios
        .get(`/api/players/${playerModalId}`)
        .then((res) => {
          setValue('first_name', res.data.firstName)
          setValue('last_name', res.data.lastName)
          setValue('date_birthday', res.data.dateOfBirth)
          setValue('number', res.data.number)
          setValue('height', res.data.height)
          setValue('nationality', res.data.nationality)
          setValue('position', res.data.position)
          setValue('team_id', res.data.teamId)
          updatedImagePlayer({
            imgFile: null,
            imgPreview: res.data.profilePhoto
          })
        })
        .catch(() => {
          toast.error('An ocurred a error!')
        })
        .finally(() => {
          setIsPending(false)
        })
    }
  }, [playerModalEdit])

  const clearState = () => {
    reset()
    onPlayerModalClose()
    setIsPending(false)
    updatedImagePlayer({ imgFile: null, imgPreview: '' })
  }

  // Enviamos el form para crear/editar jugador
  const onSubmit = handleSubmit(async (data) => {
    const playerId = uuid()
    const currentTeamId = teamData.id || data.team_id

    if (currentTeamId) {
      const teamById = await axios.get(`/api/teams/${currentTeamId}`)

      if (teamById.status === 200) {
        const playersByTeamId = teamById.data.players
        const maxPlayersPerTeam = 10

        if (playersByTeamId.length === maxPlayersPerTeam) {
          return toast.error('You can only create up to 10 players per team!')
        }
      }
    }

    if (playerModalEdit) {
      setIsPending(true)
      const res = editPlayer(playerModalId, data)

      await uploadImage({
        path: 'players',
        id: playerModalId,
        imgFile: imagePlayer.imgFile
      })

      if ((await res).status === 200) {
        clearState()
        mutate('/api/players')
        return toast.success('Player created!')
      }

      clearState()
      return toast.error('An ocurred error!')
    }
    if (data.first_name === '') {
      return toast.info('First name is required!')
    }
    if (teamData.id === '') {
      if (data.team_id === '') {
        return toast.info('Team name is required!')
      }
    }
    if (imagePlayer.imgFile === null) {
      return toast.info('Image is required!')
    }

    setIsPending(true)
    const playerData = {
      ...data,
      id: playerId,
      EXIST_TEAM_NAME: teamData.name,
      EXIST_TEAM_ID: teamData.id
    }
    const { status, message } = await createPlayers(playerData)

    uploadImage({
      path: 'players',
      id: playerId,
      imgFile: imagePlayer.imgFile
    })

    if (status === 200) {
      clearState()
      mutate('/api/players')
      return toast.success(message)
    }

    clearState()
    return toast.error('An ocurred error!')
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
