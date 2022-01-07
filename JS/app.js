console.log('This is my news website');
// for bbc news only https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apikey}
// for indian news https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}


let newsHeading = document.getElementById('newsHeading');

const apikey = '0ab772ee21b94223b0d5d1e211b9eca9';

let openurl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;

function home() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', openurl, true);
    let html = "";
    xhr.onload = function () {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            let articles = json['articles'];
            // console.log(articles);
            // html += `<div class="accordion-item">
            //     <h2 class="accordion-header" id="headingOne">
            //       <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            //         ${articles['title']}
            //       </button>
            //     </h2>
            //     <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#newsHeading">
            //       <div class="accordion-body">
            //         ${articles['content']}
            //       </div>
            //     </div>
            //     </div>`;
            articles.forEach((element, index) => {
                if(element['author']==null){
                    element['author']='Anonymous';
                }
                html += `<div class="accordion-item bg-info">
            <h2 class="accordion-header" id="heading${index}">
              <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                <strong>${index + 1}. </strong>   ${element['title']}
              </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
              data-bs-parent="#newsHeading">
              <div class="accordion-body">
                <div class="card">
                  <div class="card-header">
                    <p class="text-center">${element['source']['name']}</p>
                    <div class="row align-items-start">
                      <div class="col">
                        By - ${element['author']}
                      </div>
                      <div class="col text-end">
                        publishedAt - ${element['publishedAt']}
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <img src="${element['urlToImage']}" class="card-img-top" alt="image here">
                    <h5 class="card-title">${element['description']}</h5>
                    <p class="card-text">${element['content']}</p>
                    <a href="${element['url']}" class="btn btn-primary" target="_blank">Read in detail</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`
            });
            newsHeading.innerHTML = html;

        } else {
            console.log('error in fetching news api');
            newsHeading.innertext = `Please check your internet connection or try to reload the page`;
        }
    }
    xhr.send();
}

home();

let exampleDataList = document.getElementById('exampleDataList');

const countryCodes = {
    Argentina: 'an',
    Greece: 'gr',
    Netherlands: 'nl',
    'South Africa': 'za',
    Australia: 'au',
    'Hong Kong':'hk',
    'New Zealand':'nz',
    'South Korea':'kr',
    Austria:'at',
    Hungary:'hu',
    Nigeria:'ng',
    Sweden:'se',
    Belgium:'be',
    India:'in',
    Norway:'no',
    Switzerland:'ch',
    Brazil:'br',
    Indonesia:'id',
    Philippines:'ph',
    Taiwan:'tw',
    Bulgaria:'bg',
    Ireland:'ie',
    Poland:'pl',
    Thailand:'th',
    Canada:'cn',
    Italy:'il',
    Portugal:'pt',
    Turkey:'tr',
    China:'cn',
    Italy:'it',
    Romania:'ro',
    UAE:'ae',
    Colombia:'co',
    Japan:'jp',
    Russia:'ru',
    Ukraine:'ua',
    Cuba:'cu',
    Latvia:'lv',
    'Saudi Arabia':'sa',
    'United Kingdom':'uk',
    'Czech Republic':'cz',
    Lithuunia:'lt',
    Serbia:'rs',
    'United States':'us',
    Egypt:'eg',
    Malasia:'my',
    Singapore:'sg',
    Venuzuela:'ve',
    France:'fr',
    Mexico:'mx',
    Slovakia:'sk',
    Germany:'de',
    Morocco:'ma',
    Slovenia:'si'
};

let countryName = document.getElementById('countryName');


let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', clickedOnSearch);

function clickedOnSearch() {
    
    newsHeading.innerHTML = `<h2>Have patience, page is getting directed</h2>`;
    setTimeout(() => {
        // console.log(exampleDataList.value);
        let country = exampleDataList.value;
        let code = countryCodes[country];
        console.log(code);
        if(code!=undefined){
            countryName.innerText = `${country} Chhapri news`;
            openurl = `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${apikey}`;
            exampleDataList.value = "";
        }else{
            let alert = document.getElementById('alert');
            alert.innerHTML = `     <div  class="alert alert-warning alert-dismissible fade show" role="alert" >
                                        <strong>Error ! </strong> Either <strong>${country}</strong> is not a country or its not present in the search dropdown.......pls search again
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div> 
            `;
            exampleDataList.value = "";
            setTimeout(() => {
                alert.innerHTML ="";
            }, 6000);
        }
        home();
        
    }, 2000);  
}

let homePage = document.getElementById('homePage');
homePage.addEventListener('click',function(){
    window.location.reload();
});

let BBCPage = document.getElementById('BBCPage');
BBCPage.addEventListener('click',function(){
    openurl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apikey}`;
    countryName.innerText = `BBC Chhapri news`;
    home();
})


