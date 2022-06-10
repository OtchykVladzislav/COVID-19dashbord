var today = new Date();
var dateAll;

function isSaveandWrite(){
    saveDate()
}

function sortDate(elements) {
    return elements.sort((a,b) => a - b)
}

function createBlockConfirmed(div, number, country) {
    let line = document.createElement("div")
    line.className = "lineConfirmed"
    line.innerHTML= `<span class="numberCountry">${number}</span><span class="nameCountry">${country}</span>`
    div.appendChild(line)
}

function listConfirmed(elements){
    let listBlock = document.getElementById("listCountries")
    for(let i = 0; i < elements.length; i++){
        createBlockConfirmed(listBlock, elements[i]["TotalConfirmed"], elements[i]["Country"])
        listBlock.appendChild(document.createElement("hr"))
    }

}

function saveDate(){
    fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(response => {
        document.getElementById("total").innerText = response["Global"]["TotalConfirmed"]
        listConfirmed(response["Countries"])
    })
    .catch(error => {
        console.log(error)
    })
}

function parseTime(){
    let hour = String(today.getHours());
    let minutes = String(today.getMinutes());
    let seconds = String(today.getSeconds());
    let date = String(today.getDay())
    let month = String(today.getMonth())
    let year = String(today.getFullYear())

    date < 10 ? document.getElementById("day").innerText = "0" + date : document.getElementById("day").innerText = date
    month < 10 ? document.getElementById("month").innerText = "0" + month : document.getElementById("month").innerText = month 
    document.getElementById("year").innerText = year

    hour < 10 ? document.getElementById("hour").innerText = "0" + hour : document.getElementById("hour").innerText = hour
    minutes < 10 ? document.getElementById("min").innerText = "0" + minutes : document.getElementById("min").innerText = minutes
    seconds < 10 ? document.getElementById("sec").innerText = "0" + seconds : document.getElementById("sec").innerText = seconds
}

setInterval(parseTime, 10)