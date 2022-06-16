var ctx = document.getElementById('myChart').getContext('2d');

function graphicDraw(elemOne, elemTwo, elemThree, time) {
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [
                {
                    label: 'Recover',
                    data: elemThree,
                    backgroundColor: 'rgba(0, 255, 0, 1)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'Death',
                    data: elemTwo,
                    backgroundColor: 'rgba(255, 0, 0, 1)',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'Confirmed',
                    data: elemOne,
                    backgroundColor: 'rgba(255, 159, 64, 1)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 3,
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
    })   
}