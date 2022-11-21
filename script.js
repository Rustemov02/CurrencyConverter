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
let obj = { base: null, rate: null, baseInput: 0, rateInput: 0 }, rate

window.addEventListener('load', () => {
    baseButton[0].classList.add('active')
    rateButton[1].classList.add('active') 
})

baseInput.addEventListener('keyup', () => {
    obj.baseInput = baseInput.value
    getFetch(obj)
}) 
baseButton.forEach((event) => {
    event.addEventListener('click', function () {
        baseButton.forEach((event) => {
            event.classList.remove('active')
            this.classList.add('active')
        })
        obj.base = this.innerText
        getFetch(obj)
    })
})

rateButton.forEach((event) => {
    event.addEventListener('click', function () {
        rateButton.forEach((event) => {
            event.classList.remove('active')
            this.classList.add('active')
        })
        obj.rate = this.innerText
        getFetch(obj)
    })
})

function getFetch(obj) {
    if (obj.baseInput !== null) {
        fetch(`https://api.exchangerate.host/latest?base=${obj.base}&symbols=${obj.rate}`)
            .then(resp => resp.json())
            .then(data => {
                let amountOfRate = (obj.baseInput / rate).toFixed(3) //  for paragraph of rate
                let amount = (rate * obj.baseInput).toFixed(2)
                rate = Object.values(data.rates)[0]
                rateInput.value = amount

                baseParagraph.innerText = `1  ${obj.base} = ${rate.toFixed(3)} ${obj.rate}`
                rateParagraph.innerText = `1 ${obj.rate} = ${amountOfRate} ${obj.base}`
            })
            .catch((err) => {
                console.warn(err);
            })
    }
}  