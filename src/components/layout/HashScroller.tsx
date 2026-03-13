'use client'
import { useEffect } from 'react'

/**
 * HashScroller — handles #anchor scrolling in Next.js.
 *
 * Problem: next/dynamic + animations cause the native browser anchor scroll
 * to fire before the target element exists in the DOM.
 *
 * Solution: on mount, if the URL contains a hash, poll the DOM every 100ms
 * until the element appears, then smooth-scroll to it.
 */
export function HashScroller() {
    useEffect(() => {
        const hash = window.location.hash.slice(1) // e.g. "bornes"
        if (!hash) return

        let attempts = 0
        const maxAttempts = 50 // poll for up to 5 seconds

        const interval = setInterval(() => {
            const el = document.getElementById(hash)
            if (el) {
                clearInterval(interval)
                // Small extra delay to let any final layout shifts settle
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100)
            } else if (++attempts >= maxAttempts) {
                clearInterval(interval)
            }
        }, 100)

        return () => clearInterval(interval)
    }, [])

    return null
}
