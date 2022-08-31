class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}


// UI
class UI {
    // Add book
    addToBookList(book) {
        // Get table body element
        const list = document.getElementById('book-list');

        // create table row element
        const row = document.createElement('tr');
        
        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }

    // Show alert
    showAlert(message, className) {
        // create div
        const div = document.createElement('div');
        // Add class
        div.className = `alert ${className}`;
        // Add text node
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');

        // Insert alert
        container.insertBefore(div, form);

        // make alert disappear after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete book
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    // Clear fields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


// Event Listener for Add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;


    // Instatiate Book
    const book = new Book(title, author, isbn);

    

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Alert
        ui.showAlert('Please fill all fields', 'error')

    } else {

        // Add book to list
        ui.addToBookList(book);

        // Show success alert
        ui.showAlert('Book added successfully', 'success');

        // clear input fields
        ui.clearFields();

        ui.deleteBook(e.target);

    }

    e.preventDefault();
});



// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show alert
    ui.showAlert('Book Removed!!!', 'success');

    e.preventDefault();
});