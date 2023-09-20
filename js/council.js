/*--------------------
Vars
--------------------*/
let progress = 0
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')
const carousel = document.getElementsByClassName('carousel')[0]
const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index - active) / $items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 200))
    active = Math.floor(progress / 200 * ($items.length - 1))

    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i / $items.length) * 200 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/


const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}

/*--------------------
Listeners
--------------------*/
carousel.addEventListener('mousedown', handleMouseDown)
carousel.addEventListener('mousemove', handleMouseMove)
carousel.addEventListener('mouseup', handleMouseUp)
carousel.addEventListener('touchstart', handleMouseDown)
carousel.addEventListener('touchmove', handleMouseMove)
carousel.addEventListener('touchend', handleMouseUp)