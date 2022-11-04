import { useEffect, useRef } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react'
import { useField } from '@unform/core'

interface InputProps {
  name: string
  label?: string
  type?: 'text' | 'password'
}

export function Input({ name, label, type }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value ? ref.current.value : null
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
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

      <ChakraInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
      />

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
