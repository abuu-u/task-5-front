import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getMessages, GetMessagesResponse, Message } from '../services/messages'

const fetchMessages = async (
  onSuccess: (messages: Message[]) => void,
  onError: () => void,
) => {
  const response = await getMessages()

  if (!response) {
    onError()

    return
  }

  if (response.status === 200) {
    onSuccess(((await response.json()) as GetMessagesResponse).messages)
  }
}

const useMessages = () => {
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>()

  useEffect(() => {
    const fetchOrRedirect = () =>
      fetchMessages(setMessages, () => router.push('/login'))

    fetchOrRedirect()

    const interval = setInterval(fetchOrRedirect, 5000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { messages }
}

export default useMessages
