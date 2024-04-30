'use client'

import * as z from 'zod'

import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RegisterAdminSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { createUser } from '@/actions/services/create'

const FormAdmin = () => {
  const [isPending, startTransition] = useTransition()

  const { handleSubmit, reset, control } = useForm<
    z.infer<typeof RegisterAdminSchema>
  >({
    resolver: zodResolver(RegisterAdminSchema),
    defaultValues: {
      email: '',
      name: '',
      role: '',
      password: ''
    }
  })

  const styleInput = {
    label:
      'text-white text-sm md:text-xl group-data-[filled-within=true]:text-white group-data-[filled=true]:text-white'
  }

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const { status, message } = await createUser(data)

      if (status === 200) {
        toast.success(message)
        reset()
        return
      }

      toast.success(message)
      reset()
      return
    })
  })

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col gap-5 bg-custom-darkblue rounded-2xl px-10 py-8'
    >
      <div className='flex flex-col gap-4'>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input
              type='text'
              isDisabled={isPending}
              radius='md'
              labelPlacement='outside'
              placeholder='Admin user name'
              label='Name'
              classNames={styleInput}
              {...field}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input
              type='text'
              isDisabled={isPending}
              radius='md'
              labelPlacement='outside'
              placeholder='email@email.com'
              label='Email'
              classNames={styleInput}
              {...field}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input
              type='password'
              isDisabled={isPending}
              radius='md'
              labelPlacement='outside'
              placeholder='********'
              label='Password'
              classNames={styleInput}
              {...field}
            />
          )}
        />
        <Controller
          name='role'
          control={control}
          render={({ field }) => (
            <Select
              isDisabled={isPending}
              radius='md'
              labelPlacement='outside'
              placeholder='Select role'
              label='Role'
              classNames={styleInput}
              {...field}
            >
              <SelectItem value={'ADMIN'} key={'ADMIN'}>
                ADMIN
              </SelectItem>
              <SelectItem value={'OWNER'} key={'OWNER'}>
                OWNER
              </SelectItem>
            </Select>
          )}
        />
      </div>

      <Button
        isLoading={isPending}
        type='submit'
        className='bg-custom-green font-bold uppercase text-sm md:Ftext-xl w-full'
      >
        Create
      </Button>
    </form>
  )
}

export default FormAdmin
