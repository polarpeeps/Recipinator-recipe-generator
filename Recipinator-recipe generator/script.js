const app_id='e706caaa'
const app_key='ca92039d134875ce5cf7aedac430680b'
const loaderContainer=document.querySelector(".loader-container")
const input =document.querySelector("input")
const button =document.querySelector("#button")
const recipeContainer=document.querySelector('.results')
const scrollerContainer = document.querySelector('.containers')
const generateEndpoint=(searchString='')=>`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${app_id}&app_key=${app_key}`
const heading=document.querySelector('h1')
{/* 
<img src="${image}" class="w-full" alt="" height="200px" style='background-size:cover;background-position:center' >*/}
// const endPoint = ``;
const getHead=()=>`<h1
class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
Scroll Down for <span
    class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">recipes</span>
</h1>`
const generateCard =(image,label,url,cuisineType,dietLabels,dishType,totalWeight)=>
    `<div class='w-[300px] h-[600px] my-12  max-w-md mx-2 flex  bg-white rounded-3xl shadow-xl overflow-hidden'>
    <div class=' max-w-md mx-auto'>
<img src="${image}" class="w-full" alt="" height="200px" style='background-size:cover;background-position:center' >

 
        <div class='p-4 sm:p-6'>
            <p class='font-bold h-[30px] text-gray-700 text-[20px] leading-7 mb-8'>${label}</p>
            <p class='text-[#7C7C80] font-[10px] mt-2' >
                <ul >
                <li>Cuisine Type: ${cuisineType}</li>
                <li>Diet Labels: ${dietLabels}</li>
                <li>Dish Type: ${dishType}</li>
                <li>Total Weight: ${totalWeight.toFixed(2)}</li>
                </ul>
            </p>
            <a target='_blank' href='${url}'
                class='block mt-4 mb-2 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                View Recipe
            </a>
        </div>
    </div>
</div>`


const showLoader=()=>{
    loaderContainer.style='display:flex';
}
const showScroller=()=>{
    scrollerContainer.style='display:flex';
}
const hideLoader=()=>{
    loaderContainer.style='display:none';
}
const hideScroller=()=>{
    scrollerContainer.style='display:none';
}


const getRecipes=async()=>{
    try {
        showScroller()
        const searchString =input.value
        const response =await fetch(generateEndpoint(searchString))
        console.log(response)
        const data = await response.json()
        console.log(data)
        
        const recipes =data.hits
        // heading.innerHTML="Please scroll down for recipes"
        recipeContainer.innerHTML=''
        recipes.forEach(recipe => {
            const {image,label,url,cuisineType,dietLabels,dishType,totalWeight}=recipe.recipe
            recipeContainer.innerHTML+=generateCard(image,label,url,cuisineType,dietLabels,dishType,totalWeight)
        });
        
        
    } catch (error) {
     console.log(error)   
    }finally{
        // hideLoader()
        hideScroller()
        // input.value=''
        // heading.innerHTML='Search for recipes'
    }
}

button.addEventListener('click',getRecipes)
