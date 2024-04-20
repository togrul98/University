let word = document.querySelector('#word');
let popup = document.querySelector('#popup-container')
let messages = document.querySelector('#luck')
let Letters = document.getElementById('wrong-letters')
let items = document.querySelectorAll('.item')
let message = document.getElementById('message')
let PlayAgainBTN = document.getElementById('play-again')

let correctLetters = []
let wrongLetters = [];
let journal = toqrul();

function toqrul(){
    let words=['javascript', 'java', 'python', 'css'];
    return words[Math.floor(Math.random()*words.length)]
}

function displayWord(){
    

    word.innerHTML = `
       ${journal.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>   
        `).join('')}

    `;
    let r = word.innerText.replace(/\n/g, '');
    if(r===journal){
        popup.style.display='flex'
        messages.innerText='Təbriklər qazandın'
    }
}

function updateWrongLetters(){
     Letters.innerHTML = `
     ${wrongLetters.length>0? '<h3>Wrong words</h3>': ''}
     ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
     `

    items.forEach((item,index)=>{
        let errorCount=wrongLetters.length
        if(index<errorCount){
           item.style.display='block'
        }else{
            item.style.display='none'
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display='flex'
        messages.innerText='Uduzdun'
     }

}



function displayMessage(){
    message.classList.add('show')

    setTimeout(function(){
        message.classList.remove('show')
    }, 2000)
}

PlayAgainBTN.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    journal=toqrul();
    displayWord();
    updateWrongLetters();

    popup.style.display='none';
});


window.addEventListener('keydown', function(l){
    if(l.keyCode >= 13 && l.keyCode <= 229){
         let letter = l.key
        if(journal.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                displayMessage()
            }
         }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()
            }
            else{
                displayMessage()
            }
        }
    }
})

displayWord()