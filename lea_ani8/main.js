
const lee = document.querySelectorAll('span.span');
const icon = document.querySelectorAll('.sideBare .list li ion-icon')
const fu = document.getElementById('fu')
const sideBare = document.querySelector('.sideBare');
const root = document.documentElement.style;


var json_all_search = []
var length_parser = 0;
var where;

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

function load_parser(parser) {
    console.log(parser)

    if (parser > length_parser.length || parser <= 0) {
        return;
    }

    where = parser
    const main = document.querySelector('.body .main');
    main.innerHTML = '';
    var path = document.createElement('div')
    path.className = 'pass'
    const status = (parser - 1) * 24
    json_parser = json_all_search.slice(status, status + 24)
    json_parser.forEach((json) => {
        if (json.url.includes('&')) {
            const url = json.url;
            json.url = url.slice(0,url.indexOf('&'))
        }
        var el = document.createElement('ul');
        el.innerHTML = `
        <div>
            <img src="https://i.ytimg.com/vi/${json.url}/hqdefault.jpg" alt="Monsieur Tuna">
            <div class="content">
                <span>${json.title}</span>
                <span class='text'>${json.text}</span>
            </div>
            <div class='expand-outline'>
                <ion-icon name="expand-outline"></ion-icon>
            </div>
        </div>
        `;

        path.appendChild(el);

    })

    main.appendChild(path)
    index_parser()

    sleep(500).then(() => {
        resiul();
    })
}

function index_parser() {
    // var entiti = document.createElement('div');


    // lấy các trang để hiện thị
    var c = []
    
    if (length_parser.length <= 5){
        c = length_parser
    }

    else if (length_parser.length - where < 2) {
        c = length_parser.slice(length_parser.length - 5 , length_parser.length)
    }
    else if (where - 2 <= 0) {
        c = length_parser.slice(0 , 5)
    }
    
    else {
        c = length_parser.slice(where-3 , where+2)
    }
    
    console.log(c)

    // const index_parser = document.querySelector('.index_parser');
    const index_parser = document.createElement('div');
    index_parser.className = 'index_parser'

    // index_parser.innerHTML = ''
    var child = document.createElement('div');


    child = document.createElement('div');
    child.className = 'next'
    child.onclick = function onclick(e) {
        back_parent()
    }

    child.innerHTML = '<ion-icon name="arrow-back-outline"></ion-icon>'

    index_parser.appendChild(child);



    for (i of c) {

        child = document.createElement('div');

        if (i == where){
            child.className = `tab_action` ;
            child.innerHTML = i;
        }
        else {
            child.className = `tab`;
            child.innerHTML = i;
        }

        child.onclick = function onclick(e) {
            load_parser((e.target.innerHTML) * 1);
            console.log(e.target.innerHTML)
        }

        index_parser.appendChild(child);
    }


    child = document.createElement('div');
    child.className = 'next'
    child.onclick = function onclick(e) {
        next_parent()
    }

    child.innerHTML = '<ion-icon name="arrow-forward-outline"></ion-icon>'

    index_parser.appendChild(child);

    document.querySelector('.body .main').appendChild(index_parser)

}

function next_parent() {
    if (!((where + 1) > length_parser)) {
        load_parser(where + 1)
    }
}

function back_parent() {
    if (!((where - 1) < 0)) {
        load_parser(where - 1)
    }
}



const resiul = function () {
    const imgs = document.querySelectorAll('.main ul img')
    const spans = document.querySelectorAll('.main ul span')


    document.querySelectorAll('.main ul').forEach((e) => {
        e.style.height = `${e.offsetWidth *1.3}px`;
        // console.log(e.offsetWidth)

        imgs.forEach((img) => {
            img.style.height = `${e.offsetHeight * 5/12}px`
        })

        const width = e.offsetWidth * 90/100
        console.log(width)
        spans.forEach((span) => {
            
            span.style.fontSize = `${width * 17/225}px`
        })

        // e.offsetWidth * 90/100

    })
    
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

// window.read


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

const tab = function () {
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

        tab();

        path.classList.add('action')

        document.querySelector('.action ion-icon').style.color = 'black'
        document.querySelector('.action span').style.color = 'black';
    }


})

const box_search = document.querySelector('#search');

box_search.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        // const main = document.querySelector('.body .main');

        search()

    }
})


document.querySelector('#button_search').addEventListener('click', (e) => {
    search()
})


function search() {

    const text = box_search.value;
    const mes = document.querySelector('.tile-container .container .files .text span');
    // fetch(`/data/?text=${text}`)
    
    if (text.length > 0){
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify({'text': text})
        })
        .then((e) => {
            e.json().then((data) => {

                mes.innerHTML = '';
                mes.appendChild(
                    document.createTextNode(`có ${data.length} videos có từ: ${text}`) // thông báo
                )

                json_all_search = data
                length_parser = data.length / 24
                
                if ((Math.round(length_parser) - length_parser) < 0) {
                    length_parser = range(1, Math.round(length_parser) + 1)
                }
                
                else if ((Math.round(length_parser) == length_parser )) {
                    length_parser = range(1, Math.round(length_parser))
                    
                }

                else {
                    length_parser = range(1, Math.round(length_parser))
                    
                }
                
                load_parser(1)

                
            })

        })
    }
}


document.querySelector('.se ion-icon').addEventListener('click', (e) => {
    document.querySelector('#search').value = '';
})

window.addEventListener('resize', (rr) => {
    console.log('e')
    resiul()
})






document.querySelector('.container .files .icon').addEventListener('click', () =>{
    const entiti = document.querySelector('.tile-container').classList;
    console.log(typeof entiti)
    console.log(entiti)
    if (entiti[1]){
        entiti.remove('full');

        document.querySelector('.container .files .icon ion-icon').name = 'chevron-down-outline';
    }
    else {
        document.querySelector('.container .files .icon ion-icon').name = 'chevron-up-outline';
        entiti.add('full')


    }
    // if (entiti)
})
setwidth();


function test () {
    fetch('/search', {
        method: 'POST',
        body: JSON.stringify({text: "hello"})
    })
    .then((e) => e.json())
    .then(data => {
            console.log(data)
        })
}


