type Values<T> = T[keyof T]
export const actionMessage = {
    LOGIN_FAILED: 'Invalid login credentials',
    REGISTER_INVALID: 'Invalid fields',
    REGISTER_ERROR: 'Registration failed',
    LOGGING_IN: 'Signing in...',
    USER_EXISTS: 'Email already exists',
    USER_CREATED: 'Account created',
    EMAIL_SENT: 'Email verification sent',
    USER_DOESNT_EXIST: 'Email of this user does not exists',
    TOKEN_EXPIRED: 'Your confirmation link is no longer valid',
    TOKEN_DOESNT_EXIST: 'Token for this user does not exists',
    EMAIL_VERIFIED: 'Email verified',
    SOMETHING_WRONG: 'Something went wrong',
} as const

export type actionToastStatus = 'PENDING' | 'SUCCESS' | 'ERROR'

export function actionStatus(status: actionToastStatus, message: Values<typeof actionMessage>) {
    return {
        status,
        message,
    }
}
