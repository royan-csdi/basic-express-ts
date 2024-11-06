import { Router, Request, Response, NextFunction } from "express";
import mathRouter from "./math.routes";
import authRouter from "./auth.routes";
import promoRouter from "./promo.routes";
import articleRouter from "./article.routes";
import tagRouter from "./tag.routes";
import { apikeyValidator, checkAuth, errorHandler } from "../middlewares";
import { v4 as uuid } from "uuid";
import { formatResponse } from "../utils";
import { createError } from "../utils/errors";

const router = Router();

// Start Intermezzo
router.get("/try", (req: Request, res: Response) => {
  res.json({
    message: "We in try route",
  });
});

router.get("/about", (req: Request, res: Response) => {
  const url = req.url;
  res.json({
    message: `We in ${url}`,
  });
});

router.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `get user id: ${id}`,
  });
});

router.get("/users/:id/posts", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    messsage: `get user id: ${id} posts`,
  });
});

// End Intermezzo

// Start Managing Book in Library

// Logging Middleware
const loggingMiddleware = (req: Request, res: Response, next: Function) => {
  console.log(`${req.method}:${req.url}`);
  next();
};

// TODO
// GET /books - Retrieve all books
// POST /books - Add a new book
// PUT /books/:id - Update an existing book
// DELETE /books/:id - Delete a book

// GET /books - Retrieve all books
const books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];

// GET /books - Retrieve all books
router.use(loggingMiddleware);
router.get("/books", (req: Request, res: Response) => {
  res.json(formatResponse(200, "Success", books));
});

// POST /books - Add a new book
router.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;

  if (!title || !author) {
    res.status(400).json(formatResponse(400, "Bad Request", null));
    return;
  }
  const newBook = {
    id: uuid(),
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(formatResponse(201, "Success", newBook));
});

// PUT /books/:id - Update an existing book
router.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], title, author };
    res.json(formatResponse(200, "Success", books[bookIndex]));
  } else {
    res.json(formatResponse(404, "Book not found", null));
  }
});
// DELETE /books/:id - Delete a book
router.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json(formatResponse(200, "Success", null));
  } else {
    res.json(formatResponse(404, "Book not found", null));
  }
});

// Working with Query and URL Parameter

// GET /books?author=George Orwell - Retrieve all books by author
router.get("/books/search", (req: Request, res: Response) => {
  const { author } = req.query;

  const filteredBooks = books.filter((b) =>
    b.author.includes(author as string)
  );
  if (filteredBooks.length > 0) {
    res.json(formatResponse(200, "Success", filteredBooks));
  } else {
    res.json(formatResponse(404, "Book not found", null));
  }
});

// GET /books/:id - get a single book
router.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(formatResponse(200, "Success", book));
  } else {
    res.json(formatResponse(404, "Book not found", null));
  }
});

// how to prove error handler in postman
// POST /books - Add a new book
router.post("/books/error", (req: Request, res: Response) => {
  res.status(500).json(formatResponse(500, "Internal Server Error", null));
});

// End Managing Book in Library

router.get(
  "/error-example",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      throw createError("Something went wrong", 500);
    } catch (error) {
      next(error);
    }
  }
);

router.use("/math", apikeyValidator, mathRouter);

router.use("/auth", authRouter);
router.use("/promo", promoRouter);
router.use("/article", articleRouter);
router.use("/tag", tagRouter);

export default router;
