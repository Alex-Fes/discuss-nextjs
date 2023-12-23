import TopicCreateForm from "@/src/components/topics/topic-create-form";
import TopicList from "@/src/components/topics/topic-list";
import {Divider} from "@nextui-org/react";
import PostList from "@/src/components/posts/post-list";
import {fetchTopPosts} from "@/src/db/queries/posts";

export default async function Home() {
    // const session = await auth() // use in server component

    return (
        <div className={'grid grid-cols-4 gap-4 p-4'}>
            <div className={'col-span-3'}>
                <h1 className={'text-xl m-2'}>Top posts</h1>
                <PostList fetchData={fetchTopPosts} />
            </div>
            <div className={'border shadow py-3 px-2'}>
                <TopicCreateForm/>
                <Divider className={'my-2'}/>
                <h3 className={'text-lg'}>Topics</h3>
                <TopicList/>
            </div>
        </div>
    )
}
