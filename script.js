
const showCatagory = () =>{
     fetch(' https://openapi.programming-hero.com/api/news/categories')
     .then(res => res.json())
     .then(data => setCatagory(data.data.news_category))
     .catch(error => console.log(error))
}

const setCatagory = catagorys =>{
     const setId = document.getElementById('catagory');
     for(const catagory of catagorys){
          const div = document.createElement('div');
          div.classList.add('navbar','navbar-expand-lg')
          div.innerHTML = `
               <div class="col-lg-12 col-6">
                    <a  onclick=clickCatagory('${catagory.category_id}') class="  nav-link active" aria-current="page" href="#">${catagory.category_name}</a>
               </div>
          
          `;
          setId.appendChild(div)
     }
}

const clickCatagory = ctgNumber =>{
     const url = `https://openapi.programming-hero.com/api/news/category/${ctgNumber}`;
     fetch(url)
     .then(res => res.json())
     .then(data => setNewsCard(data.data))
     .catch(error => console.log(error))
     
}

const setNewsCard = cards =>{
     const setId = document.getElementById('news-card')
     setId.innerHTML = '';

     

     for( const card of cards ){
          const div = document.createElement('div')
          div.classList.add('card','mb-3','w-auto','m-auto')
          div.innerHTML = `
          <div class="row ">
               <div class="col-md-4">
                    <img src="${card.image_url}" class=" w-100 h-100 rounded-start" alt="...">
               </div>
               <div class="col-md-8">
                    <div class="card-body">
                         <h5 class="card-title">${card.title}</h5>
                         <p class="card-text"> ${card.details.slice(0,300)}.....</p>
                         <div class=" row d-flex">
                              <div class="col-2"> 
                                   <img  class="col-8 rounded-circle" src="${card.author.img}" alt=""> 
                              </div>
                              <div class="col-4 align-self-center">
                                   <p class="autherText m-0 fs-6 fw-light">${card.author.name}</p>
                                   <p class="autherText m-0 fs-6 fw-light">${card.author.published_date}</p>
                              </div>
                              <div class="col-6 d-flex ">
                                   <i class="fa-solid fa-users-viewfinder align-self-center"></i>
                                   <p class="align-self-center m-0 ps-3 fw-semibold">  ${card.total_view} </p>
                                   
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          
          `
          setId.appendChild(div)
     }

}



showCatagory()

