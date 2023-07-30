let gamestate = 0

const GOOD = 0
const BAD = 1
const NEUT = 2

const roles = [
    ['Crewmate', GOOD],
    ['Imposter', BAD],
    ['Medic', GOOD],
    ['Spy', GOOD],
    ['Sheriff', GOOD],
    ['Mayor', GOOD],
    ['Glitch', BAD],
    ['Assassin', BAD],
    ['Yin-Yang', NEUT],
    ['Shifter', NEUT],
    ['Jester', NEUT],
    ['Troll', NEUT],
    ['Dual Wielder', NEUT],
    ['Witch', NEUT],
    ['Giant', GOOD],
    ['Arsenist', BAD],
    ['Ghost', GOOD],
    ['Avenger', GOOD],
    ['Theif', NEUT]
]

const colorKey = ['#55dd55', '#ff5555', '#5555ff']

let rolesList = []

function assignRole(elem, chain = false) {
    let r = roles[random(roles.length)]
    const role = new Role(r[0], r[1])

    if (role.name == 'Dual Wielder') {
        for (let i = 0; i < 2; i++) {
            let subrole = assignRole(null, true)
            while (subrole.name == 'Dual Wielder' || role.subroles.map(e => e.name).includes(subrole.name)) {
                subrole = assignRole(null, true)
            }
            role.subroles.push(subrole)
        }
    }
    if (chain) return role

    rolesList.push(role)
    elem.innerText = role.name + (role.subroles.length > 0 ? ' | ' + role.subroles.map(e => e.name).join(' + ') : '')

    elem.style.backgroundColor = colorKey[role.team]

    setTimeout(() => {
        elem.innerText = 'Click for Role'
        elem.style.backgroundColor = '#888'
    }, 1000 + (1500 * role.subroles.length))
}

class Role {
    constructor(name, team) {
        this.name = name
        this.team = team
        this.subroles = []
        this.id = this.assignId()
        return this
    }

    assignId() {
        const charset = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
        let res = ''
        for (let i = 0; i < 8; i++) {
            if (i == 4) res += '-'
            res += charset[random(charset.length)]
        }
        return res
    }
}

function random(max) {
    return Math.floor(Math.random() * max)
}

function game(elem) {
    let role = document.getElementById('role')
    let rolesListElem = document.getElementById('roles-list')
    let button = document.getElementById('button')
    gamestate = (gamestate + 1) % 3
    switch (gamestate) {
        case 0:
            elem.innerText = 'Start Game'
            role.style.display = 'inline'
            rolesList = []
            rolesListElem.innerHTML = ''
            break
        case 1:
            elem.innerText = 'End Game'
            role.style.display = 'none'
            button.classList.add('big')
            break
        case 2:
            elem.innerText = 'New Game'
            button.classList.remove('big')
            rolesListElem.innerHTML = '[' + rolesList.map(e => `<span style="color: ${colorKey[e.team]};">${e.name + (e.subroles.length > 0 ? ' | ' + e.subroles.map(e => e.name).join(' + ') : '')}</span>`).join('] [') + ']'
            break
    }
}

const sound = new Audio('sound.mp3')

function playSound() {
    if (gamestate == 1) sound.play()
}