import { RefObject, useRef } from 'react'

import * as z from 'zod'

import { FormHandles } from '@unform/core'

import { getValidationErrors } from '../utils/getValidationErrors'

type HandleSubmitData<T> = (data: T) => void

type UseFormProps = {
  formSchema: z.ZodObject<any>
}

type UseFormResponse<T> = [
  RefObject<FormHandles>,
  (handle: HandleSubmitData<T>) => void,
]

export function useForm<T>({ formSchema }: UseFormProps): UseFormResponse<T> {
  const formRef = useRef<FormHandles>(null)

  function handleSubmit(handle: HandleSubmitData<T>) {
    try {
      formRef.current?.setErrors({})

      const data = formRef.current?.getData() as T

      formSchema.parse(data)

      handle(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        formRef.current?.setErrors(getValidationErrors(err))
      }
    }
  }

  return [formRef, handleSubmit]
}
