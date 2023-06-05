const ACCESS_KEY = 'RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw';
const API_URL = 'https://api.unsplash.com';
const searchInput = document.getElementById('searchInput')
const showButton = document.querySelector('.searchBtn')
const resaultData = document.querySelector('.results')
const showMorebtn = document.querySelector('.showMore')

let currentPage = 1;

function handleSearchButtonClick () {
    const inputValue = searchInput.value;
    currentPage = 1;
    fetchImages(currentPage,inputValue)
    if (searchInput === 0) {
        console.log('heeyyyyy')
    }
};
showButton.addEventListener('click',handleSearchButtonClick)


function fetchImages (page,query) {
    const url = `${API_URL}/search/photos?page=${page}&query=${query}&client_id=${ACCESS_KEY}`;

    fetch(url)
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        console.log(data);
        renderSearchResult(data.results)
        
    })
    
};

function renderSearchResult (results) {
    resaultData.innerHTML = '';
    results.forEach( result => {
        const createDivEleement = document.createElement('div');
        const createImgElement = document.createElement('img');
        const createAElement = document.createElement('a');

        createImgElement.src = result.links.download;
        createAElement.innerText = result.alt_description;
        createAElement.href = result.links.html;
        createAElement.target = '_blanc';

        createDivEleement.appendChild(createImgElement);
        createDivEleement.appendChild(createAElement);
        createDivEleement.classList.add('result');

        resaultData.appendChild(createDivEleement);

    });
    forShowMore()                                    
};



function forShowMore () {
    showMorebtn.innerHTML = '';
    const createButton = document.createElement('button');
    createButton.innerText = 'Show more';
    createButton.classList.add('showMoreBtn');
    showMorebtn.appendChild(createButton);

    createButton.addEventListener('click',function () {
        currentPage++;
        const inputValue = searchInput.value;
        fetchImages(currentPage,inputValue);
    });
};

function handleKeyPress(event) {
    if (event.keyCode === 13) {
      resaultData.style.display = 'flex'
      handleSearchButtonClick();
    }
    
};

document.addEventListener('keydown',handleKeyPress);
