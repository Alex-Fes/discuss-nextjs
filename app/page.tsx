import {Button} from '@nextui-org/react'
import * as actions from "@/src/actions";
// import {auth} from "@/src/auth";
import Profile from "@/src/components/profile";
import TopicCreateForm from "@/src/components/topics/topic-create-form";

export default async function Home() {
    // const session = await auth() // use in server component

    return (
        <div className={'grid grid-cols-4 gap-4 p-4'}>
            <div className={'col-span-3'}>
                <h1 className={'text-xl m-2'}>Top posts</h1>
            </div>
            <div>
                <TopicCreateForm/>
            </div>
        </div>
    )
}
