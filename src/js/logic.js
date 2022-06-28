let sortingNumberDeath = 0;
let sortingNumberConfrimed = 0;
let sortingNumberRecover = 0;
let sortingNumberDeathPerMillion = 0;
let sortingNumberConfrimedPerMillion = 0;
let sortingNumberRecoverPerMillion = 0;  
var dataAll;
var dataToday;
let changeDate = 0;
let month;
let year;
let day;
  
function isSaveandWrite(){
    parseDate()
    checkDate()
    saveDate()
    saveGlobalData()
    saveDataMap()
    saveDataTotal()
}

//html logic

document.getElementById("changeTheme").addEventListener("click", () => {
    document.getElementById("main").classList.toggle("bodyTheme")
    document.getElementById("head").classList.toggle("blockTheme")
    document.getElementById("foot").classList.toggle("blockTheme")
    document.getElementById("logo").classList.toggle("imageTheme")
    document.getElementById("updateDate").classList.toggle("dateTheme")
    document.getElementById("totalDate").classList.toggle("dateTheme")
    document.getElementById("dataPerOneMill").classList.toggle("dateTheme")
    document.getElementById("graphVirus").classList.toggle("dateTheme")
    document.getElementById("mapSection").classList.toggle("dateTheme")
    document.getElementById("butMenu").classList.toggle("buttonTheme")
    document.getElementById("contentMenu").classList.toggle("contMenu")
    document.getElementById("changeTheme").innerHTML = 'Theme(<span id="themeIcon">&#9790;</span>)'
})

document.getElementById("butCaO").addEventListener("click", (e) => {
    let elem = document.getElementById("mapVirus")
    if (!document.fullscreenElement) {
        elem.requestFullscreen()
        e.target.innerHTML = "&#10539;"
    } else {
        document.exitFullscreen();
        e.target.innerHTML = "&#10530;"
    }
})

document.getElementById("butConf").addEventListener("click", () => {
    sortingNumberConfrimed === 0 ? sortingNumberConfrimed = 1 : sortingNumberConfrimed = 0
    listCreate(dataAll, "listConfirmed", "cases", "todayCases", "lineConfirmed", sortingNumberConfrimed)
})

document.getElementById("butDeath").addEventListener("click", () => {
    sortingNumberDeath === 0 ? sortingNumberDeath = 1 : sortingNumberDeath = 0
    listCreate(dataAll, "listDeath", "deaths", "todayDeaths", "lineDeath", sortingNumberDeath)
})

document.getElementById("butRec").addEventListener("click", () => {
    sortingNumberRecover === 0 ? sortingNumberRecover = 1 : sortingNumberRecover = 0
    listCreate(dataAll, "listRecover", "recovered", "todayRecovered", "lineRecover", sortingNumberRecover)
})

document.getElementById("butConfPerOneMill").addEventListener("click", () => {
    sortingNumberConfrimedPerMillion === 0 ? sortingNumberConfrimedPerMillion = 1 : sortingNumberConfrimedPerMillion = 0
    listCreate(dataAll, "listConfirmedPerOneMill", "casesPerOneMillion", "casesPerOneMillion", "lineConfirmedPerOneMill", sortingNumberConfrimedPerMillion)
})

document.getElementById("butDeathPerOneMill").addEventListener("click", () => {
    sortingNumberDeathPerMillion === 0 ? sortingNumberDeathPerMillion = 1 : sortingNumberDeathPerMillion = 0
    listCreate(dataAll, "listDeathPerOneMill", "deathsPerOneMillion", "deathsPerOneMillion", "lineDeathPerOneMill", sortingNumberDeathPerMillion)
})

document.getElementById("butRecPerOneMill").addEventListener("click", () => {
    sortingNumberRecoverPerMillion === 0 ? sortingNumberRecoverPerMillion = 1 : sortingNumberRecoverPerMillion = 0
    listCreate(dataAll, "listRecoverPerOneMill", "recoveredPerOneMillion", "recoveredPerOneMillion", "lineRecoverPerOneMill", sortingNumberRecoverPerMillion)
})

document.getElementById("changeDate").addEventListener("click", (e) => {
    changeDate === 0 ? changeDate = 1 : changeDate = 0
    changeDate === 0 ? e.target.innerHTML = "Last day" : e.target.innerHTML = "All time"
    textResult(dataToday)
    listCreate(dataAll, "listConfirmed", "cases", "todayCases", "lineConfirmed", sortingNumberConfrimed)
    listCreate(dataAll, "listDeath", "deaths", "todayDeaths", "lineDeath", sortingNumberDeath)
    listCreate(dataAll, "listRecover", "recovered", "todayRecovered", "lineRecover", sortingNumberRecover)
})

document.getElementById("search").addEventListener("input", (e) => {
    listCreate(nameSearch(e.target.value), "listConfirmed", "cases", "todayCases", "lineConfirmed", sortingNumberConfrimed)
    listCreate(nameSearch(e.target.value), "listDeath", "deaths", "todayDeaths", "lineDeath", sortingNumberDeath)
    listCreate(nameSearch(e.target.value), "listRecover", "recovered", "todayRecovered", "lineRecover", sortingNumberRecover)
    listCreate(nameSearch(e.target.value), "listConfirmedPerOneMill", "casesPerOneMillion", "casesPerOneMillion", "lineConfirmedPerOneMill", sortingNumberConfrimedPerMillion)
    listCreate(nameSearch(e.target.value), "listDeathPerOneMill", "deathsPerOneMillion", "deathsPerOneMillion", "lineDeathPerOneMill", sortingNumberDeathPerMillion)
    listCreate(nameSearch(e.target.value), "listRecoverPerOneMill", "recoveredPerOneMillion", "recoveredPerOneMillion", "lineRecoverPerOneMill", sortingNumberRecoverPerMillion)
})

document.getElementById("selectCountry").addEventListener("change", (e) => {
    saveCountryData(e.target.value, document.getElementById("fromDate").value, document.getElementById("toDate").value)
    document.getElementById("graphCountry").style.display = "flex"
})

document.getElementById("fromDate").addEventListener("change", (e) => {
    saveCountryData(document.getElementById("selectCountry").value, e.target.value, document.getElementById("toDate").value)
    document.getElementById("graphCountry").style.display = "flex"
})

document.getElementById("toDate").addEventListener("change", (e) => {
    saveCountryData(document.getElementById("selectCountry").value, document.getElementById("fromDate").value, e.target.value)
    document.getElementById("graphCountry").style.display = "flex"
})

// Main logic

function parseDate(){
    let today = new Date();
    day = today.getDay()
    month = today.getMonth()
    year = today.getFullYear()
    document.getElementById("day").innerText = String(day).padStart(2, '0')
    document.getElementById("month").innerText = String(month).padStart(2, '0')
    document.getElementById("year").innerText = year
}

function nameSearch(elements){
    return dataAll.filter(item => item["country"].toLowerCase().includes(elements.toLowerCase()))
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

//Create Block

function checkDate() {
    let fromDate = document.getElementById("fromDate")
    let toDate = document.getElementById("toDate")
    fromDate.value = `${year}-${String(month).padStart(2, '0')}-01`;
    toDate.value = `${year}-${String(month).padStart(2, '0')}-28`;
    fromDate.max = `${year}-${String(month).padStart(2, '0')}-28`
    toDate.max = `${year}-${String(month).padStart(2, '0')}-28`
}

function listCreate(elements, div, total, totalDay, line, param){
    let listBlock = document.getElementById(div)
    let sortArr;
    let str;
    document.getElementById(div).innerHTML = ""
    changeDate === 0 ? str = total : str = totalDay
    param === 0 ? sortArr = sortDescending(elements, str) : sortArr = sortGrowth(elements, str)
    for(let i = 0; i < sortArr.length; i++){
        createBlock(listBlock, sortArr[i][str], sortArr[i]["country"], line)
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


function textResult(text){
    if(changeDate === 0){
        document.getElementById("totalConfirmed").innerText = converterNumbers(text["cases"])
        document.getElementById("totalDeath").innerText = converterNumbers(text["deaths"])
        document.getElementById("totalRecover").innerText = converterNumbers(text["recovered"])
    }
    else{
        document.getElementById("totalConfirmed").innerText = converterNumbers(text["todayCases"])
        document.getElementById("totalDeath").innerText = converterNumbers(text["todayDeaths"])
        document.getElementById("totalRecover").innerText = converterNumbers(text["todayRecovered"])
    }
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

function saveGlobalData(){
    console.log(year)
    console.log(month)
    fetch(`https://api.covid19api.com/world?from=${year}-${month}-01T00:00:00Z&to=${year}-${month+1}-01T00:00:00Z`)
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

function saveCountryData(address, from, to){
    fetch(`https://api.covid19api.com/total/country/${address}?from=${from}T00:00:00Z&to=${to}T12:00:00Z`)
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
        let date = new Date(`${response["Global"]["Date"]}`)
        document.getElementById("time").innerText = date.toLocaleString()
        createSelect(response["Countries"])
    })
    .catch(error => {
        console.log(error)
    })
}

function saveDataTotal() {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(response => {
        dataToday = response
        textResult(response)
    })
    .catch(error => {
        console.log(error)
    })
}

function saveDataMap(){
    fetch("https://disease.sh/v3/covid-19/countries/")
    .then(response => response.json())
    .then(response => {
        dataAll = response
        listCreate(response, "listConfirmed", "cases", "todayCases", "lineConfirmed", sortingNumberConfrimed)
        listCreate(response, "listDeath", "deaths", "todayDeaths", "lineDeath", sortingNumberDeath)
        listCreate(response, "listRecover", "recovered", "todayRecovered", "lineRecover", sortingNumberRecover)
        listCreate(response, "listConfirmedPerOneMill", "casesPerOneMillion", "casesPerOneMillion", "lineConfirmedPerOneMill", sortingNumberConfrimedPerMillion)
        listCreate(response, "listDeathPerOneMill", "deathsPerOneMillion", "deathsPerOneMillion", "lineDeathPerOneMill", sortingNumberDeathPerMillion)
        listCreate(response, "listRecoverPerOneMill", "recoveredPerOneMillion", "recoveredPerOneMillion", "lineRecoverPerOneMill", sortingNumberRecoverPerMillion)
        drawMap(response)
    })
    .catch(error => {
        console.log(error)
    })
}


//async func

function logicClock(){
    let today = new Date();
    let hour = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');
    let seconds = String(today.getSeconds()).padStart(2, '0');

    document.getElementById("hour").innerText = hour
    document.getElementById("min").innerText = minutes
    document.getElementById("sec").innerText = seconds
}

setInterval(() =>{
    logicClock()
    document.getElementById("toDate").min = document.getElementById("fromDate").value
}, 10)