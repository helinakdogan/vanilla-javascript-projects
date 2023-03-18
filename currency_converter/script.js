const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");

updateRate();

function updateRate() {
    fetch(`https://v6.exchangerate-api.com/v6/b44f8539651a94ee0ac3039c/latest/${currencyFirstEl.value}`)
        
        //converted data into json to use
        .then((res) => res.json())
        //.then((data) => console.log(data));


        .then((data) => {

            //array for all second data come from api
            const rate = data.conversion_rates[currencySecondEl.value];
            //console.log(rate);


            exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${ rate + " " + currencySecondEl.value}`;

            //toFixed -> how many digit you want
            worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2)
        });
}

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);