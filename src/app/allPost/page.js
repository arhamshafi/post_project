import Link from "next/link"

async function page() {

    const allposts = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: { revalidate: 3600 }
    }).then((r) => r.json())

    return (
        <div className="w-full min-h-screen bg-black py-1 px-8 select-none">
            <h1 className="text-center text-white font-bold mt-10 text-3xl tracking-[2px]  "> All Posts </h1>

            <div className=" mt-16 ">
                {
                    allposts.map((ele, idx) => {
                        return (
                            <div key={idx} className="flex justify-start items-center gap-3">
                                <p className="text-white">{idx + 1} :</p>
                                <p className="text-md text-white cursor-pointer hover:text-yellow-300 hover:translate-x-3 w-max transition-all ease-in-out duration-250" >
                                    <Link href={`/article/${ele.id}`}>{ele.title}</Link>
                                </p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default page
