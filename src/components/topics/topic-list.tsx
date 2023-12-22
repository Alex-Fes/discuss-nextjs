import {db} from "@/src/db";
import Link from "next/link";
import paths from "@/src/paths";
import {Chip} from "@nextui-org/chip";


export default async function TopicList() {
    const topics = await db.topic.findMany()

    const renderTopics = topics.map(topic => {
        return <div key={topic.id}>
            <Link  href={paths.topicShow(topic.slug)}>
                <Chip color={'warning'} variant={'shadow'}>
                    {topic.slug}
                </Chip>
            </Link>
        </div>
    })

    return <div className={'flex flex-row flex-wrap gap-2'}>
        {renderTopics}
    </div>
}