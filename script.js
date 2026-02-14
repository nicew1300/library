function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

function createBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let year = document.getElementById('year').value;

    let book = new Book(title, author, year);
    console.log(book);
}

// Make modal popup when button is clicked
let modal = document.getElementById('myModal');
let btn = document.getElementById('myBtn');
let span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}