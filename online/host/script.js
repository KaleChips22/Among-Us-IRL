let GAME_ID

fetch('https://amongusserver.xnor.repl.co/newgame', {
    headers: {
        Accept: 'application/json'
    }
}).then(response => response.text())
    .then(text => console.log(text))