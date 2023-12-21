'use server'
import {z} from 'zod'

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z0-9-]+$/, {message: 'Must be lowercase letters, numbers, and dashes only'}),
    description: z.string().min(10),
})

interface CreateTopicFormState {
    errors: {
        name?: string[]
        description?: string[]
    }

}

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    //todo: revalidate the homepage
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    return {
        errors: {}
    }
}