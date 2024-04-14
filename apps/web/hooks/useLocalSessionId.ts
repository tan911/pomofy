'use client'

import { useState, useEffect } from 'react'
import { Services } from '../app/dashboard/_actions/task-action'

// For token, it should be pass here and save on local storage for subsequent request to external api
// TODO: I think theres a better solution for this but for now this workaround is working as intended.
export default function useLocalSessionId(token: string) {
    const [localToken, setLocalToken] = useState('')

    if (token) {
        Services.getApiIntance(token)
    } else {
        Services.getApiIntance(localToken)
    }

    useEffect(() => {
        let getCurrentToken: string

        if (typeof window !== 'undefined') {
            getCurrentToken = window.localStorage.getItem('token') ?? ''

            // set new token
            if (token) {
                window.localStorage.setItem('token', token as string)
            }

            getCurrentToken = window.localStorage.getItem('token') ?? ''

            if (getCurrentToken) {
                setLocalToken(getCurrentToken)
            }
        }
    }, [])

    return { localToken }
}
