import {type MimeTypes} from './mime-types'

type TypedHeaders = RequestInit['headers'] & PreparedHeaders

type PreparedHeaders = Partial<{
  'Content-Type': MimeTypes
  Accept: MimeTypes
  Authorization: `Bearer ${string}`
}>

declare function fetch<ResponseType = any>(
  input: RequestInfo | URL,
  init?: TypedRequestInit
): Promise<TypedResponse<ResponseType>>

type HttpVerbs =
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'UPDATE'
  | 'GET'
  | 'CONNECT'
  | 'HEAD'
  | 'OPTIONS'

type WithBody = Extract<HttpVerbs, 'POST' | 'PUT' | 'DELETE' | 'UPDATE'>
type NonBody = Exclude<HttpVerbs, WithBody>

type MethodBodyCombination =
  | {method?: WithBody; body?: RequestInit['body']}
  | {method?: NonBody; body?: never}

type TypedRequestInit = RequestInit &
  MethodBodyCombination & {headers?: TypedHeaders}

interface TypedResponse<T> extends Response {
  json(): Promise<T>
}
