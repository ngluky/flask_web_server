

var json_all_search = []
var length_parser = 0;
var where;


window.addEventListener('resize', (rr) => { // get event resize
    console.log('e')
    resiul() // resi tab to fit
})



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


    var c = [] // get all tab have need show
    

    
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

// resi tab to fit
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

function check_li () {
    const action = document.querySelector('.list li div.action');
    if (action.offsetParent.className == 'videos') { // I just found out there's this "offsetParent"
        return true
    }
    else return false
}

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

function have() {}