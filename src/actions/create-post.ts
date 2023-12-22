'use server'

import {Post} from "@prisma/client";
import {auth} from '@/src/auth';
import {z} from "zod";
import {db} from "@/src/db";
import {revalidatePath} from "next/cache";
import paths from "@/src/paths";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
})

interface CreatePostFormState {
    errors: {
        title?: string[]
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
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
                _form: ['You must be signed in to create a post']
            }
        }
    }

    let post: Post
    // try {
    //     post = await db.post.create({
    //         data: {
    //             title: result.data.title,
    //             content: result.data.content,
    //             topic: {
    //                 connect: {
    //                     slug: formData.get('topicSlug') as string,
    //                 }
    //             },
    //         }
    //     })
    // } catch (error: unknown) {
    //     if (error instanceof Error) {
    //         return {
    //             errors: {
    //                 _form: [error.message]
    //             }
    //         }
    //     } else {
    //         return {
    //             errors: {
    //                 _form: ['Unknown error']
    //             }
    //         }
    //     }
    // }

    revalidatePath(paths.topicShow(formData.get('topicSlug') as string))

    return {
        errors: {}
    }

    //todo: revalidate the topic show page
}
