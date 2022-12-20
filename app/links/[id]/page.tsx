async function getLink(linkId: string){
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/links/records/${linkId}`,
        // {
        //     next: {revalidate: 10},
        // }
    );
        const data = await res.json();
        return data;
}

export default async function LinkPage({ params }: any) {
    const link = await getLink(params.id);
    // const links = await getLinks();

    return (
        <div>
            <h1>links/{link.id}</h1>
            <div>
                <h2>{link.shorturl}</h2>
                <h3>{link.url}</h3>
                <h5>{link.created}</h5>
                {/* <h6>{link.expiration}</h6> */}
            </div>            
        </div>
    );
}