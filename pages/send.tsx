import { yupResolver } from '@hookform/resolvers/yup'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendSchema } from '../common/validation-schemas'
import Input from '../components/input'
import MainLayout from '../components/layouts/main-layout'
import { NextLinkComposed } from '../components/link'
import useMessages from '../hooks/use-messages'
import { sendMessage, SendMessageRequest } from '../services/messages'
import { getNames } from '../services/users'

const Send: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendMessageRequest>({
    defaultValues: {
      receiverName: '',
      title: '',
      body: '',
    },
    resolver: yupResolver(sendSchema),
  })

  useMessages()

  const router = useRouter()

  const [options, setOptions] = useState([])

  const timeout = useRef<NodeJS.Timeout>()

  const handleFormSubmit = async (data: SendMessageRequest) => {
    await sendMessage(data)

    router.push('/')
  }

  const { onChange, ...restRegister } = register('receiverName')

  const handleReceiverChange = (
    event_: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    clearTimeout(timeout.current)

    const { value } = event_.currentTarget

    if (!value) {
      return setOptions([])
    }

    setValue('receiverName', value, { shouldValidate: true })

    timeout.current = setTimeout(async () => {
      const response = await getNames(value)
      const names = await response.json()

      setOptions(names)
    }, 1000)
  }

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(async (data) => await handleFormSubmit(data))}
      >
        <Autocomplete
          options={options}
          freeSolo
          renderInput={({
            InputLabelProps: { onChange, ...restInputLabelProperties },
            ...restParameters
          }) => {
            return (
              <Input
                label="Receiver"
                variant="filled"
                onChange={(event_) => {
                  onChange?.(event_ as unknown as FormEvent<HTMLLabelElement>)
                  handleReceiverChange(event_)
                }}
                sx={{ mb: 2 }}
                InputLabelProps={restInputLabelProperties}
                {...restParameters}
                {...restRegister}
                error={errors.receiverName?.message}
              />
            )
          }}
        />
        <Input
          label="Title"
          variant="filled"
          sx={{ mb: 2 }}
          fullWidth
          {...register('title')}
          error={errors.title?.message}
        />
        <Input
          label="Body"
          variant="filled"
          sx={{ mb: 2 }}
          fullWidth
          multiline
          rows={10}
          {...register('body')}
          error={errors.body?.message}
        />
        <Button
          sx={{ mr: 2 }}
          component={NextLinkComposed}
          to="/"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </MainLayout>
  )
}

export default Send
