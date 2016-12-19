import axios from 'axios';

export async function fetch() {
  const response = await axios.get('http://localhost:3000/api/books');
  const books = response.data.books;
  return { books };
}

export default function Books({ books }) {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book =>
          <li key={book.id}>
            <a href={`/books/view?id=${book.id}`}>{book.title}</a>
          </li>
        )}
      </ul>
    </div>
  );
}
