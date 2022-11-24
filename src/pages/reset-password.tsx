import { useNavigate, useSearchParams } from 'react-router-dom'

import z from 'zod'

import { useMutation } from '@tanstack/react-query'
import { Form } from '@unform/web'

import { Button } from '../components/Button'
import { PasswordInput } from '../components/PasswordInput'
import { useForm } from '../hooks/useForm'
import { api } from '../lib/api'

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(1, 'required'),
    confirmPassword: z.string().min(1, 'required'),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    }
  })

type ResetPasswordFormInputs = z.infer<typeof resetPasswordFormSchema>

export function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [formRef, handleSubmit] = useForm<ResetPasswordFormInputs>({
    formSchema: resetPasswordFormSchema as any,
  })

  const { mutateAsync: resetPassword, isLoading } = useMutation(
    async ({ password }: ResetPasswordFormInputs) => {
      await api.post(
        '/password/reset',
        { password },
        {
          headers: {
            // authorization: `Bearer ${searchParams.get('token')}`,
            resetpasswordtoken: searchParams.get('token'),
          },
        },
      )
    },
    {
      onSuccess: () => {
        alert('password reseted')

        navigate('/')
      },
    },
  )

  function handleResetPassword(data: ResetPasswordFormInputs) {
    resetPassword(data)
  }

  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-3xl font-medium">Verification code</h1>

      <Form
        ref={formRef}
        onSubmit={() => handleSubmit(handleResetPassword)}
        className="flex flex-col w-80 gap-2"
      >
        <PasswordInput
          name="password"
          label="password"
          placeholder="password"
        />
        <PasswordInput
          name="confirmPassword"
          label="confirm password"
          placeholder="confirm password"
        />
        <Button type="submit" className="mt-6" isLoading={isLoading}>
          reset password
        </Button>
      </Form>

      <button
        onClick={() => navigate('/')}
        className="text-emerald-300 hover:text-emerald-400 text-sm disabled:opacity-60"
        disabled={isLoading}
      >
        go back to home
      </button>
    </div>
  )
}
