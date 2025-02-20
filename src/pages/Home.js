import Banner from '../components/Banner';

export default function Home() {

    const data = {
        title: "Blog Website",
        content: "Post your blogs here",
        destination: "/blogs",
        buttonLabel: "Browse Blogs"
    }

    return (
        <>
            <Banner data={data}/>
        </>
    )
}