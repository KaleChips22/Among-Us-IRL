let GAME_ID

const waitForStart = () => setInterval(() => {
    fetch('https://amongusserver.xnor.repl.co/data/' + GAME_ID, {
        headers: {
            Accept: 'application/json'
        },
        method: 'GET'
    }).then(response => response.text()).then(text => {
        let data = JSON.parse(text)

        if (data.started) {
            document.getElementById('label').innerText = 'Game Started'
        }
    })
}, 500)

function joined() {
    document.querySelector('form').style.display = 'none'
    const text = document.createElement('div')
    text.classList.add('title')
    text.id = 'label'
    text.innerText = 'Waiting for host to start the game...'

    document.body.append(text)

    waitForStart()
}