import Head from 'next/head'
import Link from 'next/link';

export default function Home() {
  (
    async () => {
      const response = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
          'Content-type': 'applocation/json',
        },
        body: JSON.stringify({ query: '{ users { id, name, color } }' }),
      });
      const json = await response.json();
      console.log( json );
    }
  )();

  return (
    <div className="container">
      <Head>
        <title>Next App With Apollo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Next App With <span>Apollo</span>
        </h1>

        <Link href="/users">
          <a><p className="description">Show all users</p></a>
        </Link>
      </main>
    </div>
  );
}
