import type { NextPage } from 'next'
import MainLayout from '../components/layouts/main-layout'
import Message from '../components/message'
import useMessages from '../hooks/use-messages'

const Home: NextPage = () => {
  const { messages } = useMessages()

  return (
    <MainLayout>
      {messages &&
        messages.length > 0 &&
        messages.map(({ id, senderName: sender, title, body }) => (
          <Message key={id} sender={sender} title={title} body={body} />
        ))}
    </MainLayout>
  )
}

export default Home
