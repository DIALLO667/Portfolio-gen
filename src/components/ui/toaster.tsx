"use client"

import * as React from "react"
import { Toast, ToastDescription, ToastTitle, ToastProvider, ToastViewport } from "@/components/ui/toast"

type ToastProps = {
  title: string
  description?: string
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void
} | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}

export function ToastProviderCustom({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = (props: ToastProps) => setToasts((prev) => [...prev, props])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {toasts.map((t, i) => (
          <Toast key={i}>
            <ToastTitle>{t.title}</ToastTitle>
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
