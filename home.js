const synthesis = window.speechSynthesis

var inputForm = document.querySelector('form')
var inputText = document.querySelector('#text-input')
var Select_voice = document.querySelector('#voice-select')
var pitch = document.querySelector('#pitch')
var pitch_Value = document.querySelector('#pitch-value')
var rate = document.querySelector('#rate')
var rate_Value = document.querySelector('#rate-value')
var volume = document.querySelector('#volume')
var volume_Value = document.querySelector('#volume-value')

var voices = []

function get_Voices() {
    voices = synthesis.getVoices()
    console.log(voices[0])
    for (i = 0; i < voices.length; i++) {
        const option = document.createElement('option')
        option.textContent = voices[i].lang + ' (' + voices[i].name + ')'

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT'
        }

        option.setAttribute('data-lang', voices[i].lang)
        option.setAttribute('data-name', voices[i].name)
        Select_voice.appendChild(option)
    }
}

get_Voices()
if (synthesis.onvoiceschanged !== undefined) {
    synthesis.onvoiceschanged = get_Voices
}

function speak() {
    if (synthesis.speaking) {

    }
    let value = inputText.value
    if (value !== null && value !== '') {
        document.body.style.background = '#141414 url(\'wave.gif\')'
        document.body.style.backgroundRepeat = 'repeat-x'
        document.body.style.backgroundSize = '100% 100%'

        const speaktext = new SpeechSynthesisUtterance(value)
        speaktext.onend = e => {
            document.body.style.background = '#141414'
            console.log('Done Speaking...')
        }
        speaktext.onerror = e => {
            console.log('Something went wrong...')
        }

        const selected_Voice = Select_voice.selectedOptions[0].getAttribute('data-name')
        voices.forEach(voice => {
            if (voice.name === selected_Voice) {
                speaktext.voice = voice
            }
        })
        speaktext.rate = rate.value
        speaktext.pitch = pitch.value
        speaktext.volume = volume.value
        synthesis.speak(speaktext)
    }
}
inputForm.addEventListener('submit', e => {
    e.preventDefault()
    speak()
    inputText.blur()
})
rate.addEventListener('change', e => rate_Value.textContent = rate.value)
pitch.addEventListener('change', e => pitch_Value.textContent = pitch.value)
volume.addEventListener('change', e => volume_Value.textContent = (volume.value) * 100)