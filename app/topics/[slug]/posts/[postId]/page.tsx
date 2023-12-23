import Link from "next/link";
import PostShow from "@/src/components/posts/post-show";
import CommentList from "@/src/components/comments/comment-list";
import CommentCreateForm from "@/src/components/comments/comment-create-form";
import paths from "@/src/paths";
import {fetchCommentsByPostId} from "@/src/db/queries/comments";

interface PostShowPageProps {
    params: {
        slug: string;
        postId: string;
    };
}

export default async function PostShowPage({params}: PostShowPageProps) {
    const {slug, postId} = params;

    return (
        <div className="space-y-3">
            <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
                {"< "}Back to {slug}
            </Link>
            <PostShow postId={postId}/>
            <CommentCreateForm postId={postId} startOpen/>
            <CommentList postId={postId}/>
        </div>
    );
}
