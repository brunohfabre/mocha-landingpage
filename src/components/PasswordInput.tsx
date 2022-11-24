import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { Eye, EyeSlash } from 'phosphor-react'

import { useField } from '@unform/core'

type PasswordInputProps = {
  name: string
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export function PasswordInput({ name, label, ...rest }: PasswordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isVisible, setIsVisible] = useState(false)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className={clsx('text-sm', !!error && 'text-red-500')}
          htmlFor={fieldName}
        >
          {label}
        </label>
      )}

      <div className="flex bg-red-300">
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          className="bg-red-300 flex-1 h-10 px-4 text-sm placeholder:text-zinc-500"
          type={isVisible ? 'text' : 'password'}
          {...rest}
        />

        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => setIsVisible((prevState) => !prevState)}
          tabIndex={-1}
        >
          {isVisible ? <EyeSlash weight="fill" /> : <Eye weight="fill" />}
        </button>
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
