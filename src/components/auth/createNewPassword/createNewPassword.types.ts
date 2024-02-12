import { z } from 'zod'

export const CreateNewPasswordSchema = z.object({
  password: z.string().min(1, 'Enter password'),
})

export type CreateNewPasswordValues = z.infer<typeof CreateNewPasswordSchema>

export type CreateNewPasswordProps = {
  onSubmit: (data: CreateNewPasswordValues) => void
}
