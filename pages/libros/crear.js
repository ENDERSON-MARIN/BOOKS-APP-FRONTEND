import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const BookCreate = () => {
  const [bookTitle, setBookTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
        }),
      }
    );

    console.log(res);
  }

  return (
    <>
      <Head>
        <title>Books App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Book Create</h1>
      <p>{bookTitle}</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setBookTitle(e.target.value)}
          value={bookTitle}
          type="text"
        />
        <button>Enviar</button>
      </form>
      <Link href="/libros">Books List</Link>
    </>
  );
};

export default BookCreate;