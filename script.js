
const showCatagory = () =>{
     fetch(' https://openapi.programming-hero.com/api/news/categories')
     .then(res => res.json())
     // console.log(data.data.news_category[0].category_name)
     .then(data => setCatagory(data.data.news_category))
}

const setCatagory = catagorys =>{
     const settingId = document.getElementById('catagory');
     for(const catagory of catagorys){
          const div = document.createElement('div');
          div.classList.add('navbar','navbar-expand-lg')
          div.innerHTML = `
               <div class="">
                    <a onclick= class="nav-link active" aria-current="page" href="#">${catagory.category_name}</a>
               </div>
          
          `;
          settingId.appendChild(div)
     }
}



showCatagory()