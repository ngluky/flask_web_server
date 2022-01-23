const lis_div = document.querySelectorAll('.sideBare .list li div')
const ul_background = document.querySelector('.sideBare .list ul.background')

// console.log(ul_background)

document.querySelector('.sideBare .list').addEventListener('click', () => {
    transform()
})
    
function transform() {
    lis_div.forEach((e,j) => {
        // console.log(e.className)
        if (e.className == 'action') {
            // console.log('hello')
            ul_background.style.transform = `translateY(calc(100% * ${j}))`
        }
    })
}
transform()