import { z } from 'zod'
import { type AxiosInstance } from 'axios'

import { createPomoSchema } from './schema'
import apiServerCall from '@/lib/external-api'

export class Services {
    private static operation: Promise<AxiosInstance>

    private constructor() {}

    public static async getApiIntance(token: string) {
        Services.operation = apiServerCall(token)
        return Services.operation
    }

    public static async createData(data: z.infer<typeof createPomoSchema>) {
        const action = await Services.operation
        const response = await action.post('/api/v1/user', data)
        return response
    }

    public static async getData(page?: number) {
        const action = await Services.operation
        const response = await action.get(`/api/v1/user?page=${page ? page : 1}`)
        return response
    }

    public static async updateDataById(id: string) {
        const action = await Services.operation
        const response = await action.patch('/api/v1/user', { id })
        return response
    }
}
