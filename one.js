const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien", price: 250, quantity: 10 },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen", price: 150, quantity: 5 },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 200, quantity: 7 }
];

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) res.status(200).json(book);
    else res.status(404).send('Book not found');
});

app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;
    book.quantity = req.body.quantity;

    res.status(200).json(book);
});

app.delete('/books/:id', (req, res) => {
    const initialLength = books.length;
    books = books.filter(b => b.id !== parseInt(req.params.id));

    if (books.length === initialLength) {
        res.status(404).json({ message: "Book not found" });
    } else {
        res.status(200).json({ message: "Book deleted successfully" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
