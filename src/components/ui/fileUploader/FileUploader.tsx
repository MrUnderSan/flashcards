import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { IMAGE_SCHEMA } from '@/common/const'
import { Typography } from '@/components/ui/typography'
import { ZodEffects, ZodError } from 'zod'

import s from './fileUploader.module.scss'

export type FileUploaderProps = {
  setFile: (file: File | null) => void
  trigger: ReactNode
  validationSchema?: ZodEffects<any>
} & ComponentPropsWithoutRef<'input'>

export const FileUploader = forwardRef<ElementRef<'input'>, FileUploaderProps>(
  ({ className, name, setFile, trigger, validationSchema = IMAGE_SCHEMA, ...rest }, ref) => {
    const [errorMessage, setErrorMessage] = useState<null | string>(null)

    useEffect(() => {
      toast.error(errorMessage)
    }, [errorMessage])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      let error = null

      try {
        validationSchema.parse(file)
        setErrorMessage(null)
      } catch (e) {
        error = e as Error | ZodError

        if (error instanceof ZodError) {
          setErrorMessage('Validate error: ' + error.errors[0].message)
        } else {
          setErrorMessage('Native error: ' + error.message)
        }
        setFile(null)
      }
      if (!error) {
        file && setFile(file)
      }
    }

    return (
      <Typography as={'label'} className={className} htmlFor={name}>
        {trigger}
        <input
          className={s.inputFile}
          id={name}
          onChange={onChangeHandler}
          ref={ref}
          type={'file'}
          {...rest}
        />
      </Typography>
    )
  }
)
