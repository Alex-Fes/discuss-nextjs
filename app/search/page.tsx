import {redirect} from "next/navigation";

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
        </div>
    )

}