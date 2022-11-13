import { useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { z } from 'zod'

import { FormHandles } from '@unform/core'

import { Button } from '../../components/Button'
import { Heading } from '../../components/Heading'
import Input from '../../components/Input'
import { api } from '../../lib/api'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { Container, Form } from './styles'

const resetPasswordFormSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
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
  const formRef = useRef<FormHandles>(null)

  const navigate = useNavigate()
  const [search] = useSearchParams()

  useEffect(() => {
    if (!search.get('token')) {
      navigate('/', {
        replace: true,
      })
    }
  }, [navigate, search])

  async function handleSubmit(data: ResetPasswordFormInputs) {
    try {
      formRef.current?.setErrors({})

      resetPasswordFormSchema.parse(data)

      await api.post(
        '/password/reset',
        {
          password: data.password,
        },
        {
          headers: {
            resetpasswordtoken: search.get('token'),
          },
        },
      )

      navigate('/', {
        replace: true,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        formRef.current?.setErrors(getValidationErrors(err))
      }
    }
  }

  return (
    <Container>
      <Heading size="lg">Reset password</Heading>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <Input
          name="password"
          type="password"
          label="password"
          placeholder="password"
        />

        <Input
          name="confirmPassword"
          type="password"
          label="confirm password"
          placeholder="confirm password"
        />

        <Button type="submit">reset password</Button>
      </Form>
      <Link to="/" replace>
        go to home
      </Link>
    </Container>
  )
}
