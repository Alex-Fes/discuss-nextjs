import TopicCreateForm from "@/src/components/topics/topic-create-form";

export default async function Home() {
    // const session = await auth() // use in server component

    return (
        <div className={'grid grid-cols-4 gap-4 p-4'}>
            <div className={'col-span-3'}>
                <h1 className={'text-xl m-2'}>Top posts</h1>
            </div>
            <div className={'flex justify-end '}>
                <TopicCreateForm/>
            </div>
        </div>
    )
}
