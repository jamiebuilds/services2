import axios from 'axios';

export async function fetch({ query }) {
  const response = await axios.get('http://localhost:3000/api/books');
  const book = response.data.books.find(b => b.id === query.id);
  return { book };
}

export default function Books({ book }) {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author} ({book.year})</p>
      <p>{book.description}</p>
      <img src={book.img}/>
    </div>
  );
}
