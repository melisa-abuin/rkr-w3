export type ToastVariant = 'error' | 'warning'

export interface Toast {
  id: number
  variant: ToastVariant
  message: string
}
