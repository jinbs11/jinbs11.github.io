// update the total price
updateTotalPrice();

// function to update the total price element
function updateTotalPrice() {
  var totalPrice = 0;

  // get the pizza prices and quantities from LocalStorage
  var pizza1Price = Number(localStorage.getItem("pizza1Hinta"));
  var pizza1Quantity = Number(localStorage.getItem("pizza1Kpl"));

  var pizza2Price = Number(localStorage.getItem("pizza2Hinta"));
  var pizza2Quantity = Number(localStorage.getItem("pizza2Kpl"));

  var pizza3Price = Number(localStorage.getItem("pizza3Hinta"));
  var pizza3Quantity = Number(localStorage.getItem("pizza3Kpl"));

  var pizza4Price = Number(localStorage.getItem("pizza4Hinta"));
  var pizza4Quantity = Number(localStorage.getItem("pizza4Kpl"));

  var pizza5Price = Number(localStorage.getItem("pizza5Hinta"));
  var pizza5Quantity = Number(localStorage.getItem("pizza5Kpl"));

  var pizza6Price = Number(localStorage.getItem("pizza6Hinta"));
  var pizza6Quantity = Number(localStorage.getItem("pizza6Kpl"));

  var pizza7Price = Number(localStorage.getItem("pizza7Hinta"));
  var pizza7Quantity = Number(localStorage.getItem("pizza7Kpl"));

  var pizza8Price = Number(localStorage.getItem("pizza8Hinta"));
  var pizza8Quantity = Number(localStorage.getItem("pizza8Kpl"));

  // calculate the total price
  totalPrice +=
    pizza1Price * pizza1Quantity +
    pizza2Price * pizza2Quantity +
    pizza3Price * pizza3Quantity +
    pizza4Price * pizza4Quantity +
    pizza5Price * pizza5Quantity +
    pizza6Price * pizza6Quantity +
    pizza7Price * pizza7Quantity +
    pizza8Price * pizza8Quantity;

  // update the total price element
  document.getElementById("total-price").innerHTML = totalPrice.toFixed(2);
  document.getElementById("tilausLista").innerHTML = localStorage.getItem("pizzaArray");
}