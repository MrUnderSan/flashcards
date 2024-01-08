import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Eye, EyeOff, Search } from '@/assets'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './textField.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  label?: string
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

type PropsType = TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>

export const TextField = forwardRef<HTMLInputElement, PropsType>(
  ({ className, errorMessage, label, onChange, placeholder, type = 'text', ...restProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const isShowPasswordButton = type === 'password'
    const isSearch = type === 'search'

    const setShowPasswordHandler = () => setShowPassword(prevValue => !prevValue)

    const getCurrentInputType = (type: TextFieldProps['type'], showPassword: boolean) => {
      if (type === 'password' && showPassword) {
        return 'text'
      }

      return type
    }

    const currentInputType = getCurrentInputType(type, showPassword)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    const classNames = {
      field: clsx(s.field, !!errorMessage && s.error, isSearch && s.hasSearchIcon, className),
      label: clsx(s.label, restProps.disabled && s.disabled, className),
      password: clsx(s.password, restProps.disabled && s.disabled),
      rootBlock: clsx(s.rootBlock),
      searchIcon: clsx(s.searchIcon, restProps.disabled && s.disabled, s.searchIconActive),
    }

    return (
      <div>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={classNames.rootBlock}>
          {isSearch && <Search className={classNames.searchIcon} />}
          <input
            autoFocus
            className={classNames.field}
            onChange={onChangeHandler}
            placeholder={placeholder}
            ref={ref}
            type={currentInputType}
            {...restProps}
          />
          {isShowPasswordButton && (
            <button
              className={classNames.password}
              disabled={restProps.disabled}
              onClick={setShowPasswordHandler}
              type={'button'}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {/*//TODO {errorMessage && <Typography variant={'error'}>{errorMessage}</Typography>}*/}
      </div>
    )
  }
)
