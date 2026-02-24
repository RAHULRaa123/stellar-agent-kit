"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * Try-protocols experience is now on the Protocols page.
 * Redirect so /protocols-ui and old links land on the "Try protocols" tab.
 */
export default function ProtocolsUIPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/protocols#try")
  }, [router])

  return null
}
