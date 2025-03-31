'use client'

import StyledToast from '@/components/atoms/toast'
import { Toast } from '@/interfaces/toast'
import { IToastVariant } from '@/interfaces/toast/index'
import React, { createContext, useCallback, useContext, useState } from 'react'

type ShowToast = {
  showToast: (
    message: string,
    variant?: IToastVariant,
    duration?: number,
  ) => void
}

const ToastContext = createContext<ShowToast | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (
      message: string,
      variant: IToastVariant = 'error',
      duration: number = 3000,
    ) => {
      const id = Date.now()
      setToasts((prevToasts) => [...prevToasts, { id, message, variant }])

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, duration)
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {!!toasts.length && (
        <div className="toast-container">
          {toasts.map((toast, index) => (
            <StyledToast
              key={toast.id}
              index={index}
              message={toast.message}
              variant={toast.variant}
              onClick={() =>
                setToasts((prevToasts) =>
                  prevToasts.filter((prevToast) => prevToast.id !== toast.id),
                )
              }
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastContext')
  }
  return context
}
