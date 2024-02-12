import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(30),
  rememberMe: z.boolean().default(false),
})

export type SignInFormValues = z.infer<typeof loginSchema>

export type SignInProps = {
  onSubmit: (data: SignInFormValues) => void
}
