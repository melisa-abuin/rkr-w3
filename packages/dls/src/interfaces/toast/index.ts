export type ToastVariant = 'error' | 'warning' | 'success'

export interface Toast {
  id: number
  variant: ToastVariant
  message: string
}
