import * as z from 'zod'
import { v4 as uuid } from 'uuid'
import { useForm } from 'react-hook-form'
import { TeamSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useTransition } from 'react'
import { useLoadImageStore } from '@/store/use-load-image-store'
import { uploadImage } from '@/helpers/upload-image'
import { editTeam } from '@/actions/services/edit'
import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { createTeam } from '@/actions/services/create'
import { dataTeamById, dataTeams } from '@/actions/services/data'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useTeamModal = () => {
  const [isPending, startTranstion] = useTransition()

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
      startTranstion(() => {
        dataTeamById(teamModalId)
          .then((res) => {
            const data = res.data

            setValue('name', data?.name!)
            updatedImageTeam({ imgFile: null, imgPreview: data?.logo! })
          })
          .catch(() => {
            toast.error('An ocurred a error!')
          })
      })
    }
  }, [teamModalEdit])

  const { onTeamModalClose } = useModalTeamStore((state) => ({
    onTeamModalClose: state.onTeamModalClose
  }))

  const clearState = () => {
    reset()
    onTeamModalClose()
    updatedImageTeam({ imgFile: null, imgPreview: '' })
  }

  // Enviamos el form para crear/editar equipo
  const onSubmit = handleSubmit(async (data) => {
    const teamId = uuid()
    const MAX_TEAM_CREATE = 20

    const { data: teamsList } = await dataTeams()
    if (teamsList?.length === MAX_TEAM_CREATE && !teamModalEdit) {
      clearState()
      return toast.error('Team limit reached (20)')
    }

    if (teamModalEdit) {
      startTranstion(async () => {
        const res = await editTeam(teamModalId, data)

        await uploadImage({
          path: 'teams',
          id: teamModalId,
          imgFile: imageTeam.imgFile
        })

        if (res.status === 200) {
          clearState()
          mutate('/api/teams')
          toast.success('Team edited!')
          return
        }

        clearState()
        toast.error('An ocurred error!')
        return
      })
    }

    if (data.name === '') {
      return toast.info('Name is required!')
    }

    // Creamos el objeto y lo mandamos a la API
    const dataTeam = { ...data, id: teamId }

    // Creamos el equipo
    startTranstion(async () => {
      const { status, message } = await createTeam(dataTeam)

      if (imageTeam.imgFile) {
        uploadImage({
          path: 'teams',
          id: teamId,
          imgFile: imageTeam.imgFile
        })
      }

      if (status === 200) {
        clearState()
        mutate('/api/teams')
        toast.success(message)
        return
      }

      clearState()
      toast.error('An ocurred error!')
      return
    })
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
