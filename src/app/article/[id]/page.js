

export async function generateStaticParams() {

    const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: { revalidate: 3600 }

    }).then((r) => r.json())
    //  cahce kha save hota ha or max kitna data save kr sakty hain  ?

    return posts.slice(0, 20).map(post => (
        { id: post.id.toString() }
    ))
}

// cahche memeory kha save hoti hoti ha 

async function page({ params }) {

    const { id } = await params

    const post = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { next: { revalidate: 3600 } }
    ).then((r) => r.json());

    const user = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`,
        { next: { revalidate: 3600 } }
    ).then((r) => r.json());

    return (
        <div className=" w-full min-h-screen bg-black text-white flex justify-center items-center flex-col gap-5 select-none" >
            <h1 className="text-2xl font-bold text-yellow-500" >{post.title}</h1>
            <p style={{ color: '#666', fontStyle: 'italic' }}  >
                By {user.name} | Post #{post.id}
            </p>
            <p style={{ lineHeight: '1.6' }} className="w-1/2 text-center" >{post.body}</p>
        </div>
    )
}

export default page
