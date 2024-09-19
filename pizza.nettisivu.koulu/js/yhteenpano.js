let hintayht = 0;
let kesto = 0;

const hintayhtHtml = document.getElementById("hintayht")
const tilausKesto = document.getElementById("tilausparagraph")
const otsikko = document.getElementById("otsikko")
const parentElement = document.querySelector('.tyhjenna');
const tyhjennaOstoskoriNappi = document.getElementById("tyhjennäOstoskori")
const kuljetusTavat = document.querySelector(".kuljetustavat")
const toimitusosoiteBox = document.getElementById("toimitusosoite")
const juomat = document.querySelector(".juomat")

toimitusosoiteBox.style.display = "none"

kuljetusTavat.onchange = (event) => {
  let selected = kuljetusTavat.options[kuljetusTavat.selectedIndex].value;
  if(selected=="Kuljetus") {
    toimitusosoiteBox.style.display = ""
  } else {
    toimitusosoiteBox.style.display = "none";
  }
}

const TyhjennaOstoskori = () => {
  if (JSON.parse(localStorage.getItem("pizzaArray")).length > 0) { //estää turhan ostoskori tyhjennysnapin spammin
    localStorage.setItem("pizzaArray", JSON.stringify([]));
    hintayht = 0 
    kesto = 0
    otsikko.textContent = "Sinulla ei ole mitään ostoskorissa"
    location.reload();
  }
}

function tilaa() {
  table.remove()
  otsikko.textContent = "Kiitos tilauksesta! Palaa etusivulle tilaaksesi uudestaan!";
  kuljetusTavat.style.display = "none";
  tilausKesto.style.display = "";
  tyhjennaOstoskoriNappi.style.display = "none"
  document.getElementById("tilaa").style.display = "none"
  toimitusosoiteBox.style.display = "none"
  juomat.style.display = "none";
  localStorage.clear();
}

tyhjennaOstoskoriNappi.addEventListener('click', TyhjennaOstoskori);

document.addEventListener("DOMContentLoaded", function () {
  tilausKesto.style.display = "none";
  document.getElementById("tilaa").style.display = ""
  juomat.style.display = "";

  const table = document.createElement("table");
  parentElement.insertBefore(table, tyhjennaOstoskoriNappi);

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const nimiYlike = document.createElement("th");
  nimiYlike.textContent = "Tuote";

  const hintaYlike = document.createElement("th");
  hintaYlike.textContent = "Hinta";

  const kokoYlike = document.createElement("th");
  kokoYlike.textContent = "Koko"

  const gluteenitonYlike = document.createElement("th");
  gluteenitonYlike.textContent = "Gluteeniton"

  const valmisYlike = document.createElement("th")
  valmisYlike.textContent = "Valmistumisaika"

  const maaraYlike = document.createElement("th");
  maaraYlike.textContent = "Määrä"

  const poistaYlike = document.createElement("th");
  poistaYlike.textContent = "Poista";

  headerRow.appendChild(nimiYlike);
  headerRow.appendChild(hintaYlike);
  headerRow.appendChild(kokoYlike)
  headerRow.appendChild(gluteenitonYlike)
  headerRow.appendChild(valmisYlike);
  headerRow.appendChild(maaraYlike)
  headerRow.appendChild(poistaYlike);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  const pizzaArray = JSON.parse(localStorage.getItem("pizzaArray"));

  if (pizzaArray && pizzaArray.length > 0) {

    tilausKesto.style.display = "";
    tyhjennaOstoskoriNappi.style.display = "";
    hintayhtHtml.style.display = "";

    pizzaArray.forEach((dict) => { // päästään dictionaryihin käsiksi, jotka ovat pizza arrayn sisällä

      const rivi = document.createElement("tr");
      const nimiKohta = document.createElement("td");
      const hintaKohta = document.createElement("td");
      const kokoKohta = document.createElement("td");
      const gluteenitonKohta = document.createElement("td");
      const aikaKohta = document.createElement("td");
      const maaraKohta = document.createElement("td");

      nimiKohta.textContent = `${dict.nimi}`;
      hintaKohta.textContent = `${dict.hinta}€`;
      kokoKohta.textContent = `${dict.koko}`;
      gluteenitonKohta.textContent = `${dict.gluteeniton}`
      aikaKohta.textContent = `${dict.paistumisaika * dict['määrä']} min`;
      maaraKohta.textContent = `${dict['määrä']}x`;

      const poistaKohta = document.createElement("td");
      const poistaNappi = document.createElement("button");
      poistaNappi.textContent = "X";
      poistaNappi.style.backgroundColor = "transparent"

      poistaNappi.addEventListener("click", function () {
        hintayhtHtml.textContent = `Yhteishinta: ${(hintayht -= dict.hinta).toFixed(2)}€`;
        kesto -= dict.paistumisaika * dict['määrä']
        rivi.remove();

        const pizzaArray = JSON.parse(localStorage.getItem("pizzaArray"));
        const index = pizzaArray.findIndex((item) => item.nimi === dict.nimi && item.koko === dict.koko);
        pizzaArray.splice(index, 1);
        localStorage.setItem("pizzaArray", JSON.stringify(pizzaArray));
        if (pizzaArray.length < 1) {
          table.remove()
          tilausKesto.style.display = "none";
          tyhjennaOstoskoriNappi.style.display = "none";
          otsikko.textContent = "Sinulla ei ole mitään ostoskorissa";
          kuljetusTavat.style.display = "none";
          hintayhtHtml.style.display = "none";
          document.getElementById("tilaa").style.display = "none"
          toimitusosoiteBox.style.display = "none"
          juomat.style.display = "none";
        }
      });


      poistaKohta.appendChild(poistaNappi);
      rivi.appendChild(nimiKohta);
      rivi.appendChild(hintaKohta);
      rivi.appendChild(kokoKohta);
      rivi.appendChild(gluteenitonKohta);
      rivi.appendChild(aikaKohta);
      rivi.appendChild(maaraKohta);
      rivi.appendChild(poistaKohta);
      tbody.appendChild(rivi);

      document.getElementById("table").appendChild(table);

      hintayht += Number(dict.hinta); //Lisätään yhteiseen hintaan dictionaryssa oleva hinta 
      kesto += dict.paistumisaika * dict['määrä']
    });

    // Muutetaan kesto tunneiksi ja minuuteiksi, jos kesto ylittää 60 minuuttia
    let kestoTunneiksi = Math.floor(kesto / 60);
    let kestoMinuuteiksi = kesto % 60;

    // Luodaan keston esitys tunteina ja minuutteina
    let kestoEsitys = "";
    if (kestoTunneiksi > 0) {
      kestoEsitys += `${kestoTunneiksi} tunnin `;
    }
    kestoEsitys += `${kestoMinuuteiksi} minuutin`;


    hintayht = Number(hintayht).toFixed(2)

    hintayhtHtml.textContent = `Yhteishinta: ${hintayht}€`
    localStorage.setItem("kesto", kestoEsitys)
    tilausKesto.textContent = `Tilauksesi on valmis: ${kestoEsitys} päästä.`;

  } else { // kun käyttäjä ei ole laittanut tilaukseen mitään
    tilausKesto.style.display = "none";
    tyhjennaOstoskoriNappi.style.display = "none";
    otsikko.textContent = "Sinulla ei ole mitään ostoskorissa";
    hintayhtHtml.style.display = "none";
    kuljetusTavat.style.display = "none";
    document.getElementById("tilaa").style.display = "none"
    toimitusosoiteBox.style.display = "none"
    juomat.style.display = "none";
    table.remove()
  }

});