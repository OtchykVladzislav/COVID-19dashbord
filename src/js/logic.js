var sortingNumberDeath = 0;
var sortingNumberConfrimed = 0;
var sortingNumberRecover = 0; 
var dateAll;
var changeDate = 0;

function isSaveandWrite(){
    saveDate()
}

document.getElementById("changeTheme").addEventListener("click", () => {
    document.getElementById("main").classList.toggle("bodyTheme")
    document.getElementById("head").classList.toggle("blockTheme")
    document.getElementById("foot").classList.toggle("blockTheme")
    document.getElementById("logo").classList.toggle("imageTheme")
    document.getElementById("updateDate").classList.toggle("dateTheme")
    document.getElementById("totalDate").classList.toggle("dateTheme")
    document.getElementById("butMenu").classList.toggle("buttonTheme")
    document.getElementById("contentMenu").classList.toggle("contMenu")
})

document.getElementById("butConf").addEventListener("click", () => {
    sortingNumberConfrimed === 0 ? sortingNumberConfrimed = 1 : sortingNumberConfrimed = 0
    listConfirmed(dateAll["Countries"])
})

document.getElementById("butDeath").addEventListener("click", () => {
    sortingNumberDeath === 0 ? sortingNumberDeath = 1 : sortingNumberDeath = 0
    listDeath(dateAll["Countries"])
})

document.getElementById("butRec").addEventListener("click", () => {
    sortingNumberRecover === 0 ? sortingNumberRecover = 1 : sortingNumberRecover = 0
    listRecover(dateAll["Countries"])
})

document.getElementById("changeDate").addEventListener("click", (e) => {
    changeDate === 0 ? changeDate = 1 : changeDate = 0
    changeDate === 0 ? e.target.innerHTML = "За последний день" : e.target.innerHTML = "За всё время"
    listConfirmed(dateAll["Countries"])
    listDeath(dateAll["Countries"])
    listRecover(dateAll["Countries"])
})

document.getElementById("search").addEventListener("input", (e) => {
    listConfirmed(nameSearch(e.target.value))
    listDeath(nameSearch(e.target.value))
    listRecover(nameSearch(e.target.value))
})

function nameSearch(elements){
    return dateAll["Countries"].filter(item => item["Country"].toLowerCase().includes(elements.toLowerCase()))
}


function sortDescending(elements, str) {
    return elements.sort((a, b) => b[str] - a[str])
}

function sortGrowth(elements, str){
    return elements.sort((a, b) => a[str] - b[str])
}

function converterNumbers(string){
    return (parseInt(+string)).toLocaleString('ru-Ru')
}

function listConfirmed(elements){
    let listBlock = document.getElementById("listConfirmed")
    let sortArr;
    let str;
    document.getElementById("listConfirmed").innerHTML = ""
    changeDate === 0 ? str = "TotalConfirmed" : str = "NewConfirmed"
    sortingNumberConfrimed === 0 ? sortArr = sortDescending(elements, str) : sortArr = sortGrowth(elements, str)
    for(let i = 0; i < sortArr.length; i++){
        createBlockConfirmed(listBlock, sortArr[i][str], sortArr[i]["Country"])
        listBlock.appendChild(document.createElement("hr"))
    }
}

function listDeath(elements){
    let listBlock = document.getElementById("listDeath")
    let sortArr;
    let str;
    document.getElementById("listDeath").innerHTML = ""
    changeDate === 0 ? str = "TotalDeaths" : str = "NewDeaths"
    sortingNumberDeath === 0 ? sortArr= sortDescending(elements, str) : sortArr = sortGrowth(elements, str)
    for(let i = 0; i < sortArr.length; i++){
        createBlockDeath(listBlock, sortArr[i][str], sortArr[i]["Country"])
        listBlock.appendChild(document.createElement("hr"))
    }
}

function listRecover(elements){
    let listBlock = document.getElementById("listRecover")
    let sortArr;
    let str;
    document.getElementById("listRecover").innerHTML = ""
    changeDate === 0 ? str = "TotalRecovered" : str = "NewRecovered"
    sortingNumberDeath === 0 ? sortArr = sortDescending(elements, str) : sortArr = sortGrowth(elements, str)
    for(let i = 0; i < sortArr.length; i++){
        createBlockRecover(listBlock, sortArr[i][str], sortArr[i]["Country"])
        listBlock.appendChild(document.createElement("hr"))
    }
}

function createBlockConfirmed(div, number, country) {
    let line = document.createElement("div")
    line.className = "lineConfirmed"
    line.innerHTML= `<span class="numberCountry">${converterNumbers(number)}</span><span class="nameCountry">${country}</span>`
    div.appendChild(line)
}

function createBlockDeath(div, number, country) {
    let line = document.createElement("div")
    line.className = "lineDeath"
    line.innerHTML= `<span class="numberCountry">${converterNumbers(number)}</span><span class="nameCountry">${country}</span>`
    div.appendChild(line)
}

function createBlockRecover(div, number, country) {
    let line = document.createElement("div")
    line.className = "lineRecover"
    line.innerHTML= `<span class="numberCountry">${converterNumbers(number)}</span><span class="nameCountry">${country}</span>`
    div.appendChild(line)
}

function textResult(a,b,c){
    document.getElementById("totalConfirmed").innerText = converterNumbers(a)
    document.getElementById("totalDeath").innerText = converterNumbers(b)
    document.getElementById("totalRecover").innerText = converterNumbers(c)
}


function saveDate(){
    fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(response => {
        dateAll = response
        let date = new Date(`${response["Global"]["Date"]}`)
        document.getElementById("time").innerText = date.toLocaleString()
        textResult(response["Global"]["TotalConfirmed"],response["Global"]["TotalDeaths"],response["Global"]["TotalRecovered"])
        listConfirmed(response["Countries"])
        listDeath(response["Countries"])
        listRecover(response["Countries"])
    })
    .catch(error => {
        console.log(error)
    })
}

function parseTime(){
    let today = new Date();
    let hour = String(today.getHours());
    let minutes = String(today.getMinutes());
    let seconds = String(today.getSeconds());
    let date = String(today.getDay())
    let month = String(today.getMonth())
    let year = String(today.getFullYear())

    hour < 10 ? document.getElementById("hour").innerText = "0" + hour : document.getElementById("hour").innerText = hour
    minutes < 10 ? document.getElementById("min").innerText = "0" + minutes : document.getElementById("min").innerText = minutes
    seconds < 10 ? document.getElementById("sec").innerText = "0" + seconds : document.getElementById("sec").innerText = seconds

    date < 10 ? document.getElementById("day").innerText = "0" + date : document.getElementById("day").innerText = date
    month < 10 ? document.getElementById("month").innerText = "0" + month : document.getElementById("month").innerText = month 
    document.getElementById("year").innerText = year

}

setInterval(parseTime, 10)