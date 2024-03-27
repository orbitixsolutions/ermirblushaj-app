import { auth, signOut } from '@/auth'
import { Button } from '@nextui-org/button'

const signOutSession = async () => {
  'use server'
  await signOut()
}

const SignupButton = async () => {
  const session = await auth()

  if (session && session.user) {
    return (
      <form action={signOutSession}>
        <Button type='submit' size='md' color='danger' radius='lg'>
          Sign out
        </Button>
      </form>
    )
  }
}

export default SignupButton
