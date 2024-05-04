const textFrom = document.querySelector('#textFrom')
const textTo = document.querySelector('#textTo')
const translatorBtn = document.querySelector('#translatorBtn')
const selects = document.querySelectorAll('select')

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Português (Brazil)",
}

selects.forEach((element) => {
    for (let language in countries) {
        let selected
        
        if (element.className.includes("selectFrom") && language == "pt-BR") {
            selected = "selected"
        } else if (element.className.includes("selectTo") && language == "en-GB") {
            selected = "selected"
        }

        const option = `<option value="${language}" ${selected}>${countries[language]}</option>`
        element.insertAdjacentHTML("beforeend", option)
    }
});

translatorBtn.addEventListener('click', traslateText)

async function traslateText() {
    let data = await fetch(`https://api.mymemory.translated.net/get?q=${textFrom.value}&langpair=${selects[0].value}|${selects[1].value}`)
    .then(res => res.json())
    
    validations(data)
    textTo.value = data.responseData.translatedText   
}

async function validations(data) {
    if(data.responseStatus == "200") {
        return
    } else {
            alert(`${data.responseDetails}`)
            data.responseData.translatedText = ""
    }
}