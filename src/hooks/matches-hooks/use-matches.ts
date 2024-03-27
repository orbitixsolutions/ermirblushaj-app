import { MatchesSchemas } from '@/schemas'
import { useIsActive } from '@/store/use-active'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useMatches = () => {
  const { handleSubmit, reset, setValue, control } = useForm({
    resolver: zodResolver(MatchesSchemas),
    defaultValues: {
      play_date: ''
    }
  })

  const { isActive, activeId, updateIsActive, updatedId, disableIsActive } =
    useIsActive((state) => ({
      isActive: state.isActive,
      activeId: state.id,
      updatedId: state.updateId,
      updateIsActive: state.updateIsActive,
      disableIsActive: state.disableIsActive
    }))

  const handleClear = () => {
    reset()
    updateIsActive(false)
    updatedId('')
  }

  return {
    isActive,
    activeId,
    control,
    handleSubmit,
    handleClear,
    disableIsActive,
    updateIsActive,
    updatedId,
    setValue,
    reset
  }
}

export default useMatches
