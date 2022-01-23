
const lee = document.querySelectorAll('span.span');
const icon = document.querySelectorAll('.sideBare .list li ion-icon')
const fu = document.getElementById('fu')
const sideBare = document.querySelector('.sideBare');
const root = document.documentElement.style;
const lis_div = document.querySelectorAll('.sideBare .list li div')
const lis = document.querySelectorAll('.sideBare .list li')
const ul_background = document.querySelector('.sideBare .list ul.background')
const tab_input = document.querySelector('.tab_input')



document.querySelector('.action span').style.color = 'black';
document.querySelector('.action ion-icon').style.color = 'black'

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}


const setwidth = function () { 
    // console.log(sideBare)
    if (sideBare.classList[1] == 'full') {
        root.setProperty('--width-', '190px');
        fu.name = "arrow-back-circle-outline"

        // sleep(200).then(() => {
        for (i of lee) {
            i.style.opacity = '1';
        }
        // })
        
         
    }
    else {
        root.setProperty('--width-', '45px');
        fu.name = "arrow-forward-circle-outline"
        // document.querySelector('.title span').style.display = 'none';
        for (i of lee) {
            i.style.opacity = '0';
        }

    }
}

setwidth();


// resize starbar
fu.addEventListener('click', function(eee) {
    

    if (sideBare.classList[1] == 'full') {
        sideBare.classList.remove('full');
        sideBare.classList.add('no-full')
        setwidth();

    }
    else {
        sideBare.classList.remove('no-full')
        sideBare.classList.add('full')
        setwidth();

        // }
    }
})

const tab = function () { // Highlight tab selection
    document.querySelectorAll('.list li div').forEach((el) => {
        el.classList.remove('action')
    })

    setcolor_icon()
    setcolor_span()
}

function setcolor_icon() {
    document.querySelectorAll('.list li div ion-icon').forEach((el) => {
        el.style.color = 'white'
    })
}

function setcolor_span() {
    document.querySelectorAll('.list li div span').forEach((el) => {
        el.style.color = 'white'
    })
}

// setcolor_icon()

document.querySelector('.list').addEventListener('click', (e) => {
    const path = e.path[e.path.length - 8];
    const li = (e.path[e.path.length - 7]).classList
    // console.log(li[0]);

    if (li != 'i') {

        tab(); // Highlight tab selection

        path.classList.add('action')

        document.querySelector('.action ion-icon').style.color = 'black';// background white text color black
        document.querySelector('.action span').style.color = 'black';// background white icon color black
    }


})

const box_search = document.querySelector('#search');

box_search.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        // const main = document.querySelector('.body .main');

        search() // NOT YET

    }
})


document.querySelector('#button_search').addEventListener('click', (e) => {
    search()// NOT YET
}) 





document.querySelector('.se ion-icon').addEventListener('click', (e) => {
    document.querySelector('#search').value = '';
})


document.querySelector('.sideBare .list').addEventListener('click', () => {
    transform()
})
    
function transform() {
    lis_div.forEach((e,j) => {
        console.log(e)
        if (e.className == 'action') {
            // console.log('hello')
            ul_background.style.transform = `translateY(calc(100% * ${j}))`
        }

        

    })
}
transform()



function get_tab_input(index) {
    fetch('/tabinput', {
        method: 'POST',
        body: JSON.stringify({'index': index})
    }).then((e) => {
        console.log(e.text)
    })
}

function test () { // name tell everything
    fetch('/search', {
        method: 'POST',
        body: JSON.stringify({text: "hello"})
    })
    .then((e) => e.json())
    .then(data => {
            console.log(data)
        })
}