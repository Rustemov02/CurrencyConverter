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
   //               base , rate => string       base,rateInput = number             
let obj = { base: null, rate: null, baseInput: 0, rateInput: 0 }, rate, base ,reValue = 0 , baseAmount

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
rateInput.addEventListener('keyup' , ()=>{
    obj.rateInput = rateInput.value  
    // obj.rate = USD
    // obj.base = RUB
    // obj.baseInput = sol teref inputu
    // obj.rateInpur = sagh teref inputu 
    reValue = obj.baseInput * obj.rateInput 
    //ters function uchun reValue / rate(getFetch daxilindeki ) olmalidir
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
                // console.log( "base amount : " + obj.baseInput * obj.rate / rateInput.value ) 

                rate = Object.values(data.rates)[0] 
                baseAmount = reValue / rate 
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
    

    function deneme(deger) {
        console.log("deneme function : " + deger)
    }
    
    
    
    