export interface LoginRequestData {
  phone: string
  password: string
}

export type LoginResponseData = ApiResponseData<{ token: string }>
