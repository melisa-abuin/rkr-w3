export type IToastVariant = 'error' | 'warning'

export interface Toast {
  id: number
  variant: IToastVariant
  message: string
}
