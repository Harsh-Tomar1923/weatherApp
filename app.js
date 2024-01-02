const form=document.querySelector('form');
let list=document.getElementById('list');
const bg=document.querySelector('body');
function getWeather(inpText){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${inpText}&appid=787f7ad59966a785d61a6d9298ebe710`;
    axios.get(url)
        .then((res)=>{
            let t=res.data.main.temp;
            let feelsLike=res.data.main.feels_like;
            let tMax=res.data.main.temp_max;
            let tMin=res.data.main.temp_min;
            let humidity=res.data.main.humidity;
            console.log(res.data.main.humidity)
            t=Math.floor(t-=273.15);
            feelsLike=Math.floor(feelsLike-=273.15);
            tMax=Math.floor(tMax-=273.15);
            tMin=Math.floor(tMin-=273.15);
            const li=document.createElement('li');
            li.innerText=`Temp is: ${t} C`;
            list.appendChild(li);
            const li2=document.createElement('li');
            li2.innerText=`Feels Like: ${feelsLike} C`;
            list.appendChild(li2);
            const li3=document.createElement('li');
            li3.innerText=`Min Temp: ${tMin} C`;
            list.appendChild(li3);
            const li4=document.createElement('li');
            li4.innerText=`Max Temp: ${tMax} C`;
            list.appendChild(li4);
            const li5=document.createElement('li');
            li5.innerText=`Humidity is: ${humidity} %`;
            list.appendChild(li5);
        })
        .catch((err)=>{
            console.log(err);
        })
}
function getBackground(inpText){
    const bcurl=`https://api.unsplash.com/search/photos?page=1&query=${inpText}&client_id=4OT1Sb8VK_-MqDfxwIrM_On0BtVrfaq0LRbl7rrVW-s`
    axios.get(bcurl)
        .then((res)=>{
            if(res.data.results[0].links){
                const src= res.data.results[0].links.download;
                console.log(src);
                bg.style.backgroundImage='url(`${src}`)';
                bg.style.backgroundSize='cover';
                bg.style.backgroundRepeat='no-repeat';
            }
        })
        .catch((err)=>{
            console.log(err);
        })
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inpText=form.elements[0].value;
    getWeather(inpText);
    getBackground(inpText);
    form.elements[0].value="";
})