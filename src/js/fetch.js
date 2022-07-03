//fetch func

function saveGlobalData(){
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
