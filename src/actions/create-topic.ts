'use server'
import { z } from 'zod'

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z0-9-]+$/, {message: 'Must be lowercase letters, numbers, and dashes only'}),
    description: z.string().min(10),
})
export async function createTopic(formState: number, formData: FormData) {
    //todo: revalidate the homepage
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors)
    }

    return 10 // we should return number, typescript error
}