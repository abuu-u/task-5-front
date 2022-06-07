import { api } from './api'

export const getNames = (name: string) => {
  return fetch(`${api}/users/?search=${name}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
}
