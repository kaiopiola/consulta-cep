import { connectToDatabase } from "../util/mongodb";

export default function Posts({ posts }) {
    return (
        <div>
            <h1>Posts</h1>

            <ul>
                {posts.map((post) => (
                    <li>
                        <h2>{ post.title }</h2>
                        <p>{ post.content }</p>
                        <a>{ post._id }</a>
                    </li>
                ))}
            </ul>
        </div>
        );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const posts = await db
    .collection("next")
    .find({ status: "1" })
    .sort({ entity_id: -1 })
    .limit(20)
    .toArray();

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
        }
    }
}