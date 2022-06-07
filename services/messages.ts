import { getName } from '../common/name-helper'
import { api } from './api'

export interface Message {
  id: number
  senderName: string
  title: string
  body: string
  created: string
}

export interface GetMessagesResponse {
  messages: Message[]
}

export const getMessages = () => {
  const name = getName()

  if (!name) {
    return
  }

  return fetch(`${api}/messages`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + name,
    },
  })
}

export interface SendMessageRequest {
  receiverName: string
  title: string
  body: string
}

export const sendMessage = (data: SendMessageRequest) => {
  const name = getName()

  if (!name) {
    return
  }

  return fetch(`${api}/messages/send`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + name,
    },
    body: JSON.stringify(data),
  })
}
