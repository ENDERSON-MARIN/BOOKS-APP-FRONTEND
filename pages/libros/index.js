import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      books: data,
    },
  };
}

const BookList = ({ books }) => {
  async function handleDelete(e, bookId) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _method: "DELETE",
        }),
      }
    );

    if (res.ok) {
      window.location.href = "/libros";
    }
  }

  return (
    <>
      <Head>
        <title>Books App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <pre>{JSON.stringify(books)}</pre> */}
      <h1>Libros Component</h1>
      <ul>
        {books.map((book) => (
          <li key={`book-${book.id}`}>
            <Link href={`/libros/${book.id}`}>{book.title}</Link>
            {" - "}
            <Link href={`/libros/${book.id}/editar`}>Editar</Link>
            {" - "}
            <form
              onSubmit={(e) => handleDelete(e, book.id)}
              style={{ display: "inline" }}
            >
              <button>Eliminar</button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/libros/crear">Create Book</Link>
    </>
  );
};

export default BookList;
