import * as yup from 'yup'

const requiredText = 'Field is required'

export const nameSchema = yup.object().shape({
  name: yup.string().min(1, requiredText).required(requiredText),
})

export const sendSchema = yup.object().shape({
  receiverName: yup.string().min(1, requiredText).required(requiredText),
  title: yup.string().min(1, requiredText).required(requiredText),
  body: yup.string().min(1, requiredText).required(requiredText),
})
