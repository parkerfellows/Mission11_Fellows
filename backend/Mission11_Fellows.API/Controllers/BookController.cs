﻿using Microsoft.AspNetCore.Http;
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

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1)
        {
            var books = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            var results = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(results);
        }
    }
}
