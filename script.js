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

let obj = { base: null, rate: null, baseInput: null, rateInput: null }, rate, base


window.addEventListener('load', () => {
    baseButton[0].classList.add('active')
    rateButton[1].classList.add('active')
    obj.base = baseButton[0].innerHTML
    obj.rate = rateButton[1].innerHTML
})

baseInput.addEventListener('keyup', () => {
    obj.baseInput = baseInput.value
    main()
})
baseButton.forEach((event) => {
    event.addEventListener('click', function () {
        baseButton.forEach((event) => {
            event.classList.remove('active')
            this.classList.add('active')
        })
        obj.base = this.innerText
        main()
    })
})

rateButton.forEach((event) => {
    event.addEventListener('click', function () {
        rateButton.forEach((event) => {
            event.classList.remove('active')
            this.classList.add('active')
        })
        obj.rate = this.innerText
        main()
    })
})


function main() {
    getFetch(obj)  //yuxarida her defe main() chagirmaq yerine getFetch(obj) yoxla
}
function getFetch(obj) {
    // && obj.rate !== null
    if (obj.baseInput !== null) {
        fetch(`https://api.exchangerate.host/latest?base=${obj.base}&symbols=${obj.rate}`)
            .then(resp => resp.json())
            .then(data => {
                // 1 obj.baseInput = obj.rate obj.rateInput

                rate = Object.values(data.rates)[0]
                let amount = (rate * obj.baseInput).toFixed(2)
                rateInput.value = amount
                let amountOfRate = (obj.baseInput / rate).toFixed(3) 
                baseParagraph.innerText =  `1  ${obj.base} = ${rate.toFixed(3)} ${obj.rate}`
                rateParagraph.innerText = `1 ${obj.rate} = ${amountOfRate} ${obj.base}`
            })
            .catch((err) => { 
                alert(err); 
            })
        }
    }
    
    
    
    
    