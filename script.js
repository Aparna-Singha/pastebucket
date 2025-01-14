let count = 0;
const button = document.querySelector('#add');
let data = {}

loadData()
loadSidebar()

function saveData() {
    localStorage.setItem('data', JSON.stringify(data))
    localStorage.setItem('count', count)
}
function loadData() {
    data = JSON.parse(localStorage.getItem('data')) || {}
    count = localStorage.getItem('count') || 0
}

function loadSidebar() {
    for (let id in data) {
        let p = data[id].name
        let bucketidx = id
        let list_bar = document.querySelector(".list")
        let bar_button = document.createElement('button')
        bar_button.innerText=p
        bar_button.classList.add('sbb')
        bar_button.classList.add('b-' + bucketidx)
        list_bar.append(bar_button)
        bar_button.addEventListener('click' , () => {
            loadbucket(bucketidx)
        })
    }
}

button.addEventListener('click' , function(event){
    let p = prompt("enter your fucking file name : ")
    if(!p) return
    let bucketidx = count
    let list_bar = document.querySelector(".list")
    let bar_button = document.createElement('button')
    bar_button.innerText=p
    bar_button.classList.add('sbb')
    bar_button.classList.add('b-' + bucketidx)
    list_bar.append(bar_button)
    data[bucketidx] = {
        name: p,
        content: ''
    }
    bar_button.addEventListener('click' , () => {
        loadbucket(bucketidx)
    })
    count++;
    saveData()
})

function loadbucket(id){
    let header= document.querySelector('.main-container > .header')
    header.innerHTML = `
        <h2>${data[id].name}</h2>

        <div class="action">
        <button class="button">
            <i class="fa fa-trash"></i>
        </button>
        <button class="button">
            <i class="fa fa-times"></i>
        </button>
        <button class="button">
            <i class="fa fa-pencil"></i>
        </button>
        </div>
    `

    let code = document.querySelector(".code")
    let codeClone = code.cloneNode(true);

    code.parentNode.replaceChild(codeClone, code);
    code = codeClone;

    code.value = data[id].content
    code.disabled = false
    
    let evt = code.addEventListener('keyup' , function(event){
        data[id].content=code.value
        saveData()
    })

    header.querySelector('.button:has(.fa-pencil)').addEventListener('click' , function(event){
        let p = prompt('new fucking file name:')
        if (!p) return
        data[id].name = p
        saveData()
        location.reload()
    })
    
    header.querySelector('.button:has(.fa-times)').addEventListener('click' , function(event){
        code.value=''
        header.innerHTML = ''
        code.disabled = true
    })

    header.querySelector('.button:has(.fa-trash)').addEventListener('click' , function(event){
        document.querySelector(`.sbb.b-${id}`).remove()
        delete data[id]
        code.disabled = true
        code.value=''
        header.innerHTML = ''
        saveData()
        
    })



}
