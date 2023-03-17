//----------------------------------COMMON
const LS = localStorage
const nav = document.querySelector('.nav')
const prefix = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/6/vp/medicine'
const MEDICINE = [
    {
        name: 'Paracetamol',
        type: {
            tablet: ['500','200'],
            sirop: ['30/1','120/5'],
            suppository: ['80','100','125','150','170','250','300','330']
        }
    },
    {
        name: 'Ibuprofen',
        type: {
            caps: ['200'],
            tablet: ['200','400'],
            sirop: ['100/5','200/5'],
            suppository: ['60']
        }
    }
]

async function addChildData(url, ChildAntipyretic , ChildAllergy , ChildMedicineType , ChildWeight , ChildAge ) {
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
const result = document.querySelector('#result')

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
    (async function compareUserData(url) {
        let userList = await fetch(url).then(res => res.json())
        userList.forEach(el => {
            if (el.username === LS.getItem('currentUser')) {
                LS.setItem('currentUserID', el.id)
            }
        })
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

        }
    })(prefix)
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
    location.hash = '#login'
    logoutBtn.hidden = true
    LS.removeItem('currentUser')
    LS.removeItem('currentUserID')

})
// -----------------------------------------------REGISTRATION

regBtn.addEventListener('click', (el) => {

    const regInputs = document.querySelectorAll('.reg__inputs-wrp input')
    regInputs.forEach(input => {
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
doseBtn.addEventListener('click', (el) => {
    el.preventDefault()

    let mainMed = document.querySelector('.frs-stp span[data-key="med-main"]')
    patientAllergicArr.forEach(el => {
        if (el.checked) {
            patientAllergic.push(el.value)
        }
    });
    addChildData(
        prefix, patientMedicine.value, patientAllergic,
        patientMedicineType.value, Number(patientWeight.value),
        Number(patientAge.value));
    (async function (){
        console.log('hi')
        let childFormDose = null
        let userData = await fetch(prefix + `/${LS.getItem("currentUserID")}`).then(res => res.json())
        let doseCount = function (){
            let dose = userData.ChildWeight * 10
            if(userData.ChildAntipyretic === 'Paracetamol'){
                if(userData.ChildMedicineType === "suppository" ){
                    MEDICINE[0].type.suppository.find( (el ,index,arr)=>{
                        console.log(dose)
                        if(dose < Number(el)  ){
                            let first = Number(arr[index-1])
                            console.log(first)
                            return childFormDose = Math.abs(Number(el)-dose) < Math.abs(first-dose) ? el : first
                        }
                    })
                }
                mainMed.innerText = `${userData.ChildAntipyretic}  ${userData.ChildMedicineType} ${childFormDose} `
            }
        }
        doseCount()
    })()
    location.hash = 'result'

})


//--------------------------------------------COMMON
navigation()
window.addEventListener('hashchange', navigation)
