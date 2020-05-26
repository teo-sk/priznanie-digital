import fetch from 'isomorphic-unfetch'
import {
  AutoformResponseBody,
  PSCResponseBody,
  SaveEmailResponse,
} from '../types/api'
import { PostponeUserInput } from '../types/PostponeUserInput'
import { TemplateParams } from './sendinblue'
import { translit } from './utils'

export const getCity = async (zip: string) => {
  const response = await fetch(
    `https://api.posta.sk/private/search?q=${zip.replace(/\D/g, '')}&m=zip`,
  )
  const pscData: PSCResponseBody = await response.json()
  return pscData?.offices?.[0]?.name ?? ''
}

export const getAutoformByPersonName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/autoform?name=${name}`).then((response) => response.json())
}

export const getNgoByName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/ngo?name=${name}`).then((response) => response.json())
}

export const saveEmail = async (
  email: string,
  params: TemplateParams,
  file: PostponeUserInput,
): Promise<SaveEmailResponse> => {
  return fetch('/api/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, params, file }),
  }).then((response) => response.json())
}

export const getNace = async () => {
  return fetch(`nace.json`)
    .then((response) => response.json())
    .then((values) => {
      return values.map((item) => ({ ...item, translit: translit(item.label) }))
    })
}
