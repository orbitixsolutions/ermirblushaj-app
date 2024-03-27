import * as z from 'zod'
import { v4 as uuid } from 'uuid'
import { useForm } from 'react-hook-form'
import { TeamSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useLoadImageStore } from '@/store/use-load-image-store'
import { uploadImage } from '@/helpers/upload-image'
import { toast } from 'sonner'
import { editTeam } from '@/actions/services/edit'
import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import axios from 'axios'

export const useTeamModal = () => {
  const [isPending, setIsPending] = useState(false)

  // Establecer formulario
  const { handleSubmit, setValue, reset, control } = useForm<
    z.infer<typeof TeamSchema>
  >({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: ''
    }
  })

  // Estado para las imagenes
  const { imageTeam, updatedImageTeam } = useLoadImageStore((state) => ({
    imageTeam: state.imageTeam,
    updatedImageTeam: state.updatedImageTeam
  }))

  // Estado de los modales
  const { teamModalOpen, teamModalId, teamModalEdit } = useModalTeamStore(
    (state) => ({
      teamModalOpen: state.teamModalOpen,
      teamModalId: state.teamModalId,
      teamModalEdit: state.teamModalEdit
    })
  )

  // Limpiar el modal una vez se cierra
  useEffect(() => {
    if (teamModalOpen) {
      reset()
      updatedImageTeam({ imgFile: null, imgPreview: '' })
    }
  }, [teamModalOpen])

  // Si estamos editando rellenamos los campos del modal
  useEffect(() => {
    if (teamModalEdit) {
      axios.get(`/api/teams/${teamModalId}`).then((res) => {
        setValue('name', res.data.name)
        updatedImageTeam({ imgFile: null, imgPreview: res.data.logo })
      })
    }
  }, [teamModalEdit])

  const { onTeamModalClose } = useModalTeamStore((state) => ({
    onTeamModalClose: state.onTeamModalClose
  }))

  const clearState = () => {
    reset()
    setIsPending(false)
    onTeamModalClose()
    updatedImageTeam({ imgFile: null, imgPreview: '' })
  }

  // Enviamos el form para crear/editar equipo
  const onSubmit = handleSubmit(async (data) => {
    const teamId = uuid()
    const MAX_TEAM_CREATE = 20

    const { data: teamsList } = await axios.get('/api/teams')

    if (teamsList.length === MAX_TEAM_CREATE && !teamModalEdit) {
      clearState()
      return toast.error('Team limit reached (20)')
    }

    if (teamModalEdit) {
      setIsPending(true)
      const res = await editTeam(teamModalId, data)

      await uploadImage({
        path: 'teams',
        id: teamModalId,
        imgFile: imageTeam.imgFile
      })

      if (res.status === 200) {
        clearState()
        return toast.success('Team edited!')
      }

      clearState()
      return toast.error('An ocurred error!')
    }

    if (data.name === '') {
      return toast.info('Name is required!')
    }
    if (imageTeam.imgFile === null) {
      return toast.info('Image is required!')
    }

    const res = await axios.post(`/api/teams`, { ...data, id: teamId })

    uploadImage({
      path: 'teams',
      id: teamId,
      imgFile: imageTeam.imgFile
    })

    if (res.status === 200) {
      clearState()
      return toast.success('Team created!')
    }

    clearState()
    return toast.error('An ocurred error!')
  })

  return {
    teamModalOpen,
    teamModalEdit,
    isPending,
    control,
    onSubmit,
    onTeamModalClose
  }
}
