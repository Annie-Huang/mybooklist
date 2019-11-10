// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3434434'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '45545'
            }
        ];

        const books = StoredBooks;

        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            // When you click X, the el.parentElement is
            // <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            // you will need the el.parentElement.parentElement, which gives you a whole row in the table
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        // <div class='alert alert-success'>Whatever the messaage</div>
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        // We want to put the div between the h1 and from
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', e => {
    // console.log(e.target);

    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatliate book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Show success message
        UI.showAlert('Book Added', 'success');

        // Clear fields
        UI.clearFields();
    }
});


// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', e => {
    // console.log(e.target);

    // I think another one to get this work is to give a id for the X, say 'item-1', 'item-2', etc
    // and when you check, you will need to find classname if it contains 'item-' and if found,
    // delete the parentElement's parentElement.
    //
    // Oh, you cannot, if you just adding listener to each row, you will impact performance.
    // You will still have to add it in #book-list. then there is not different if you just
    // check 'delete' class or 'item-x' class
    UI.deleteBook(e.target);

    // Show success message
    UI.showAlert('Book Removed', 'success');
});
