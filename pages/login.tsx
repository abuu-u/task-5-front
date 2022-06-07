import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { setName } from '../common/name-helper'
import { nameSchema } from '../common/validation-schemas'
import Input from '../components/input'

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string
  }>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(nameSchema),
  })

  const router = useRouter()

  const handleFormSubmit = (name: string) => {
    setName(name)
    router.push('/send')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => handleFormSubmit(data.name))}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Input
        label="Name"
        margin="normal"
        error={errors.name?.message}
        {...register('name')}
      />
      <Button type="submit" variant="contained">
        Next
      </Button>
    </Box>
  )
}

export default Login
