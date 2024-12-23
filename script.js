const addCartBtn = document.getElementById('add-cart-btn');
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

    const item = itemOnStore.children[1].textContent; // point to h3 tag and the string content
    console.log(item);
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

    const tr = document.createElement('tr');

    rowData = [item, tmp, tmp, tmp];

    rowData.forEach(data => {
        td = document.createElement('td');
        td.textContent = data;
        tr.appendChild(td);
    });

    table.appendChild(tr);
    
}

addCartBtn.addEventListener('click', onAddItemCart);