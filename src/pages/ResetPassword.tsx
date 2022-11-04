import { useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { z } from 'zod'

import { Flex, Button, Heading } from '@chakra-ui/react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Input } from '../components/Input'
import { api } from '../lib/api'
import { getValidationErrors } from '../utils/getValidationErrors'

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
    <Flex h="100vh" align="center" justify="center">
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <Flex justify="center" mb="6">
          <Heading size="lg" fontWeight="medium">
            Reset password
          </Heading>
        </Flex>

        <Input name="password" type="password" label="password" />

        <Input
          name="confirmPassword"
          type="password"
          label="confirm password"
        />

        <Button type="submit" colorScheme="purple" mt="6">
          reset password
        </Button>

        <Flex mt={8} justify="center">
          <Link to="/" replace>
            go to home
          </Link>
        </Flex>
      </Form>
    </Flex>
  )
}
