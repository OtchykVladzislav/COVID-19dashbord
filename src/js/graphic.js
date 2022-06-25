let countryChart = null;
let totalChart = null;

function drawGraphic(elemOne, elemTwo, elemThree, time) {
    return {
        type: 'line',
        data: {
            labels: time,
            datasets: [
                {
                    label: 'Recover',
                    data: elemThree,
                    /*backgroundColor: 'rgba(0, 255, 0, 1)',*/
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1,
                    fill: true
                },
                {
                    label: 'Death',
                    data: elemTwo,
                    /*backgroundColor: 'rgba(255, 0, 0, 1)',*/
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1,
                    fill: true
                },
                {
                    label: 'Confirmed',
                    data: elemOne,
                    /*backgroundColor: 'rgba(255, 159, 64, 1)',*/
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    fill: true
                    
                }
            ]
        },
        options : {
            elements : {
                line: {
                    tension: 0
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    }
}


function graphicAllDraw(div, elemOne, elemTwo, elemThree, time) {
    if(totalChart != null){
        totalChart.destroy()
    }
    totalChart = new Chart(document.getElementById(div), drawGraphic(elemOne, elemTwo, elemThree, time))
}

function graphicCountryDraw(div, elemOne, elemTwo, elemThree, time) {
    if(countryChart != null){
        countryChart.destroy()
    }

    countryChart = new Chart(document.getElementById(div), drawGraphic(elemOne, elemTwo, elemThree, time))
}