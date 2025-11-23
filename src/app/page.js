import Link from "next/link";

export default async function Home() {

  const post = await fetch("https://jsonplaceholder.typicode.com/posts",
    { next: { revalidate: 3600 } }
  ).then((r) => r.json());

  // console.log(post);

  const feature_post = post.slice(0, 10)
  // console.log(feature_post);


  return (
    <div className="w-full min-h-screen bg-black py-1 px-8 select-none">
      <h1 className="text-center text-white font-bold mt-10 text-3xl tracking-[2px]  ">Post API</h1>
      <h1 className=" text-2xl mt-10 text-center tracking-[10px] text-yellow-400" > Feature Post </h1>

      <div className=" mt-16 ">
        {
          feature_post.map((ele, idx) => {
            return (
              <p
                key={idx}
                className="text-md text-white cursor-pointer hover:text-yellow-300 hover:translate-x-3 w-max transition-all ease-in-out duration-250"
              >
                <Link href={`/article/${ele.id}`}>{ele.title}</Link>
              </p>
            )
          })
        }
      </div>

      <p className="text-md text-white/30 mt-10 hover:text-white/20 cursor-pointer "> <Link href={"/allPost"} >See More ...</Link> </p>


    </div>
  );
}
