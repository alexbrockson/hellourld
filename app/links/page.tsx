import Link from 'next/link'

async function getLinks() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/links/records?page=1&perPage=30',
        { cache: 'no-store'}
    );
    const data = await res.json();
    console.log(data);
    return data?.items as any[];
}

export default async function LinksPage() {
    const links = await getLinks();
    // const links = LINKS;

    return(
        <div>
            <h1>Links</h1>
            <div>
                {links?.map((link) => {
                    return <Lnk key={link.id} link={link} />;
                })}
            </div>
        </div>
    )
}

function Lnk({ link }: any) {
    const { id, url, shorturl, created, expiration } = link || {};

    return (
        <Link href={`/links/${id}`}>
            <div>
                <h2>{shorturl}</h2>
                <h4>{url}</h4>
                <p>{created}</p>
                <p>{expiration}</p>
            </div>
        </Link>
    );
}