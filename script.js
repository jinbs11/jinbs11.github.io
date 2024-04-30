document.addEventListener("DOMContentLoaded", function() {
    var texts = ["Ohjelmoija", "Editori", "Animaattori"];
    var index = 0;
    var changingText = document.getElementById("changing-text");
  
    // Aseta aluksi teksti "Ohjelmoija"
    changingText.textContent = texts[index];
    index++; // Siirry seuraavaan tekstiin
  
    setInterval(function() {
      changingText.textContent = texts[index];
      index = (index + 1) % texts.length;
    }, 2000); // Tekstin vaihtumisen väli 2 sekuntia
});
