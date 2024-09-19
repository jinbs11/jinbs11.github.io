document.addEventListener("DOMContentLoaded", onkoKirjautunut); // Tämä tapahtumankäsittelijä rekisteröidään ajettavaksi, kun DOM on valmis

let pizzaArray = JSON.parse(localStorage.getItem("pizzaArray"));

if (!pizzaArray) {
  pizzaArray = [];
}

const pizzahinnat = {
  ['liha']: 12.50,
  ['hawaii']: 11.00,
  ['juusto']: 11.30,
  ['kasvis']: 16.80,
  ['bbq']: 11.20,
  ['tulinen']: 12.75,
  ['pepperoni']: 10.50,
  ['Fantasia']: 10.00
}

const pizzojenOikeatNimet = {
  kasvis: 'Vihreä keidas',
  bbq: 'BBQ Kana',
  juusto: 'Juustolampi',
  tulinen: 'Tulinen tulivuori',
  pepperoni: 'Pepperoni',
  liha: 'Lihaisa herkku',
  hawaii: 'Hawaii'
};

// Funktio, joka tarkistaa, onko käyttäjä kirjautunut ja piilottaa / näyttää sivuston osia sen mukaan
function onkoKirjautunut() {

  // Jos käyttäjä on kirjautunut sisään, näytä käyttäjänimi ja kirjaudu ulos -nappi
  if (localStorage.getItem("kirjautunut") === "kyllä") {

    document.getElementById("käyttäjäNimiOikealaita").style.display = "";
    document.getElementById("käyttäjäNimiOikealaita").innerHTML = localStorage.getItem("kayttajanimi")

    document.getElementById("kirjauduNappi").style.display = "none";
    document.getElementById("rekisteroiNappi").style.display = "none";

    document.getElementById("kirjauduUlosNappi").style.display = "";
  }

  // Jos käyttäjä ei ole kirjautunut sisään, piilota käyttäjänimi ja kirjaudu ulos -nappi
  else {
    document.getElementById("kirjauduUlosNappi").style.display = "none";
    document.getElementById("käyttäjäNimiOikealaita").style.display = "none";
  }
}

// Funktio, joka tallentaa käyttäjänimen, salasanan ja kirjautumistilan localStorageen rekisteröintilomakkeelta
function rekisteroi() {
  let nimi = document.getElementById("kayttajanimi").value;
  let salasana = document.getElementById("salasana").value;

  if (nimi && salasana) { // Katsoo jos nimi ja salasana kohdat eivät ole tyhjiä.
    localStorage.setItem("kayttajanimi", nimi)
    localStorage.setItem("salasana", salasana)
    localStorage.setItem("kirjautunut", "kyllä")
    window.location.href = "index.html";
  }
}

// Funktio, joka tarkistaa käyttäjänimen ja salasanan localStoragesta ja kirjaa käyttäjän sisään, jos tiedot ovat oikein
function kirjaudu() {
  let kirjautumisNimi = document.getElementById("kayttajanimi").value;
  let kirjautumisSalasana = document.getElementById("salasana").value;
  let virheilmoitus = document.getElementById("virheilmoitus");

  if (kirjautumisNimi.toLowerCase() === localStorage.getItem("kayttajanimi").toLowerCase() && kirjautumisSalasana === localStorage.getItem("salasana")) {
    localStorage.setItem("kirjautunut", "kyllä")
    window.location.replace("index.html");
  }
  else {
    virheilmoitus.textContent = "Käyttäjänimi tai salasana on väärin.";
  }
}

// Käsittelee "kirjaudu ulos" -toimintoa.
function ulos() {
  // Asetetaan "kirjautunut" -avaimen arvoksi "ulos" LocalStorageen.
  localStorage.setItem("kirjautunut", "ulos")

  // Piilotetaan käyttäjän nimi ja kirjaudu ulos -nappi.
  document.getElementById("kirjauduUlosNappi").style.display = "none";
  document.getElementById("käyttäjäNimiOikealaita").style.display = "none";

  // Näytetään sen sijaan kirjaudu- ja rekisteröi-napit.
  document.getElementById("kirjauduNappi").style.display = "";
  document.getElementById("rekisteroiNappi").style.display = "";
}

function tarkistaSahkoposti() {
  const sahkopostiInput = document.getElementById('email'); //Haetaan sähköposti

  // virheilmoitus muuttuja
  const virheilmoitus = sahkopostiInput.nextSibling;

  // Haetaan tyytyväisyyden tason kenttä
  const tyytyvaisuusInput = document.getElementById('rating');

  // Jos tyytyväisyystaso on kelvollinen, mutta sähköposti ei ole kelvollinen
  if (tyytyvaisuusInput.checkValidity() && !sahkopostiInput.checkValidity()) {

    // Jos vieressä ei ole virheilmoitusta tai ilmoituksen luokka ei ole "error"
    if (!virheilmoitus || virheilmoitus.className !== 'error') {

      const virheElementti = document.createElement('div');
      virheElementti.className = 'error';

      // Lisätään uusi virheilmoitus-elementti sähköpostikentän jälkeen
      sahkopostiInput.parentNode.insertBefore(virheElementti, sahkopostiInput.nextSibling);

      virheElementti.textContent = 'Syötä kelvollinen sähköpostiosoite.';
    } else {
      virheilmoitus.textContent = 'Syötä kelvollinen sähköpostiosoite.';
    }
    // Jos tyytyväisyystaso ei ole kelvollinen
  } else if (!tyytyvaisuusInput.checkValidity()) {

    if (!virheilmoitus || virheilmoitus.className !== 'error') {

      const virheElementti = document.createElement('div');
      virheElementti.className = 'error';

      // Lisätään uusi virheilmoitus-elementti sähköpostikentän jälkeen
      sahkopostiInput.parentNode.insertBefore(virheElementti, sahkopostiInput.nextSibling);

      virheElementti.textContent = 'Syötä kelvollinen tyytyväisyyden taso (1-5).';
    } else {
      virheilmoitus.textContent = 'Syötä kelvollinen tyytyväisyyden taso (1-5).';
    }
  } else {
    // Jos molemmat kentät ovat kelvollisia ja vieressä on virheilmoitus-elementti
    if (virheilmoitus && virheilmoitus.className === 'error') {
      virheilmoitus.remove();
    }
    window.location.replace('index.html');
  }
}

function pizzaJuttu(pizzaNimi) {
  const maara = localStorage.getItem(`${pizzaNimi}-maara`);

  if (maara > 0) {
    const pizzaOgHinta = pizzahinnat[pizzaNimi];
    let nimi = pizzojenOikeatNimet[pizzaNimi] || pizzaNimi;
    let pizzaHinta = maara * pizzaOgHinta;

    let pizzanPaistumisaika = 0;
    let taytteet = []
    let koko = 'Normaali'

    //console.log(document.getElementById('suuripohja').checkboxObject.value)

    const pohjavalittu = document.getElementById('suuripohja' + pizzaNimi).checked;
    let gluteeniton = document.getElementById('gluteenitonValittu' + pizzaNimi).checked; // true = gluteeniton, false = gluteenia

    if (pohjavalittu === true) {
      koko = 'Iso';
    }

    if (koko == 'Normaali') {
      pizzanPaistumisaika += 10
    } else {
      pizzanPaistumisaika += 13
    }

    if (gluteeniton) {
      pizzanPaistumisaika += 3
      pizzaHinta += 2
      gluteeniton = "Kyllä"
    } else {
      gluteeniton = "Ei"
    }

    const kokoPizza = {
      'määrä': maara,
      'nimi': nimi,
      'koko': koko,
      'paistumisaika': pizzanPaistumisaika,
      'gluteeniton': gluteeniton,
      'hinta': pizzaHinta.toFixed(2),
      'täytteet': taytteet
    };

    console.log(kokoPizza);

    pizzaArray.push(kokoPizza);
    localStorage.setItem("pizzaArray", JSON.stringify(pizzaArray));
  }

}
