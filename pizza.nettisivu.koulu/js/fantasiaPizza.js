document.addEventListener("DOMContentLoaded", function () {

  let pizzaArray = JSON.parse(localStorage.getItem("pizzaArray"));

  if (!pizzaArray) {
    pizzaArray = [];
  }


  const checkboxes = document.querySelectorAll('.checkbox');
  const pohjaSelectit = document.querySelector('#pohjaSelectit');
  const kokoSelectit = document.querySelector('#kokoSelectit')
  const kastikeSelectit = document.querySelector('#kastikeSelectit')
  const juustoSelectit = document.querySelector('#juustoSelectit')

  const valitutTaytteet = [];

  const perusFantasiaHinta = 10.00

  document.getElementById("fantasiaOstoskoriin").addEventListener('click', function () {
    if (localStorage.getItem("fantasia-maara") > 0) {
      let gluteeniton = "Ei"
      let hinta = 0;
      let valmistumisAika = 7;
      let koko = "Normaali";

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          valitutTaytteet.push(checkbox.id);
        }
      });

      const valittuPohja = pohjaSelectit.options[pohjaSelectit.selectedIndex].value;
      const valittuKoko = kokoSelectit.options[kokoSelectit.selectedIndex].value;
      const valittuKastike = kastikeSelectit.options[kastikeSelectit.selectedIndex].value;
      const valittuJuusto = juustoSelectit.options[juustoSelectit.selectedIndex].value;

      if (valittuKastike == "valkosipuli") {
        valitutTaytteet.push("Valkosipulikastike")
        hinta += 1
      } else {
        valitutTaytteet.push("Normaali kastike")
      }

      if (valittuJuusto == "moz") {
        hinta += 1
        valitutTaytteet.push("Mozzarella juusto")
      } else if (valittuJuusto == "cheddar") {
        hinta += 1
        valitutTaytteet.push("Cheddar juusto")
      }

      if (valittuPohja == "gluteeniton") {
        gluteeniton = "Kyllä"
        valmistumisAika += 3
        hinta += perusFantasiaHinta + 2
      }

      if (valittuKoko == "iso") {
        hinta += 3
        valmistumisAika += 4
        koko = "Iso";
      }

      const tayteMaara = valitutTaytteet.length;
      if (tayteMaara > 0) {
        valmistumisAika += 1
      }

      const kokoPizza = {
        'määrä': Number(localStorage.getItem("fantasia-maara")),
        'nimi': 'Fantasia',
        'koko': koko,
        'paistumisaika': valmistumisAika,
        'gluteeniton': gluteeniton,
        'hinta': (hinta * localStorage.getItem("fantasia-maara") + tayteMaara).toFixed(2),
        'täytteet': valitutTaytteet
      };


      console.log(kokoPizza);
      pizzaArray.push(kokoPizza);
      localStorage.setItem("pizzaArray", JSON.stringify(pizzaArray));
      localStorage.setItem("fantasia-maara", 0)
      location.href = "./pizzanTilausSivu.html"
    }
  });

});
