
const showCatagory = () =>{
     fetch(' https://openapi.programming-hero.com/api/news/categories')
     .then(res => res.json())
     .then(data => setCatagory(data.data.news_category))
     .catch(error => console.log(error))
}

const setCatagory = catagorys =>{
     const setId = document.getElementById('catagory');
     catagorys.forEach(catagory =>{
          const div = document.createElement('div');
          div.classList.add('navbar','navbar-expand-lg')
          div.innerHTML =  `
          
           <div class="">
               <a  onclick=clickCatagory('${catagory.category_id}')  class="  nav-link active" aria-current="page" href="#">${catagory.category_name}</a>
          </div> 


          `; 
          setId.appendChild(div)
     })  
     
}

const clickCatagory = ctgNumber =>{
     loader(true);
     const url = `https://openapi.programming-hero.com/api/news/category/${ctgNumber}`;
     fetch(url)
     .then(res => res.json())
     .then(data => setNewsCard(data.data.sort((a, b)=> {return b.total_view - a.total_view})))
     .catch(error => console.log(error))
     
}

const setNewsCard = cards =>{
     const setId = document.getElementById('news-card')
     setId.innerHTML = '';
     loader(false);
     const foundResult = document.getElementById('found-result')
     if(cards.length !== 0){
          const cardsNumber = cards.length
          foundResult.innerText = cardsNumber  + ' ' +'items found';  
     }
     else{
          return foundResult.innerText = 'no items found'; 
     }

     cards.forEach(card => {
         
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
                                   <p class="autherText m-0 fs-6 fw-light">${card.author.name ? card.author.name:'Author name hidden' }</p>
                                   <p class="autherText m-0 fs-6 fw-light">${card.author.published_date}</p>
                              </div>
                              <div class="col-3 d-flex ">
                                   <i class="fa-solid fa-users-viewfinder align-self-center"></i>
                                   <p class="align-self-center m-0 ps-3 fw-semibold">  ${card.total_view ? card.total_view : 'No view'} </p>
                                   
                              </div>
                              <div class="col-3"> 
                                   <button onclick=openModel('${card._id}') type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                   Show Details
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          
          `
          setId.appendChild(div)
     })  
    

}

const openModel = (newsId) =>{
     const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
     fetch(url)
     .then(res => res.json())
     .then(data => modelBox(data.data))
     .catch(error => console.log(error)) 
}

const modelBox = (details)=> {
     const modelBody =document.getElementById('modal-body')
     modelBody.innerHTML ='';
     details.forEach(detail => {
          const div = document.createElement('div')
          div.classList.add('modal-body')
          div.innerHTML = `
               <img class="w-75 ms-5" src="${detail.author.img}" alt="">
               <p class="m-0 mt-3"> ${detail.author.name ? detail.author.name : "Authore Name hidden"} </p>
               <p class="m-0"> ${detail.author.published_date}  </p>
               <p class="my-3 fs-2 fw-semibold"> ${detail.title} </p>
               <p class="my-2 fs-5 fw-semibold"> Total  :  ${detail.total_view} view </p>
               <p class="my-2 fs-6 fw-semibold "> Rating  :  ${detail.rating.badge ? detail.rating.badge : 'No rating '} ${detail.rating.number ? detail.rating.number :'No point'} </p>
               <p class=""> ${detail.details} </p>
               
          `
          modelBody.appendChild(div)
     })
}

const loader = isloding => {
     const loaderSection = document.getElementById('loader-id')
     
     if(isloding){
          loaderSection.classList.remove('d-none')
     }
     else{
          loaderSection.classList.add('d-none')
     }
}


// clickCatagory('08')

showCatagory()


