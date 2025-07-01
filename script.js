const library = [];

class Book {
    constructor(title, author, read, pages) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.read = read;
        this.pages = pages;
    }

    toggleRead = () => {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, read, pages) {
    const newBook = new Book(title, author, read, pages);
    library.push(newBook);
}

addBookToLibrary("No Longer Human", "Osamu Dazai", true, 177);
addBookToLibrary("Atomic Habits", "James Clear", false, 319);
addBookToLibrary("1984", "George Orwell", false, 368);

const booksContainer = document.getElementById("books-container")
const modalElement = document.getElementById("modal");
const formElement = document.getElementById("add-book-form");

function displayBooks() {
    booksContainer.innerHTML = "";
    for(let i = 0; i < library.length; i++) {
        const book = library[i];
        booksContainer.innerHTML += `
        <div class="book-card">
            <h2 class="book-title-text">${book.title}</h2>
            <p class="author-text card-sub-text">${book.author}</p>
            <p class="card-sub-text">${book.pages} page(s)</p>
            <div class="book-action-btns">
                <button data-id="${book.id}" class="toggle-read-btn opaque-hover ${book.read ? "btn-read" : "btn-not-read"}" type="button">${book.read ? "Read" : "Not read yet"}</p>
                <button data-id="${book.id}" class="delete-book-btn opaque-hover" type="button"><img src="trashcan.svg" width="30" height="30"></button>
            </div>
        </div>
        `;
    }

    attachListeners();
    
}

function attachListeners() {
    const deleteBookBtns = document.querySelectorAll(".delete-book-btn");
    deleteBookBtns.forEach((button) => {
        button.addEventListener("click", () => {
            const index = getIndexById(button.dataset.id);
            library.splice(index, 1);
            displayBooks();
        });
    });

    const toggleReadBtns = document.querySelectorAll(".toggle-read-btn");
    toggleReadBtns.forEach((button) => {
        button.addEventListener("click", () => {
            const index = getIndexById(button.dataset.id);
            const book = library[index];
            book.toggleRead();
            displayBooks();
        });
    });
}

function getIndexById(id) {
    for(let i = 0; i < library.length; i++) {
        if(library[i].id == id) {
            return i;
        }
    }
    return false;
}

function displayAddBookModal() {
    addModalListeners();
    modalElement.showModal();
}

function addModalListeners() {
    document.querySelectorAll(".blur-validation").forEach((inputElement) => {
        inputElement.addEventListener("blur", () => {
            if(inputElement.checkValidity()) {
                inputElement.setCustomValidity("");
                return;
            }
            if(inputElement.rangeUnderflow) {
                inputElement.setCustomValidity("Number of pages must be a positive number");
            } else if (inputElement.valueMissing) {
                inputElement.setCustomValidity("Please enter the required field");
            }

            inputElement.classList.add("invalid-input")
            inputElement.reportValidity(); 
        });
    });
}

function handleSubmitAddBook(event) {
    event.preventDefault();

    const formData = new FormData(formElement);
    const bookTitle = formData.get("title")
    const bookAuthor = formData.get("author");
    const pageNumber = parseInt(formData.get("page-number"));
    const read = formData.get("read") === "1" ? true : false;
    
    addBookToLibrary(bookTitle, bookAuthor, read, pageNumber)
    displayBooks();

    modalElement.close();
    formElement.reset();
}

document.addEventListener("DOMContentLoaded", () => {
    displayBooks();

    document.getElementById("add-btn").addEventListener("click", displayAddBookModal)
    document.getElementById("close-modal").addEventListener("click", () => {
        modalElement.close();
    });
    document.getElementById("add-book-form").addEventListener("submit", (event) => handleSubmitAddBook(event));
    
});