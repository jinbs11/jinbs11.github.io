var popupWrapper = document.querySelector(".popup-wrapper");
var popup = document.getElementById("popup");

function openPopup() {
  popupWrapper.style.display = "block";
  popup.classList.add("open-popup");
}

function closePopup() {
  popupWrapper.style.display = "none";
  popup.classList.remove("open-popup");
}
