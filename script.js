const baseButton = document.querySelectorAll('.base')
const baseInput = document.querySelector('.baseInput')
const rateButton = document.querySelectorAll('.rate')
const rateInput = document.querySelector('.rateInput')

const rubBtn = document.querySelector('.rub')
const usdBtn = document.querySelector('.usd')
const eurBtn = document.querySelector('.eur')
const gbpBtn = document.querySelector('.gbp')

let baseParagraph = document.querySelector('.baseParagraph')
let rateParagraph = document.querySelector('.rateParagraph')
let obj = { base: 'RUB', rate: 'USD', baseInput: 0, rateInput: 0 }, rate, amountOfRate

window.addEventListener('load', () => {
    baseButton[0].classList.add('active')
    rateButton[1].classList.add('active')
})
baseInput.addEventListener('keyup', () => {
    obj.baseInput = baseInput.value
    baseFetch(obj)
})

rateInput.addEventListener('keyup', () => {
    rateFetch(obj)
})
baseButton.forEach((event) => {
    event.addEventListener('click', function () {
        baseButton.forEach((event) => {
            event.classList.remove('active')
            this.classList.add('active')
        })
        obj.base = this.innerText
        baseFetch(obj)
    })
})

rateButton.forEach((event) => {
    event.addEventListener('click', function () {
        rateButton.forEach((event) => {
            event.classList.remove('active')
            this.classList.add('active')
        })
        obj.rate = this.innerText
        rateFetch(obj)
    })
})

function baseFetch(obj) {
    if (obj.baseInput !== null) {
        fetch(`https://api.exchangerate.host/latest?base=${obj.base}&symbols=${obj.rate}`)
            .then(resp => resp.json())
            .then(data => {
                rate = Object.values(data.rates)[0]
                amountOfRate = (obj.baseInput / rate).toFixed(2)
                let amount = (rate * obj.baseInput).toFixed(2)
                rateInput.value = amount
                baseParagraph.innerText = `1  ${obj.base} = ${rate.toFixed(2)} ${obj.rate}`
                rateParagraph.innerText = `1 ${obj.rate} = ${amountOfRate} ${obj.base}`
            })
            .catch((err) => {
                alert(err);
            })
    }
}

function rateFetch(obj) {
    fetch(`https://api.exchangerate.host/latest?base=${obj.rate}&symbols=${obj.base}`)
        .then(resp => resp.json())
        .then(data => {
            base = Object.values(data.rates)
            baseInput.value = (base * rateInput.value).toFixed(1)
        })
        .catch((err) => {
            alert(err)
        })
}