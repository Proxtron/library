const library = [];

function Book(title, author, read, pages) {
    if(!new.target) {
        throw new Error("Must use new keyword to create book objects");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
}

function addBookToLibrary(title, author, read, pages) {
    const newBook = new Book(title, author, read, pages);
    library.push(newBook);
}

addBookToLibrary("No Longer Human", "Osamu Dazai", true, 177);
addBookToLibrary("Atomic Habits", "James Clear", false, 319);
addBookToLibrary("1984", "George Orwell", false, 368);
console.log(library);