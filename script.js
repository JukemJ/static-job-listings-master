const list = document.getElementById('list')
let filterTags = []

getData()

async function getData(tags = []){
    const response = await fetch("data.json")
    let data = await response.json()
    if(tags.length){
        data = data.filter(x => tags.some(y => x.tools.includes(y)) || 
                                tags.some(y => x.role.includes(y)) || 
                                tags.some(y => x.level.includes(y)) ||
                                tags.some(y => x.languages.includes(y)))
    }
    for(let x of data) drawListing(x)
}

function filter(){
    list.innerHTML = ''
    getData([this.innerText])
}

function drawListing(data){
    
    const listing = document.createElement("div")
    listing.classList.add("row","justify-content-between","mb-3","rounded","shadow","p-3")

    let HTML = 
    `
    <div class="col-5 rounded row">
        <img class="col-3 p-3" src="${data.logo}">
        <div class="col text-start">
        <p class="mt-3">
            <span class="company">${data.company}</span>
            <span class="new${data.new ? '' : " hidden"}">NEW!</span>
            <span class="featured${data.featured ? '' : " hidden"}">FEATURED</span>
        </p>
        
        <p class="title">${data.position}</p>
        <p class="info">
            <span class="me-1">${data.postedAt}</span>
            &#x2022;
            <span class="mx-1">${data.contract}</span>
            &#x2022;
            <span class="ms-1">${data.location}</span>
        </p>
        </div>
    </div>

    <div id="tags" class="col align-items-center d-flex justify-content-end">
        <span class="mx-3 tag rounded p-1 px-2">${data.role}</span>
        <span class="mx-3 tag rounded p-1 px-2">${data.level}</span>
    
    `
    for(let lang of data.languages) HTML += `<span class="mx-3 tag rounded p-1 px-2">${lang}</span>`
    for(let tool of data.tools) HTML += `<span class="mx-3 tag rounded p-1 px-2">${tool}</span>`
    HTML += `</div>`
    listing.innerHTML = HTML
    list.appendChild(listing)
    const tags = listing.getElementsByClassName('tag')
    for(let i = 0; i < tags.length; i++) tags[i].addEventListener('click',filter)
}