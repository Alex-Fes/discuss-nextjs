'use client'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Input,
    Textarea,
} from "@nextui-org/react"
import * as actions from "@/src/actions";
import { useFormState } from "react-dom";

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, 5)//we should pass number of arguments here, typescript error
    return (
        <Popover placement={'left'}>
            <PopoverTrigger>
                <Button color={'primary'}>Create Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className={'flex flex-col gap-4 p-4 w-80'}>
                        <h3 className={'text-lg'}>Create a Topic</h3>
                        <Input
                            name={'name'}
                            label={'Name'}
                            labelPlacement={'outside'}
                            placeholder={'Name'}
                        />
                        <Textarea
                            name={'description'}
                            label={'Description'}
                            labelPlacement={'outside'}
                            placeholder={'Describe your topic'}
                        />
                        <Button type={'submit'}>Create</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}