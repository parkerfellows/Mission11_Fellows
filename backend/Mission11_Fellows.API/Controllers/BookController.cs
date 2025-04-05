using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Fellows.API.Data;

namespace Mission11_Fellows.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookStoreDbContext _context;

        public BookController(BookStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(p => bookTypes.Contains(p.Category));
            }

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = query.Count();

            var results = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(results);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _context.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult Addbook([FromBody] Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
            return Ok(book);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _context.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            _context.Books.Remove(book);
            _context.SaveChanges();
            return Ok(book);
        }
       
    }
}
