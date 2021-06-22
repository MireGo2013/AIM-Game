const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeController = document.getElementById('time-list-id')
const timeEl = document.getElementById('time')
const boardEl = document.getElementById('board')


let time = 0;
let score = 0;

startBtn.addEventListener('click', handlerStartBtn)

function handlerStartBtn(e) {
	e.preventDefault()
	screens[0].classList.add('up')
}

timeController.addEventListener('click', handlerTimeConroller)

function handlerTimeConroller(e) {
	if (e.target.classList.contains('time-btn')) {
		screens[1].classList.add('up')
		time = parseInt(e.target.dataset.time)
		startGame()
	}
}

boardEl.addEventListener('click', handlerCircleClick)

function handlerCircleClick(e) {
	if (e.target.classList.contains('circle')) {
		score++
		e.target.remove()
		createRandomCircle()
	}
}

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle()
	setTime(time)
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	boardEl.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}

}

function setTime(timeGame) {
	timeEl.innerHTML = `00:${timeGame}`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	circle.classList.add('circle')
	const size = getRandomNum(3, 30)
	const { width, height } = boardEl.getBoundingClientRect()
	circle.style.width = circle.style.height = size + 'px'
	circle.style.background = getRandomColor()
	const x = getRandomNum(0, width - size)
	const y = getRandomNum(0, height - size)
	circle.style.left = x + 'px'
	circle.style.top = y + 'px'
	boardEl.append(circle)

}

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
	return `rgb(${getRandomNum(0, 255)}, ${getRandomNum(0, 255)}, ${getRandomNum(0, 255)})`

}

