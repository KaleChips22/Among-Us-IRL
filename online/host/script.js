let GAME_ID

// fetch('https://amongusserver.xnor.repl.co/newgame', {
//     headers: {
//         Accept: 'application/json'
//     }
// }).then(response => response.text())
//     .then(text => console.log(text))

const req = new XMLHttpRequest()
req.addEventListener('load', () => console.log(this.responseText))
req.open('GET', 'https://amongusserver.xnor.repl.co/newgame')
req.send()