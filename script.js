const myLibrary = []
const addBtn = document.querySelector(".add")
const modal = document.querySelector("dialog")
const content = document.querySelector(".content")

addBtn.addEventListener("click", () => {
    modal.showModal()
})

// close the modal if clicked outside, i got this from web dev simplified dialog element tutorial
modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

const form = document.querySelector("form")

form.addEventListener("submit", createBook)

function Book(titleInput, authorInput, pagesInput, status) {
    this.title = titleInput;
    this.author = authorInput;
    this.pages = pagesInput;
    this.status = false;
    this.id = crypto.randomUUID()
}


function createBook(e) {
    // prevent page refresh
    e.preventDefault();

    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const pagesInput = document.querySelector('#pages').value;

    const book = new Book(titleInput, authorInput, pagesInput);
    myLibrary.push(book)
    
    displayBook(book)
 
    document.querySelector('form').reset(); // Clears the inputs
    modal.close();

}

function displayBook(book) {
    const bookDiv = document.createElement("div")
    bookDiv.classList.add("book")

    const bookTitleDiv = document.createElement("div")
    bookTitleDiv.classList.add("book-title")
    bookTitleDiv.textContent = book.title
    bookDiv.appendChild(bookTitleDiv)

    const bookAuthorDiv = document.createElement("div")
    bookAuthorDiv.classList.add("book-author")
    bookAuthorDiv.textContent = `by ${book.author}`
    bookDiv.appendChild(bookAuthorDiv)

    const bookPagesDiv = document.createElement("div")
    bookPagesDiv.classList.add("book-pages")
    bookPagesDiv.textContent = `${book.pages} pages`
    bookDiv.appendChild(bookPagesDiv)

    const bookStatusBtn = document.createElement("button")
    bookStatusBtn.setAttribute("type", "button")
    bookStatusBtn.textContent = "Did you read it?"
    bookStatusBtn.addEventListener("click", (event) => toggleReadStatus(event))
    bookDiv.appendChild(bookStatusBtn)

    const bookRemoveBtn = document.createElement("button")
    bookRemoveBtn.setAttribute("type", "button")
    bookRemoveBtn.textContent = "Remove >:("
    bookRemoveBtn.classList.add("remove-button")
    bookDiv.appendChild(bookRemoveBtn)

    //very important line for removing books! makes sure that the element in the HTML itself has the id
    bookDiv.id = book.id

    content.appendChild(bookDiv)
    bookRemoveBtn.addEventListener("click", (event) => removeBook(bookDiv))
}

function removeBook(bookDiv) {
    ///* finds the index of the object in myLibrary that has this book's id
    const index = myLibrary.findIndex(item => item.id === bookDiv.id)

    if (index !== -1) { // only splice array when item is found
        myLibrary.splice(index, 1); // 2nd parameter means remove one item only

        // now remove it from the DOM
        bookDiv.remove()
    }
}

function toggleReadStatus(e) {
    // takes the closest class to event, basically take the closest element with the .book class that is closes to the element
    const bookDiv = e.target.closest('.book');
    const btn = e.target;

    // toggle the class on the card itself
    bookDiv.classList.toggle('read');

    // change the button text based on the state
    if (bookDiv.classList.contains('read')) {
        btn.textContent = 'I read this already :)';
    } else {
        btn.textContent = "I didn't read it yet :(";
    }
}