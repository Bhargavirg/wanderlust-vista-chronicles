// let input=document.querySelector(".search-box input")
// let btn=document.querySelector(".btn button")
// let images=document.querySelector(".images")
// let load=document.querySelector("#load")




// const accessKey="47123049-23e01f6dff4d75db8639e27c8"
// let page=1;
// let keyword=""
// function download(imgurl){
//     fetch(imgurl).then(res=>res.blob()).then(file=>{
//         let a=document.createElement("a")
//         a.href=URL.createObjectURL(file)
//         a.download=new Date().getTime()
//         a.click()

//     }).catch(()=>alert("failed download"))
// }



// async function getResponse() {
   
//     keyword=input.value
//     let url=`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=video`
//     let response=await fetch(url);
//     let data=await response.json()
//     let results=data.results;
//     if(page==1){
//         images.innerHTML=""
//     }
//      load.style.display="block"

//     results.map((result)=>{
//       let li=document.createElement("li")
//       li.classList.add("image")
//       let html=`<img src="${result.preview_photos[0].urls.small}" alt="img" class="photo">
//         <div class="details">
//             <div class="user">
//                 <img src="camera.svg" alt="img">
//                 <span>${result.title}</span>
//             </div>
//             <div class="download" onclick=download('${result.preview_photos[0].urls.small}')>
//                 <img src="download.svg" alt="img">
//             </div>
//         </div>`
//         li.innerHTML=html
//         images.appendChild(li)

//     })

// }
// input.addEventListener("keyup",(e)=>{
//     page=1
//     if(e.key=="Enter"){
//         getResponse()
//     }
   
// })
// btn.addEventListener("click",()=>{
//     page=1
//     getResponse()
// })
// load.addEventListener("click",()=>{
//     page++;
//     getResponse()
// })



const apiKey = '47123049-23e01f6dff4d75db8639e27c8'; // Replace with your actual API key
 const searchInput = document.getElementById('search-input');
 const videoContainer = document.getElementById('video-container');

 searchInput.addEventListener('keyup', (event) => {
   if (event.key === 'Enter') {
     const query = searchInput.value;
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=video` )      .then(response => response.json())
       .then(data => {
         videoContainer.innerHTML = ''; // Clear previous results
         data.hits.forEach(video => {
           const videoElement = document.createElement('video');
           videoElement.src = video.videos.large.url;
           videoElement.controls = true;
           videoContainer.appendChild(videoElement);
         });
       })
       .catch(error => console.error('Error fetching videos:', error));
  }
});
