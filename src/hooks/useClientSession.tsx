'use client'

import { useSession } from 'next-auth/react'

export function useClientSession() {
  return useSession()
}
