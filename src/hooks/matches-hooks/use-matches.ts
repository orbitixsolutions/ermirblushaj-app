import { MatchesSchemas } from '@/schemas'
import { useIsActive } from '@/store/use-active'
import { useTodayGameStore } from '@/store/use-today-game'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useMatches = () => {
  const { handleSubmit, reset, setValue, control } = useForm({
    resolver: zodResolver(MatchesSchemas),
    defaultValues: {
      play_start_date: ''
    }
  })

  const { isToday, updatedTodayGame } = useTodayGameStore((state) => ({
    isToday: state.isToday,
    updatedTodayGame: state.updatedTodayGame
  }))

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
    updateIsActive,
    updatedTodayGame,
    updatedId,
    setValue,
    reset,
    isToday,
    isActive,
    handleSubmit,
    handleClear,
    disableIsActive,
    control,
    activeId
  }
}

export default useMatches
