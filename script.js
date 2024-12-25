const addCartBtn = document.querySelectorAll('.add-to-cart-btn');
const itemOnStore = document.getElementById('item');
const table = document.querySelector('table');

function getCartFromStorage() {
    let cartFromStorage; // assign a variable to contain array

    if (localStorage.getItem('cart') === null) {
        console.log("empty");
        cartFromStorage = [];  // returns an empty array 
    } else  {   
        cartFromStorage = JSON.parse(localStorage.getItem('cart')); // convert local storage data (string) to array and store to variable
    }
    return cartFromStorage; //returns array
}

function onAddItemCart(e) {
    e.preventDefault(); // prevent form submission

    const item = e.target.parentElement.children[1].textContent; 
    addCartToStorage(item) // add string to storage
    addCartToDOM(item); // add to DOM

}

function addCartToStorage(item) { // arg accepts a string
    const itemOnCart = getCartFromStorage(); // an array of cart from storage
    itemOnCart.push(item); // push string to array of cart
    localStorage.setItem('cart', JSON.stringify(itemOnCart)); // convert to string before storing
}

function addCartToDOM(item) { // arg accepts a string
    const tmp = "xx";

    const tr = document.createElement('tr'); // create table row element

    rowData = [item, tmp, tmp, tmp];         // create array of data to be stored 

    rowData.forEach(data => {                // iterate over each data
        td = document.createElement('td');   // create a table data to insert each data
        td.textContent = data;               // insert text content of each data
        tr.appendChild(td);                  // append table data to table row
    });

    table.appendChild(tr);                   // append table row to table itself
    
}

addCartBtn.forEach(cartBtn => {
    cartBtn.addEventListener('click', onAddItemCart);
})
