const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

const apiURL = "https://api.quotable.io/random";



async function getQuote() {

    //this try catch for showing error to user if any error happens
    try {

        btnEl.innerText = "Loading...";
        btnEl.disabled = true;
        quoteEl.innerText = "Updating...";
        authorEl.innerText = "Updating...";

        //how we call api and get information
        const response = await fetch(apiURL);
        //conversing it to json
        const data = await response.json();
        //await -> we need to wait until the result comes   +   because of that, made it async function
        //when we fetch the data from apiURL until the response comes, code doesn't go to the next line
        //when const response is filled with data that comes from apiURL, now response.json() can run

        const quoteContent = data.content;
        const quoteAuthor = data.author;
        quoteEl.innerText = quoteContent;
        authorEl.innerText = "~ " + quoteAuthor;

        btnEl.innerText = "get new quote";
        btnEl.disabled = false;

        console.log(data);

    } catch (error) {
        quoteEl.innerText = "An error happened, try again later";
        quoteEl.innerText = "An error happened, try again later";

        btnEl.innerText = "get new quote";
        btnEl.disabled = false;
    }
}

getQuote();

btnEl.addEventListener("click", getQuote);