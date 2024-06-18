import { Box, styled, Text } from '@ignite-call-ui-docs/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',

  marginBottom: '$2',
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$2',
})
