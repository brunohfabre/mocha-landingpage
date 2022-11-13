import { ButtonHTMLAttributes } from 'react'

import { Text } from '../Text'
import { Container } from './styles'

type ButtonProps = {
  children: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children }: ButtonProps) {
  return (
    <Container>
      <Text size="sm">{children}</Text>
    </Container>
  )
}
