'use server'

import * as auth from '@/src/auth'

export async function signIn () {
    return auth.signIn('github')
}

export async function signOut () {
    return auth.signOut()
}