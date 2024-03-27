'use client'

import * as z from 'zod'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { login } from '@/actions/login'
import { toast } from 'sonner'

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const styleInput = {
    label: 'text-black/50 text-2xl',
    input: [
      'bg-transparent',
      'text-black/90',
      'placeholder:text-default-700/50'
    ],
    innerWrapper: 'bg-transparent',
    inputWrapper: [
      'border border-[#6D8A0D]',
      'bg-[#8BAE1A]',
      'data-[hover=true]:bg-[#8BAE1A]',
      'group-data-[focus=true]:bg-[#8BAE1A]'
    ]
  }

  const onSubmit = handleSubmit(async (data) => {
    startTransition(() => {
      login(data).then((data) => {
        if (data.error) {
          return toast.error(data.error)
        }
        toast.success(data.success)
      })
    })
  })

  return (
    <form onSubmit={onSubmit} className='max-w-full w-[925px]'>
      <Card className='bg-custom-green px-10 py-8'>
        <CardHeader className='block'>
          <h1 className='text-4xl font-medium'>
            Welcome to the administration of
          </h1>
          <h2 className='text-[3.4rem] font-semibold leading-[64px]'>
            Memorial Campionato
          </h2>
          <h3 className='text-[5.6rem] text-custom-teal font-bold leading-[96px]'>
            Ermir Blushaj
          </h3>
        </CardHeader>

        <CardBody className='flex flex-col gap-8'>
          <div>
            <Controller
              name='email'
              control={control}
              rules={{
                required: {
                  message: 'Email is required',
                  value: true
                }
              }}
              render={({ field }) => (
                <Input
                  autoComplete='false'
                  type='email'
                  size='lg'
                  isDisabled={isPending}
                  labelPlacement='outside'
                  placeholder='user@email.com'
                  label='Enter your electronic email'
                  classNames={styleInput}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className='text-xl font-semibold text-custom-teal'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name='password'
              control={control}
              rules={{
                required: {
                  message: 'Password is required',
                  value: true
                }
              }}
              render={({ field }) => (
                <Input
                  autoComplete='false'
                  type='password'
                  size='lg'
                  isDisabled={isPending}
                  labelPlacement='outside'
                  placeholder='*******'
                  label='Enter your password'
                  classNames={styleInput}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className='text-xl font-semibold text-custom-teal'>
                {errors.password.message}
              </p>
            )}
          </div>
        </CardBody>

        <CardFooter>
          <Button
            size='lg'
            type='submit'
            className='w-full bg-custom-teal text-custom-white text-xl font-bold uppercase py-8'
          >
            Signin
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default LoginForm
