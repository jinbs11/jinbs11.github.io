document.addEventListener("DOMContentLoaded", function () {
    Maara(null);
});

//päivitetään lukumäärä
function Maara(pizzaNro){
        if(pizzaNro === null){
            localStorage.setItem('pepperoni-maara', 0);
            localStorage.setItem('tulinen-maara', 0);
            localStorage.setItem('bbq-maara', 0);
            localStorage.setItem('kasvis-maara', 0);
            localStorage.setItem('juusto-maara', 0);
            localStorage.setItem('hawaii-maara', 0);
            localStorage.setItem('liha-maara', 0);
        }else
        if(localStorage.getItem(pizzaNro) > 0){
            document.getElementById(pizzaNro).innerHTML = localStorage.getItem(pizzaNro);
        }else{
            document.getElementById(pizzaNro).innerHTML = '0';
        }
}

//lisätään valitun pizzan lukumäärää
function LisaaPizza(pizzaNro){
    localStorage.setItem(pizzaNro, Number(localStorage.getItem(pizzaNro)) + 1);
    console.log(localStorage.getItem(pizzaNro));
    Maara(pizzaNro);
}
//vähennetään valitun pizzan lukumäärää
function VahennaPizza(pizzaNro){
    if(localStorage.getItem(pizzaNro) > 0){
        localStorage.setItem(pizzaNro, Number(localStorage.getItem(pizzaNro)) - 1);
    }
    Maara(pizzaNro);
}