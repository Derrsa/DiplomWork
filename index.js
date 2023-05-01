//----------------------------------COMMON
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const LS = localStorage
const nav = document.querySelector('.nav')
const prefix = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/6/vp/medicine'
const MEDICINE = [
    {
        name: 'Paracetamol',
        type: {
            tablet: ['500', '200'],
            sirop: ['30/1', '120/5'],
            suppository: ['80', '100', '125', '150', '170', '250', '300', '330']
        }
    },
    {
        name: 'Ibuprofen',
        type: {
            caps: ['200'],
            tablet: ['200', '400'],
            sirop: ['100/5', '200/5'],
            suppository: ['60']
        }
    }
]

async function addChildData(url, ChildAntipyretic, ChildAllergy, ChildMedicineType, ChildWeight, ChildAge) {
    let userData = await fetch(url + `/${LS.getItem("currentUserID")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ChildAntipyretic,
            ChildAllergy,
            ChildMedicineType,
            ChildWeight,
            ChildAge
        })
    });
}

async function getUser() {
    let data = await fetch(prefix + `/${LS.getItem("currentUserID")}`)
    let res = await data.json()
    return res
}

let childFormDose = null


function paracetamolCount(doseHTML, formHTML, userInfo, userMed) {
    if (doseHTML.closest('p').style.display === 'none') {
        doseHTML.closest('p').style.display = 'block'
    }
    let dose = userInfo.ChildWeight * 10

    if (userInfo.ChildMedicineType === "suppository") {
        doseHTML.innerText = `One suppository`
        MEDICINE[0].type.suppository.find((el, index, arr) => {
            if (dose <= 80) {
                return childFormDose = '80'
            } else if (dose >= 330) {
                return childFormDose = '330'
            }
            if (dose < Number(el)) {
                let first = Number(arr[index - 1])
                return childFormDose = Math.abs(Number(el) - dose) < Math.abs(first - dose) ? el : first
            }
        })
    } else if (userInfo.ChildMedicineType === "tablet") {
        doseHTML.innerText = `One tablet`
        if (dose > 150 && dose < 200) {
            childFormDose = '200'
        } else if (dose > 200 && dose < 300) {
            doseHTML.innerText = `One and half tablet`
            childFormDose = '200'
        } else if (dose > 300) {
            childFormDose = '400'
        } else if (dose < 150) {
            doseHTML.closest('p').style.display = 'none'
            formHTML.innerText = `another form`
            return
        }
    } else if (userInfo.ChildMedicineType === "sirop") {
        childFormDose = '120/5'
        doseHTML.innerText = `${(dose * 5 / 120).toFixed(1)}ml`
    }
    formHTML.innerText = `${userMed}  ${userInfo.ChildMedicineType} ${childFormDose}mg `
}

function ibuprofenCount(doseHTML, formHTML, userInfo, userMed) {

    if (doseHTML.closest('p').style.display === 'none') {
        doseHTML.closest('p').style.display = 'block'
    }
    let dose = userInfo.ChildWeight * 10
    dose.toFixed(1)
    if (userInfo.ChildMedicineType === "suppository") {

        if (userInfo.ChildWeight <= 6) {
            doseHTML.innerText = `One suppository`
            childFormDose = '60'
        } else if (userInfo.ChildWeight <= 12) {
            doseHTML.innerText = `Two suppository`
            childFormDose = '60'
        } else {
            doseHTML.closest('p').style.display = 'none'
            formHTML.innerText = `another form`
            return
        }
    } else if (userInfo.ChildMedicineType === "tablet") {
        doseHTML.innerText = `One  tablet`
        if (userInfo.ChildWeight > 10 && userInfo.ChildWeight < 15) {
            doseHTML.innerText = `Half tablet`
            childFormDose = '200'
        } else if (userInfo.ChildWeight >= 15 && userInfo.ChildWeight <= 30) {
            childFormDose = '200'
        } else if (userInfo.ChildWeight >= 30) {
            childFormDose = '400'
        } else if (userInfo.ChildWeight < 10) {
            doseHTML.closest('p').style.display = 'none'
            formHTML.innerText = `another form`
            return
        }
    } else if (userInfo.ChildMedicineType === "sirop") {
        if (userInfo.ChildWeight <= 10) {
            childFormDose = '100/5'
            doseHTML.innerText = `${dose.toFixed(1) * 5 / 100}ml`
        } else if (userInfo.ChildWeight > 10) {
            childFormDose = '200/5'
            doseHTML.innerText = `${(dose * 5 / 200).toFixed(1)}ml`
        }

    }
    formHTML.innerText = `${userMed}  ${userInfo.ChildMedicineType} ${childFormDose}mg `
}


//---------------------------------LOGIN
const login = document.querySelector('#login')
const loginName = document.querySelector('#login__user')
const loginPassword = document.querySelector('#login__pasw')
const loginBtn = document.querySelector('.login__btn')
const logoutBtn = document.querySelector('.nav__list a[href="#login"]')
const loginRegBtn = document.querySelector('.login__reg')


//---------------------------------REGISTRATION
const reg = document.querySelector('#reg')
const regEmail = document.querySelector('#reg__email')
const regPassword = document.querySelector('#reg__pass')
const regChild = document.querySelector('#reg__child')
const regBtn = document.querySelector('.reg__btn')
const regBtnDone = document.querySelector('.reg__btn-back')
//-----------------------------------------------------
const present = document.querySelector('#present')

const recommend = document.querySelector('#recommend')
// ----------------------------------------------------DOSE-COUNT
const doseCount = document.querySelector('#dose-count')
const doseForm = document.querySelector('#dose_count__form')
const patientAge = doseForm.age
const patientWeight = doseForm.weight
const patientMedicine = doseForm.preferMedicine
const patientFeverType = doseForm.isCold
const patientMedicineType = doseForm.medForm
const patientAllergicArr = document.querySelectorAll('#dose_count__form   input[type="checkbox"]')
const doseBtn = document.querySelector('.dose_count__btn')
const patientAllergic = []
// ----------------------------------------------------
const donate = document.querySelector('#donate')
// ----------------------------------------------------RESULT
const result = document.querySelector('#result')
let firstResult = document.querySelector('.frs-stp')
let waitHour = document.querySelector('.wait-one-hour')
let secondResult = document.querySelector('.result__second-question')
let secondResultPositive = document.querySelector('.result__second-answer_pos')
let secondResultNegative = document.querySelector('.result__second-answer_neg')
let thirdQuestion = document.querySelector('.result__third-question')
let thirdResult = document.querySelector('.result__third-answer')


function hideBlocks() {
    result.hidden = true
    login.style.display = 'none'
    present.style.display = 'none'
    recommend.hidden = true
    doseCount.hidden = true
    donate.hidden = true
    reg.hidden = true
    nav.hidden = true
}

function navigation() {
    hideBlocks()
    switch (location.hash) {
        case '#present':
            present.style.display = 'grid'
            nav.hidden = false
            break
        case '#login':
            login.style.display = 'flex'

            break
        case '#result':
            result.hidden = false
            nav.hidden = false
            break
        case '#donate':
            donate.hidden = false
            nav.hidden = false
            break
        case '#dose-count':
            doseCount.hidden = false
            nav.hidden = false
            break
        case '#recommend':
            recommend.hidden = false
            nav.hidden = false
            break
        case '#reg':
            reg.hidden = false
            break
        default:
            login.style.display = 'flex'
    }
}

// -----------------------------------------------USER
loginBtn.addEventListener('click', (el) => {
    if (!loginName.value && !loginPassword.value) {
        loginPassword.classList.add('alert')
        document.querySelector('.login__password-block .alert__text ').style.display = 'inline'
        loginName.classList.add('alert')
        document.querySelector('.login__user-block .alert__text ').style.display = 'inline'
        return
    } else if (!loginName.value) {
        loginName.classList.add('alert')
        document.querySelector('.login__user-block .alert__text ').style.display = 'inline'
        return;
    } else if (!loginPassword.value) {
        loginPassword.classList.add('alert')
        document.querySelector('.login__password-block .alert__text ').style.display = 'inline'
        return;
    }
    (async function () {
        let userList = await fetch(prefix).then(res => res.json())
        console.log(userList)

        let userExist = userList.some(el => {
            if (el.username === loginName.value) {
                return true
            } else {
                loginName.classList.add('alert')
                document.querySelector('.login__user-block .alert__incorrect ').style.display = 'inline'
            }
        })
        let correctPassword = userList.some(el => {
            if (el.username === loginName.value) {
                return el.password === loginPassword.value
            } else {
                loginPassword.classList.add('alert')
                document.querySelector('.login__password-block .alert__incorrect ').style.display = 'inline'
                return false
            }
        })
        if (userExist && correctPassword) {
            location.hash = '#present'
            logoutBtn.style.display = 'inline'
            LS.setItem('currentUser', loginName.value)
            userList.forEach(el => {
                if (el.username === LS.getItem('currentUser')) {
                    console.log('hi')
                    LS.setItem('currentUserID', el.id)
                }
            })
        }
    })()


    el.preventDefault()
})

loginName.addEventListener('focus', () => {
    loginName.classList.remove('alert')
    document.querySelector('.login__user-block .alert__text ').style.display = 'none'
    document.querySelector('.login__user-block .alert__incorrect ').style.display = 'none'
})

loginPassword.addEventListener('focus', () => {
    loginPassword.classList.remove('alert')
    document.querySelector('.login__password-block .alert__text ').style.display = 'none'
    document.querySelector('.login__password-block .alert__incorrect ').style.display = 'none'
})

loginRegBtn.addEventListener('click', (el) => {
    location.hash = '#reg'
    document.querySelector('.reg__title').hidden = false
    document.querySelector('.reg__inputs-wrp').style.display = 'grid'
    regBtn.hidden = false
    document.querySelector('.reg__done').style.display = 'none'
})

logoutBtn.addEventListener('click', (el) => {
    loginName.classList.remove('alert')
    loginPassword.classList.remove('alert')
    document.querySelector('.login__user-block .alert__text ').style.display = 'none'
    document.querySelector('.login__user-block .alert__incorrect ').style.display = 'none'
    document.querySelector('.login__password-block .alert__text ').style.display = 'none'
    document.querySelector('.login__password-block .alert__incorrect ').style.display = 'none'
    loginName.value = ''
    loginPassword.value = ''
    location.hash = '#login'
    logoutBtn.hidden = true
    LS.removeItem('currentUser')
    LS.removeItem('currentUserID')

})
// -----------------------------------------------REGISTRATION
function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}
regBtn.addEventListener('click', (el) => {

    const regInputs = document.querySelectorAll('.reg__inputs-wrp input')
    regInputs.forEach(input => {
        if(input === regEmail){
            if(!isEmailValid(regEmail.value)){
                alert('Incorrect email')
                return;
            }
        }

        if (!input.value) {
            input.placeholder = 'Please fill out '
            input.style.borderColor = 'red'
            return
        }
        input.addEventListener('focus', () => {
            input.placeholder = ''
            input.style.borderColor = 'black'
        })
    })
    if (regEmail.value && regPassword.value && regChild.value) {
        fetch(prefix, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: regEmail.value,
                password: regPassword.value,
                ChildName: regChild.value
            })
        });
        document.querySelector('.reg__title').hidden = true
        document.querySelector('.reg__inputs-wrp').style.display = 'none'
        regBtn.hidden = true
        document.querySelector('.reg__done').style.display = 'flex'
        regInputs.forEach(input => {
            input.value = ''
        })
    }
})

regBtnDone.addEventListener('click', (el) => {
    location.hash = '#login'
})

// -----------------------------------------------GET-DOSE
patientWeight.addEventListener('focus', (el) => {
    el.target.classList.remove('alert')

})
doseBtn.addEventListener('click', (el) => {
    el.preventDefault()
    let mainMed = document.querySelector('.frs-stp span[data-key="med-main"]')
    let mainDose = document.querySelector('.frs-stp span[data-key="dose"]')
    if (patientWeight.value === '') {
        patientWeight.classList.add('alert')
        return
    }
    patientAllergicArr.forEach(el => {
        if (el.checked) {
            patientAllergic.push(el.value)
        }
    });
    (async function () {
        document.querySelector('ul[data-key="white"]').style.display = 'block'
        document.querySelector('ul[data-key="red"]').style.display = 'block'
        let usersData = await fetch(prefix + `/${LS.getItem("currentUserID")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ChildAntipyretic: patientMedicine.value,
                ChildAllergy: patientAllergic,
                ChildMedicineType: patientMedicineType.value,
                ChildWeight: Number(patientWeight.value),
                ChildAge: Number(patientAge.value)
            })
        });
        let userData = await getUser()
        if (userData.ChildAntipyretic === 'Paracetamol') {
            paracetamolCount(mainDose, mainMed, userData, userData.ChildAntipyretic)
        } else if (userData.ChildAntipyretic === 'Ibuprofen') {
            ibuprofenCount(mainDose, mainMed, userData, userData.ChildAntipyretic)
        }
        // doseCountFoo(mainDose,mainMed,userData)
        if (patientFeverType.value === 'white') {
            document.querySelector('ul[data-key="red"]').style.display = 'none'
        } else {
            document.querySelector('ul[data-key="white"]').style.display = 'none'
        }
    })()
    firstResult.style.display = 'block'
    waitHour.style.display = 'none'
    secondResult.style.display = 'none'
    secondResultPositive.style.display = 'none'
    secondResultNegative.style.display = 'none'
    thirdQuestion.style.display = 'none'
    thirdResult.style.display = 'none'
    location.hash = 'result'


})

function clock(clockContainer, blockHide, blockShow, time) {
    let clock = document.createElement('div')
    clockContainer.append(clock)
    clock.classList.add('clock')
    let hour = document.createElement('div')
    let minute = document.createElement('div')
    let second = document.createElement('div')
    hour.classList.add('hr')
    minute.classList.add('mn')
    second.classList.add('sc')
    clock.append(hour)
    clock.append(minute)
    clock.append(second)
    const hr = document.querySelector('.hr');
    const sc = document.querySelector('.sc');
    const mn = document.querySelector('.mn');
    let oneHours = 0
    let secondCounter = 0
    let minuteCounter = 0
    sc.style.transform = `rotateZ(0deg)`
    mn.style.transform = `rotateZ(0deg)`
    let timer = setInterval((el) => {
        if (oneHours === Number(time)) {
            blockHide.style.display = 'none'
            blockShow.style.display = 'block'
            clockContainer.innerHTML = ''
            clearInterval(timer)

        }
        if (oneHours % 60 === 0 && oneHours !== 0) {
            minuteCounter += 6
            mn.style.transform = `rotateZ(${minuteCounter}deg)`;
        }
        oneHours += 1
        secondCounter += 6
        sc.style.transform = `rotateZ(${secondCounter}deg)`;
        console.log(oneHours)
    }, 1000)
}

// -----------------------------------------------RESULT

document.querySelector('.frs-stp-btn').addEventListener('click', (el) => {
    firstResult.style.display = 'none'
    waitHour.style.display = 'block'
    clock(document.querySelector('.container__clock'), waitHour, secondResult, 15)

})
// -----------------------------------------------RESULT-SECOND--YES
document.querySelector('button[data-key="fst-yes"]').addEventListener('click', (el) => {
    secondResult.style.display = 'none'
    secondResultPositive.style.display = 'flex'
})

document.querySelector('.second-answer_pos__btn').addEventListener('click', el => {
    location.hash = 'present'
    el.preventDefault()
})

// -----------------------------------------------RESULT-SECOND--NO
let extraForm = document.querySelector('span[data-key="med-extra"]')
let extraDose = document.querySelector('span[data-key="dose-extra"]')
document.querySelector('button[data-key="fst-no"]').addEventListener('click', (el) => {
    secondResult.style.display = 'none';
    secondResultNegative.style.display = 'block';
    (async () => {
        let userData = await getUser()
        let extraMed = userData.ChildAntipyretic === 'Paracetamol' ? 'Ibuprofen' : "Paracetamol"
        if (extraMed === 'Paracetamol') {
            paracetamolCount(extraDose, extraForm, userData, extraMed)
        } else if (extraMed === 'Ibuprofen') {
            ibuprofenCount(extraDose, extraForm, userData, extraMed)
        }

    })();


    clock(document.querySelector('.container__clock-copy'), secondResultNegative, thirdQuestion, 15)
})

// -----------------------------------------------ANSWER-THIRD--YES

document.querySelector('button[data-key="scd-yes"]').addEventListener('click', (el) => {
    thirdQuestion.style.display = 'none'
    secondResultPositive.style.display = 'flex'
})
// -----------------------------------------------ANSWER-THIRD--NO
document.querySelector('button[data-key="scd-no"]').addEventListener('click', (el) => {
    thirdQuestion.style.display = 'none'
    thirdResult.style.display = 'block'

})
document.querySelector('.third-answer__btn').addEventListener('click', el => {
    location.hash = 'present'
    el.preventDefault()
})
//--------------------------------------------COMMON
navigation()
window.addEventListener('hashchange', navigation)




let burger = document.querySelector('.burger-menu')
let burgerLineOne = document.querySelector('.burger-line:first-of-type')
let burgerLineTwo = document.querySelector('.burger-line:nth-of-type(2)')
let burgerLineThree = document.querySelector('.burger-line:last-of-type')
let menuLink = document.querySelectorAll('.nav__item')

burger.addEventListener('click', ()=>{
    burger.classList.toggle('burger-menu-active')
    nav.classList.toggle('nav-active')

    document.querySelector('body').classList.toggle('stop-scroll')

})

menuLink.forEach(el => {
    el.addEventListener('click', ()=>{
        burger.classList.toggle('burger-menu-active')
        nav.classList.toggle('nav-active')
        document.querySelector('body').classList.toggle('stop-scroll')
    })
})
//
// document.querySelector('.burger__wrapper').addEventListener('click', ()=>{
//     document.querySelector('.burger__wrapper').classList.toggle('burger__wrapper-active')
//
// })






