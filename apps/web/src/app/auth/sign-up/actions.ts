'use server'

import { z } from 'zod'
import { HTTPError } from 'ky'
import { signUp } from '@/http/sign-up'

const signUpSchema = z.object({
  name: z.string().refine(value => value.split(' ').length > 1, {
    message: 'Please, enter your full name',
  }),
  email: z.string().email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(6, { message: 'Password should have at least 6 characters.' }),
  password_confirmation: z.string(),
}).refine(data => {
  if (data.password !== data.password_confirmation) {
    return false; // Return false if passwords don't match
  }
  return true; // Otherwise return true
}, {
  message: 'Password confirmation does not match.',
  path: ['password_confirmation'],
})

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))
 
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors}
  }

  const { name, email, password } = result.data

  try{
    await signUp({
      name,
      email,
      password,
    })    
  } catch (err) {
   if (err instanceof HTTPError) {
   const { message } = await err.response.json()

   return { success: false, message, errors: null}
   }

   console.error(err)

   return { success: false, message: 'Unexpected error, try again in a few minutes.', errors: null}
  } 

  return { success: true, message: null, errors: null}
}