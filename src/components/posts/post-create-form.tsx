'use client'

import {useFormState} from 'react-dom'
import {Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea} from '@nextui-org/react'
import * as actions from '@/src/actions'
import FormButton from "@/src/components/common/form-button";

export default function PostCreateForm() {
    const [formState, action] = useFormState(actions.createPost, {errors: {}})
    return (
        <Popover placement={'left'}>
            <PopoverTrigger>
                <Button color={'primary'}>Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className={'flex flex-col gap-4 p-4 w-80'}>
                        <h3 className={'text-lg'}>Create a Post</h3>
                        <Input
                            name={'title'}
                            label={'Title'}
                            placeholder={'Title'}
                            labelPlacement={'outside'}
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(', ')}
                        />
                        <Textarea
                            name={'content'}
                            label={'Content'}
                            placeholder={'Content'}
                            labelPlacement={'outside'}
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
                        />
                        <FormButton>Create a Post</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}