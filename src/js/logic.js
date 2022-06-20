var sortingNumberDeath = 0;
var sortingNumberConfrimed = 0;
var sortingNumberRecover = 0; 
var dateAll;
var changeDate = 0;
var countryName;
  


function isSaveandWrite(){
    saveDate()
    saveGlobalDate()
    drawMap()
}

//html logic

document.getElementById("changeTheme").addEventListener("click", () => {
    document.getElementById("main").classList.toggle("bodyTheme")
    document.getElementById("head").classList.toggle("blockTheme")
    document.getElementById("foot").classList.toggle("blockTheme")
    document.getElementById("logo").classList.toggle("imageTheme")
    document.getElementById("updateDate").classList.toggle("dateTheme")
    document.getElementById("totalDate").classList.toggle("dateTheme")
    document.getElementById("graphVirus").classList.toggle("dateTheme")
    document.getElementById("mapSection").classList.toggle("dateTheme")
    document.getElementById("butMenu").classList.toggle("buttonTheme")
    document.getElementById("contentMenu").classList.toggle("contMenu")
})

document.getElementById("butConf").addEventListener("click", () => {
    sortingNumberConfrimed === 0 ? sortingNumberConfrimed = 1 : sortingNumberConfrimed = 0
    listCreate(dateAll["Countries"], "listConfirmed", "TotalConfirmed", "NewConfirmed", "lineConfirmed", sortingNumberConfrimed)
})

document.getElementById("butDeath").addEventListener("click", () => {
    sortingNumberDeath === 0 ? sortingNumberDeath = 1 : sortingNumberDeath = 0
    listCreate(dateAll["Countries"], "listDeath", "TotalDeaths", "NewDeaths", "lineDeath", sortingNumberDeath)
})

document.getElementById("butRec").addEventListener("click", () => {
    sortingNumberRecover === 0 ? sortingNumberRecover = 1 : sortingNumberRecover = 0
    listCreate(dateAll["Countries"], "listRecover", "TotalRecovered", "NewRecovered", "lineRecover", sortingNumberRecover)
})

document.getElementById("changeDate").addEventListener("click", (e) => {
    changeDate === 0 ? changeDate = 1 : changeDate = 0
    changeDate === 0 ? e.target.innerHTML = "Last day" : e.target.innerHTML = "All time"
    listCreate(dateAll["Countries"], "listConfirmed", "TotalConfirmed", "NewConfirmed", "lineConfirmed", sortingNumberConfrimed)
    listCreate(dateAll["Countries"], "listDeath", "TotalDeaths", "NewDeaths", "lineDeath", sortingNumberDeath)
    listCreate(dateAll["Countries"], "listRecover", "TotalRecovered", "NewRecovered", "lineRecover", sortingNumberRecover)
})

document.getElementById("search").addEventListener("input", (e) => {
    listCreate(nameSearch(e.target.value), "listConfirmed", "TotalConfirmed", "NewConfirmed", "lineConfirmed", sortingNumberConfrimed)
    listCreate(nameSearch(e.target.value), "listDeath", "TotalDeaths", "NewDeaths", "lineDeath", sortingNumberDeath)
    listCreate(nameSearch(e.target.value), "listRecover", "TotalRecovered", "NewRecovered", "lineRecover", sortingNumberRecover)
})

document.getElementById("selectCountry").addEventListener("change", (e) => {
    saveCountryDate(e.target.value)
    document.getElementById("graphCountry").style.display = "none"
    document.getElementById("graphCountry").style.display = "flex"
})

// Main logic

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

function searchCountryName(array) {
    return array.map((item, index, arr) => {
        for (let i = 0; i < dateAll["Countries"].length; i++) {
            if(item["Country"] === dateAll["Countries"][i]["Country"]){
                arr.splice(index, 1)
            }
        }
    })
}

//Create Block

function listCreate(elements, div, total, totalDay, line, param){
    let listBlock = document.getElementById(div)
    let sortArr;
    let str;
    document.getElementById(div).innerHTML = ""
    changeDate === 0 ? str = total : str = totalDay
    param === 0 ? sortArr = sortDescending(elements, str) : sortArr = sortGrowth(elements, str)
    for(let i = 0; i < sortArr.length; i++){
        createBlock(listBlock, sortArr[i][str], sortArr[i]["Country"], line)
        listBlock.appendChild(document.createElement("hr"))
    }
}

function createBlock(div, number, country, str) {
    let line = document.createElement("div")
    line.className = str
    line.innerHTML= `<span class="numberCountry">${converterNumbers(number)}</span><span class="nameCountry">${country}</span>`
    div.appendChild(line)
}

function convertArray(array, name, str){
    if(str !== "time"){
        return array.map(function(e){
            return e[name]
        })
    }
    else{
        return array.map(function(e){
            return new Date(e[name]).toLocaleDateString()
        })
    }
}


function textResult(a,b,c){
    document.getElementById("totalConfirmed").innerText = converterNumbers(a)
    document.getElementById("totalDeath").innerText = converterNumbers(b)
    document.getElementById("totalRecover").innerText = converterNumbers(c)
}

function createSelect(arr){
    let div = document.getElementById("selectCountry")
    for(let i = 0; i < arr.length; i++){
        createOption(div, arr[i]["Country"], arr[i]["Slug"])
    }
}

function createOption(div, name, value) {
    let option = document.createElement("option")
    option.value = value
    option.innerText = name
    div.appendChild(option)
}

//fetch func

function saveGlobalDate(){
    fetch("https://api.covid19api.com/world?from=2022-05-01T00:00:00Z&to=2022-06-01T00:00:00Z")
    .then(response => response.json())
    .then(response => {
        let dateTotal = sortGrowth(response, "TotalConfirmed")
        let time = convertArray(dateTotal, "Date", "time")
        let conf = convertArray(dateTotal, "TotalConfirmed", "number")
        let death = convertArray(dateTotal, "TotalDeaths", "number")
        let rec = convertArray(dateTotal, "TotalRecovered", "number")
        graphicAllDraw("graphGlobal", conf, death, rec, time)
    })
    .catch(error => {
        console.log(error)
    })
}

function saveCountryDate(address){
    fetch(`https://api.covid19api.com/total/country/${address}?from=2022-05-01T00:00:00Z&to=2022-06-01T00:00:00Z`)
    .then(response => response.json())
    .then(response => {
        let time = convertArray(response, "Date", "time")
        let conf = convertArray(response, "Confirmed", "number")
        let death = convertArray(response, "Deaths", "number")
        let rec = convertArray(response, "Recovered", "number")
        graphicCountryDraw("graphCountry", conf, death, rec, time).update()
    })
    .catch(error => {
        console.log(error)
    })
}

function saveDate(){
    fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(response => {
        dateAll = response
        let date = new Date(`${response["Global"]["Date"]}`)
        document.getElementById("time").innerText = date.toLocaleString()
        textResult(response["Global"]["TotalConfirmed"],response["Global"]["TotalDeaths"],response["Global"]["TotalRecovered"])
        listCreate(response["Countries"], "listConfirmed", "TotalConfirmed", "NewConfirmed", "lineConfirmed", sortingNumberConfrimed)
        listCreate(response["Countries"], "listDeath", "TotalDeaths", "NewDeaths", "lineDeath", sortingNumberDeath)
        listCreate(response["Countries"], "listRecover", "TotalRecovered", "NewRecovered", "lineRecover", sortingNumberRecover)
        createSelect(response["Countries"])
    })
    .catch(error => {
        console.log(error)
    })
}

function saveDate(){
    fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(response => {
        dateAll = response
        let date = new Date(`${response["Global"]["Date"]}`)
        document.getElementById("time").innerText = date.toLocaleString()
        textResult(response["Global"]["TotalConfirmed"],response["Global"]["TotalDeaths"],response["Global"]["TotalRecovered"])
        listCreate(response["Countries"], "listConfirmed", "TotalConfirmed", "NewConfirmed", "lineConfirmed", sortingNumberConfrimed)
        listCreate(response["Countries"], "listDeath", "TotalDeaths", "NewDeaths", "lineDeath", sortingNumberDeath)
        listCreate(response["Countries"], "listRecover", "TotalRecovered", "NewRecovered", "lineRecover", sortingNumberRecover)
        createSelect(response["Countries"])
    })
    .catch(error => {
        console.log(error)
    })
}


//async func

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