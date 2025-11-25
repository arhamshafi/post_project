"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'


function Search() {

    const [srch, setsrch] = useState("")
    const [post, setpost] = useState("")
    const [data, setdata] = useState("")
    console.log(post);


    const handler = (e) => {
        setsrch(e.target.value)
        setdata(srch ? post.filter(ele =>
            ele.title.toLowerCase().includes(srch) || ele.body.toLowerCase().includes(srch)
        ) : [])
    }

    const fetch_data = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            cache: "no-store"
        }).then((r) => r.json())
        setpost(res)
    }

    useEffect(() => {
        fetch_data()
    }, [srch])



    return (
        <>
            <input
                type="text"
                value={srch}
                className="w-full rounded-xl bg-white px-4 outline-none h-8"
                placeholder="Search Post Here ..."
                onChange={handler}
            />

            {srch && (
                <div className="w-full bg-white text-black mt-2 rounded-md max-h-[500px] overflow-y-auto p-2">
                    {data.length > 0 ? (
                        data.map((p, i) => (
                            <p key={i} className="text-sm py-1 border-b last:border-none hover:bg-gray-200 px-3 text-center hover:scale-103 transition-all ease-in-out duration-150 ">
                                <Link href={`/article/${p.id}`} >{p.title}</Link>
                            </p>
                        ))
                    ) : (
                        <p className="text-sm">No results found</p>
                    )}
                </div>
            )}
        </>
    )
}

export default Search
