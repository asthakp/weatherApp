const  apiKey='5d31f4a22602c5081bf39659c9b97e02'
const city='hetauda'
const searchBtn=document.getElementById('search')
const inputBtn=document.getElementById('location')
const result=document.getElementById('result')
const week=['sunday','monday','tuesday','wednesday','thrusday','friday','saturday']


const resultDisplayBlock=()=>{
    result.classList.remove('hidden')
    result.classList.add('block') 
}
const resultDisplayHidden=()=>{
    result.classList.remove('block')
    result.classList.add('hidden') 
}

searchBtn.addEventListener('click', ()=>{ 
    getWeather(inputBtn.value)   
})

const getWeather=async(city)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    try{const response= await fetch(url) 
    const data= await response.json()
    if (city===''){ 
        resultDisplayBlock()
        result.innerHTML=`
        <img
        src="https://www.svgrepo.com/show/396235/cross-mark.svg"
        alt=""
        class="absolute top-2 right-2 w-6 h-6 cursor-pointer"
        onClick="resultDisplayHidden()"
      />
        <h1 class='text-xl pl-5 pb-5'> Please enter your location</h1>
         `
    }
     if (data.cod=='404'){
        resultDisplayBlock()
        result.innerHTML=` 
        <img
        src="https://www.svgrepo.com/show/396235/cross-mark.svg"
        alt=""
        class="absolute top-2 right-2 w-6 h-6 cursor-pointer"
        onClick="resultDisplayHidden()"
      />
        <h1 class='text-xl pl-5 pb-5'> OOPS! ${data.message}</h1> 
        `
     }
     else{
        resultDisplayBlock()
        result.innerHTML=
        `
        <img
        src="https://www.svgrepo.com/show/396235/cross-mark.svg"
        alt=""
        class="absolute top-2 right-2 w-6 h-6 cursor-pointer"
        onClick="resultDisplayHidden()"
      />
        <h2 class="text-center text-white text-3xl">${inputBtn.value}</h2>

          <div class="mt-5 pl-5">
            <div class="flex gap-x-2 items-center text-lg">
              <img
                src="https://www.svgrepo.com/show/509148/location-pin.svg"
                alt=""
                class="w-4 h-4 text-white "
              />
              <p id="location-mini">${inputBtn.value}</p>
            </div>
            <div class="flex gap-x-2 items-center text-lg">
              <img
                src="https://www.svgrepo.com/show/509148/location-pin.svg"
                alt=""
                class="w-4 h-4 "
              />
              <p id="date">${week[new Date().getDay()]}</p>
            </div>
          </div>
          <div class="flex items-center justify-between pr-20">
          <div class="left">
          <div class="temperature text-2xl mt-5 pl-5 flex gap-2">
            <div class="" id="celsius">${data.main.temp}  °C</div>
            <div class="border-l-2 border-white h-8"></div>
            <div class="" id="fahrenheit">${((data.main.temp*9/5)+32).toFixed(2)}  °F</div>
          </div>
          <p class="pl-5 mb-5">Feels like :${data.main.feels_like} °C </p>
          </div>
           <div class="right ">
           <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" >
           </div>
           </div>

          <div class="pl-5 pb-5">
            <p>Humidity: ${data.main.humidity + '%'}</p>
            <p>Wind Speed: ${data.wind.speed + 'km/hr'}</p>
          </div>
        `
        
     }
     inputBtn.value='' 
    }
    catch(err){
console.log(err)
    }
      
}



