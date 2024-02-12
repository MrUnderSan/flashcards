import { z } from 'zod'

export const signUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email(),
    name: z.string().min(3).max(12),
    password: z.string().min(6).max(30),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type FormSignUpFormValues = z.infer<typeof signUpSchema>

export type FormSignUpProps = {
  onSubmit: (data: FormSignUpFormValues) => void
}
