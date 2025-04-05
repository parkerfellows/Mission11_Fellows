import { useState, useEffect } from 'react'; // Importing React hooks for state and side effects
import { Book } from '../types/Book'; // Importing the Book type definition
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { fetchBooks } from '../api/BooksAPI'; // Importing the API function to fetch books

// Component that displays a list of books, filtered by selected categories
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // State for storing the list of books
  const [books, setBooks] = useState<Book[]>([]);
  // State for controlling how many books to display per page
  const [pageSize, setPageSize] = useState<number>(10);
  // State for tracking the current page number
  const [pageNum, setPageNum] = useState<number>(1);
  // State for storing the total number of books available
  // State for storing the total number of pages
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Effect hook that runs when pageSize, pageNum, or selectedCategories change
  useEffect(() => {
    const loadBooks = async () => {
      // Create URL parameters for category filtering
      // const categoryParams = selectedCategories
      //   .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      //   .join('&');

      // Fetch books from the API with pagination and filtering
      try {
        setLoading(true); // Set loading state to true before fetching
        const data = await fetchBooks(pageSize, pageNum, selectedCategories); // Fetch books from API
        setBooks(data.books); // Update books state with fetched data
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate and update total pages
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };
    loadBooks(); // Call the loadBooks function to fetch data
    // Handle any errors that occur during fetch
    //   const data = await fetchBooks(pageSize, pageNum, selectedCategories);
    //   setBooks(data.books); // Update books state with fetched data
    //   setTotalItems(data.totalNumBooks); // Update total books count
    //   setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate and update total pages
    // };
    // fetchBooks(); // Call the fetch function
  }, [pageSize, pageNum, selectedCategories]); // Dependencies that trigger re-fetch when changed

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <h1>Book List</h1>
      <br />
      {/* Map through the books array and render each book as a card */}
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.isbn}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
            {/* Button to navigate to purchase page with book details in URL */}
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Purchase
            </button>
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      {/* Previous page button - disabled if on first page */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/* Generate page number buttons based on total pages */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1} // Disable the current page button
        >
          {i + 1}
        </button>
      ))}

      {/* Next page button - disabled if on last page */}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      {/* Dropdown to select page size */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value)); // Update page size
            setPageNum(1); // Reset to first page when changing page size
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>
    </>
  );
}

export default BookList; // Export the component for use in other files
