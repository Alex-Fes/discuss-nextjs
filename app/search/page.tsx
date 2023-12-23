import {redirect} from "next/navigation";
import {fetchPostsBySearchTerm} from "@/src/db/queries/posts";
import PostList from "@/src/components/posts/post-list";

interface SearchPageProps {
    searchParams: {
        term: string;
    }
}

export default async function SearchPage({searchParams}: SearchPageProps) {
    const {term} = searchParams

    if (!term) {
        redirect('/')
    }

    return (
        <div>
            <h1>Search results for {term}</h1>
            <div>
                <PostList fetchData={() => fetchPostsBySearchTerm(term)}/>
            </div>
        </div>
    )

}