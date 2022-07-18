import Papa from "papaparse"


// if you read this is cause i deamed the project worth posting in my github.
// beware thou who shall look at another "developer" first project code.
// prob also last project. 
// But worry not this code is thankfully basic enough that its self explanatory /s. 

var names = [];
var links = [];
var ratin = [];
var namesother = [];
var ratinother = [];
var MemberDataParsed = '';
var MemberDataOtherParsed = '';
var dropfile = [];
var dropfile2 = [];

const papaconfig = {header:true};
const modeSwitch = document.getElementById('mode');
var check1 = false;
var check2 = false;
const apikey = 'api_key=5625c97a465184ed5c6509459a4505fb';



const topbar = document.getElementById("topbar");

const test = document.getElementById("test");


// retrieves the #name #rating and link of the movies from the csv given by the user or the API
// thanks to a spelling mistake this now only works with CVS recipes.
// another thing i dont use anymore but i kept it for future reference.
async function  DataofMovies(CVSdata){
  for(let i = 0; i < CVSdata.length ; i++){
    names.push(CVSdata[i].Name);
    ratin.push(CVSdata[i].Rating);
    links.push(CVSdata[i].Link);
  }
  }
// retreves rating and name of a movies from the datagiven to the other
async function  DataofMovies2(csvdata){
  console.log('data2 lenght'+ csvdata.length);
    for(let i = 0; i < csvdata.length ; i++){
      namesother.push(csvdata[i].Name);
      ratinother.push(csvdata[i].Rating);
    }
console.log('DataofMovies2 Finished');
  return [namesother, ratinother]
};


// checks the mode the page is in. And then reads the files if in csv mode or launches the api if in id mode. Then launches the comparison function.
// Leaving it here incase i want to use it in the future.



// reads the second csv file. Leaving it here incase i want to use it in the future.
async function csvreader2(){
  let input = csvFile2.files[0];
  if(check2 === true){
    input = dropfile2;
  }
  let reader = new FileReader();
  reader.onload = async function (input) {
    let text = input.target.result;
    let output = Papa.parse(text,papaconfig);
    let csvtext = output.data;
    CsvDataParsed = csvtext;
    console.log(await DataofMovies2(csvtext) );   
  };
  // reader.readAsText(input);
};
// This scripts modifies and adds divs to the page

function removedivs(){

 document.getElementById("examplePoster").style.display = 'none';

}
// api requests start here

async function tmdbapi(x){
  if(x == ''){
    x = 'The Matrix' 
  }
  let title = x.replace(/\s+/g,'%20');
  let moviedata = await fetch("https://api.themoviedb.org/3/search/multi?"+apikey+"&language=en-US&query="+title).then(response => response.json());
  // if tmbd cant find the movie it gives the poster of 2011 greenlantern
  if(moviedata.results[0] == undefined){
    let nose = {
      poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fj21HwUprqjjwTdkKC1XZurRSpV.jpg'
    }
    return nose 
  }
  else{ return moviedata.results[0];}
 
}
// api request end here





const textbox = document.getElementById('search');
const textboxOther = document.getElementById('searchOther');

// calls the python api and receives the data in csv
async function letterboxdAPicall(member){

  let memberjson = await fetch('https://erzgg8cp3a.execute-api.us-east-1.amazonaws.com/Prod/api/'+member,{headers:{'x-api-key':'0fg31ilvDCl0fdZfhum82clS7J1ad0j3booSddQb'}}).then(response => response.json());
  return memberjson;
};
async function backloggdAPIcall(member){
  let memberjson = await fetch('https://erzgg8cp3a.execute-api.us-east-1.amazonaws.com/Prod/t/'+member,{headers:{'x-api-key':'0fg31ilvDCl0fdZfhum82clS7J1ad0j3booSddQb'}}).then(response => response.json());
  return memberjson;
}

const checkbox = document.getElementById("switch");
var check = false;
checkbox.addEventListener("change", function(){
  if(check === false){
    check = true;
    console.log("check is true");
  }
  else if(check === true){
    console.log("check is false");
    check = false;
  }
  
});
let root = document.documentElement;
test.addEventListener("pointerdown", async function(){
StartPage();
});

// this function loads all the functionality of the page. so i can use the same button for testing. im that kind of lazy.
async function StartPage(){
  console.log('Started');
  document.getElementById('searchBoxContainer').style.display = 'none';
  document.getElementById('searchBoxOtherContainer').style.display = 'none';
  document.getElementById('containerswitch').style.display = 'none';
  if(mode === false){
    let member = await letterboxdAPicall(textbox.value);
    let memberparsed = Papa.parse(member,papaconfig).data;
    console.log('Member parsed')
    await DataofMovies(memberparsed);
    let memberother = await letterboxdAPicall(textboxOther.value);
    let memberotherparsed = Papa.parse(memberother,papaconfig).data;
    await DataofMovies2(memberotherparsed);
    console.log(memberparsed);
    console.log(memberotherparsed);
    let sharedmovies = arraydivider(memberparsed, memberotherparsed);
    console.log(sharedmovies);
    addpaginator(sharedmovies);
    removedivs();
    addmoviepages();
    adddivtopages(sharedmovies);
    document.getElementById('pagemoviecontainer1').style = 'display: grid;';
  }
  if(mode === true){
    let member = await backloggdAPIcall(textbox.value);
    let memberparsed = Papa.parse(member,papaconfig).data;
    console.log('Member parsed')
    await DataofMovies(memberparsed);
    let memberother = await backloggdAPIcall(textboxOther.value);
    let memberotherparsed = Papa.parse(memberother,papaconfig).data;
    await DataofMovies2(memberotherparsed);
    console.log(memberparsed);
    console.log(memberotherparsed);
    let sharedmovies = arraydivider(memberparsed, memberotherparsed);
    console.log(sharedmovies);
    addpaginator(sharedmovies);
    removedivs();
    addmoviepages();
    adddivtopages(sharedmovies);
    document.getElementById('pagemoviecontainer1').style = 'display: grid;';

  }
 



};

// function that makes an array with n number of elements or testing 
function arraymaker(number){
  let array = [];
  for(let i =0; i < number; i++){
    array.push(i);
  }
  return array;
}


function addpaginator(arrayx){
 let paginatorContainer = document.getElementById("paginatorContainer");
 //pagesN is pagesNumber
 let pagesN = document.createElement('h1');
 for(let i=0 ; i < arrayx.length ; i++){
   console.log("test");
    let pagesN_cloned = pagesN.cloneNode(true);
    pagesN_cloned.id = 'page'+(i+1);
    pagesN_cloned.innerHTML = (i+1);
    pagesN_cloned.className = 'page';
    paginatorContainer.appendChild(pagesN_cloned);
    pagesN_cloned.addEventListener('pointerdown', function(){
    let PageContainerId = document.getElementById('pagemoviecontainer'+(i+1));
    let pagesquery = document.querySelectorAll('.basic-grid');
    pagesquery.forEach(elements => {
      elements.style.display = 'none';
      })
      PageContainerId.style.display = 'grid';
      }
    );
  }
};
const examplePoster = document.getElementById("examplePoster");
// a function that creates a pageContainer for each page in the paginator
function addmoviepages(){
  let paginatorContainer = document.getElementById("paginatorContainer")
  let pageContainer = document.getElementById("ImgList");
  let page = document.createElement('section');
  page.className = 'basic-grid';
  for(let i=0; i <= paginatorContainer.childElementCount; i++){
    let page_cloned = page.cloneNode(true);
    page_cloned.id = 'pagemoviecontainer'+(i+1);
    page_cloned.style = 'display: none;';
    pageContainer.appendChild(page_cloned);
  }
}
async function adddivtopages(array){
  let poster = document.createElement('div');
  poster.className = 'poster';
  let title = document.createElement('div');
  title.className = 'titulo';
  let img = document.createElement('img');
  img.src = 
  img.alt = '';
  let one = document.createElement('div');
  one.className = 'one';
  let two = document.createElement('div');
  two.className = 'two';
  let info = document.createElement('h3');
  info.className = 'info';
    for( let i = 0 ; i < array.length; i++){
      let page = document.getElementById('pagemoviecontainer'+(i+1));
      for(let j = 0; j< array[i].length; j++) {
        let poster_cloned = poster.cloneNode(true);
        poster_cloned.id = 'poster_'+i+'_'+j;
        let title_cloned = title.cloneNode(true);
        title_cloned.innerHTML = array[i][j][0].Name;
        let img_cloned = img.cloneNode(true);
        if(mode === false){
          
          let x = await tmdbapi(array[i][j][0].Name);
          img_cloned.src = "https://image.tmdb.org/t/p/w342"+ x.poster_path;
          img_cloned.alt = array[i][j][0].Name;
          let info_cloned = info.cloneNode(true);
          info_cloned.innerHTML = x.overview;
          poster_cloned.appendChild(info_cloned);
        }
        if(mode === true){
          img_cloned.src = array[i][j][0].Poster;
          img_cloned.alt = array[i][j][0].Name;
          poster_cloned.href = array[i][j][0].Link;
        }
        let one_cloned = one.cloneNode(true);
        one_cloned.innerHTML = array[i][j][0].Rating;
        let two_cloned = two.cloneNode(true);
        if (array[i][j][1].Rating === ''){
        two_cloned.innerHTML = '0/Not Rated';
        console.log(array[i][j][1].Rating)
        }
        if (array[i][j][1].Rating !== ''){
        two_cloned.innerHTML = array[i][j][1].Rating;
        }
        poster_cloned.appendChild(title_cloned);
        poster_cloned.appendChild(img_cloned);
        poster_cloned.appendChild(one_cloned);
        poster_cloned.appendChild(two_cloned);
        page.appendChild(poster_cloned);
      }
    };
}
// i know theres an easier way of doing this without using findindex i actually found it before
// then wanted to make some changes and completely lost it. it works though.
// oh yeah this makes a new array with the movies/games that are in both arrays
function arraydivider(member,memberother){
  let matrix = [];
  let container = [];
  console.log(member.length)
  console.log(memberother.length)
  for(let i = 0; i < member.length -1; i++){
    let index = memberother.findIndex((postion) => postion.Name === member[i].Name);
    if(index !== -1){
    container.push([member[i],memberother[index]]);
    }
    if(index === -1 && check === false && mode === false){
      container.push([member[i],{Rating: 'Not Seen'}]);
    }
    else if(index === -1 && check === false && mode === true){
      container.push([member[i],{Rating: 'Not Played'}]);
    }
    else if(index === -1 && check === true){
    
    }
    if(container.length === 72){
      matrix.push(container);
      container = [];
    }
    if (i === member.length-2){
      matrix.push(container);
    }
  }
  return matrix;
}

var mode = false;
modeSwitch.addEventListener('pointerdown', function(){
  const dontaskaboutthisshit = document.getElementById('dontaskaboutthisshit');
  if (mode == false){
    mode = true;
    console.log('True')
    dontaskaboutthisshit.innerHTML = 'LETTERBOXD';
    document.querySelector('.barraleft').style = 'background-color: #ff9a00;';
    document.querySelector('.body').style = 'background-color: #00a2ff;';
    document.querySelector('.modeswitch').style = 'color: #ff9a00;';
    
  }
  else {
    mode = false;
    console.log('False')
    dontaskaboutthisshit.innerHTML = 'BACKLOGGD';
    document.querySelector('.barraleft').style = 'background-color: #1a1919;';
    document.querySelector('.body').style = 'background-color: #00000;';
    document.querySelector('.modeswitch').style = 'color: #1a1919;';
  }
});

// lazy load src for images
function lazyload(){
  let lazyImages = document.querySelectorAll('.lazy');
  let active = false;
  window.addEventListener('scroll', function(){
    if(!active){
      active = true;
      setTimeout(function(){
        checkImages(lazyImages);
        active = false;
      }, 200);
    }
  });
}


