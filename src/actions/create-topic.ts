'use server'
import {z} from 'zod'
import {auth} from "@/src/auth";
import type {Topic} from "@prisma/client";
import {db} from "@/src/db";
import {redirect} from "next/navigation";
import paths from "@/src/paths";
import {revalidatePath} from "next/cache";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z0-9-]+$/, {message: 'Must be lowercase letters, numbers, and dashes only'}),
    description: z.string().min(10),
})

interface CreateTopicFormState {
    errors: {
        name?: string[]
        description?: string[]
        _form?: string[]
    }

}

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to create a topic']
            }
        }
    }

    let topic: Topic
    try {
         topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }

    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))

    return {
        errors: {}
    }
}