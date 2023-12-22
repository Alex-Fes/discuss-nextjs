'use server'

import {Post} from "@prisma/client";
import {auth} from '@/src/auth';
import {z} from "zod";
import {db} from "@/src/db";
import {revalidatePath} from "next/cache";
import paths from "@/src/paths";
import {redirect} from "next/navigation";

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

export async function createPost(
    slug: string,
    formState: CreatePostFormState,
    formData: FormData): Promise<CreatePostFormState> {
    //validation data
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

//validation user auth
    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to create a post']
            }
        }
    }
//check topic exists before creating post
    const topic = await db.topic.findFirst({
        where: {slug}
    })
    if (!topic) {
        return {
            errors: {_form: ['Topic not found']}
        }
    }

    //create post
    let post: Post
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                topicId: topic.id,
                userId: session.user.id,
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


    revalidatePath(paths.topicShow(slug))
    redirect(paths.postShow(slug, post.id))
}
