let GAME_ID,
    dataCheck

fetch('https://amongusserver.xnor.repl.co/newgame', {
    headers: {
        Accept: 'application/json'
    },
    method: 'GET'
}).then(response => response.text())
.then(text => {
    GAME_ID = JSON.parse(text).id

    document.getElementById('code').innerText = GAME_ID

    dataCheck = setInterval(() => {
        fetch('https://amongusserver.xnor.repl.co/data/' + GAME_ID, {
            headers: {
                Accept: 'application/json'
            },
            method: 'GET'
        }).then(response => response.text())
        .then(text => {
            let data = JSON.parse(text)
            // console.log(data)
            document.getElementById('players').innerHTML = data.players.map(p => p.name).join('<br>')
    
            if (data.started) {
                gameStart()
            }
        })
    }, 500)
})

// GAME_ID = parseInt(document.getElementById('code').innerText)

function startGame() {
    fetch('https://amongusserver.xnor.repl.co/start/' + GAME_ID, {
        headers: {
            Accept: 'application/json'
        },
        method: 'POST'
    }).then(response => response.text()).then(text => console.log(text))
}

function gameStart() {
    clearInterval(dataCheck);
    [...document.querySelectorAll('.title'), ...document.querySelectorAll('.roles')].forEach(e => {
        e.remove()
    })
    document.querySelector('.button').classList.add('big')
}