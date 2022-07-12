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
var CsvDataParsed = 'parse 1 empty';
var CsvDataOtherParsed = 'parsed 2 empty';
var MemberDataParsed = '';
var MemberDataOtherParsed = '';
var AllorOnlySeen = 'ALL';
var dropfile = [];
var dropfile2 = [];

const papaconfig = {header:true};

var check1 = false;
var check2 = false;
const apikey = 'api_key=5625c97a465184ed5c6509459a4505fb';

const btn = document.getElementById("btn");

const topbar = document.getElementById("topbar");

const test = document.getElementById("test");

const userfile = document.getElementById("userfile");

const comparefile = document.getElementById("comparefile");

var moviesshared = [];
var moviesnotshared = [];

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
btn.addEventListener("pointerdown", async function (e) {
  topbar.className = 'barraleft shadowred ' ;
  if(check === true){
    e.preventDefault
    let input = csvFile.files[0];
    if(check1 === true){
      input = dropfile;
    }
    let reader = new FileReader(); 
    reader.onload = async function (input) {
      let text = input.target.result;
      let output = Papa.parse(text,papaconfig);
      let csvtext = output.data;
      CsvDataParsed = csvtext;
      console.log(await DataofMovies(csvtext));
      console.log(names.length);
      await csvreader2();
      await adddiv(); 
      await comparator();
       
    };
    reader.readAsText(input);
  }
  else{
    let member = textbox.value; 
    let member2 = textboxOther.value;
    console.log("You're:"+member);
    console.log("Other is:"+member2);
    let MemberData = await letterboxdAPicall(member);
    MemberDataParsed = Papa.parse(MemberData,papaconfig).data;
    let MemberDataOther = await letterboxdAPicall(member2);
    MemberDataOtherParsed = Papa.parse(MemberDataOther,papaconfig).data;
    await DataofMovies(MemberDataParsed);
    await DataofMovies2(MemberDataOtherParsed);
    await adddiv();
    await comparator();
  }
  topbar.className = 'barraleft shadowgreen ' ;
});


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
  reader.readAsText(input);
};
// This scripts modifies and adds divs to the page

function removedivs(){
 btn.style.display = 'none';
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
async function letterboxdAPicall(memberAPI){
  // let memberjson = await fetch('https://375eutpz4e.execute-api.us-east-1.amazonaws.com/TestDepoy/api/'+ memberAPI , {
  //   method: 'GET',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'X-Api-Key': 'yxcgWGQJSa96zM7XSMk8d2EgckI8AtjoaiocOu8m',
  //   }
  // }).then(response => {
  // if (response.ok){ return response.json();}
  // throw new Error('Network response was not ok.');})
  // .catch(error => alert('Something whent wrong. The most common occurrence is a mispelled username.'));
  let memberjson = await fetch('http://127.0.0.1:8000/api/'+ memberAPI).then(response => response.json());
  return memberjson;
};


const checkbox = document.getElementById("switch");
const TextBoxOtherContainer = document.getElementById("searchBoxOtherContainer");
const textboxContainer = document.getElementById("searchBoxContainer");
var check = false;
checkbox.addEventListener("change", function(){
  if(checkbox.checked){

    check = false;
  }
  if(!checkbox.checked){

    check = true;
  }
  
});
let root = document.documentElement;
test.addEventListener("pointerdown", async function(){
  console.log('Started');
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
  await adddivtopages(sharedmovies);
  document.getElementById('pagemoviecontainer1').style.display = 'grid';
});


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
        let x = await tmdbapi(array[i][j][0].Name);
        img_cloned.src = "https://image.tmdb.org/t/p/w500"+ x.poster_path;
        img_cloned.alt = array[i][j][0].Name;
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
        let info_cloned = info.cloneNode(true);
        info_cloned.innerHTML = x.overview;
        poster_cloned.appendChild(title_cloned);
        poster_cloned.appendChild(img_cloned);
        poster_cloned.appendChild(one_cloned);
        poster_cloned.appendChild(two_cloned);
        poster_cloned.appendChild(info_cloned);
        page.appendChild(poster_cloned);
      }
    };
}
// i know theres an easier way of doing this without using findindex i actually found it before
// then wanted to make some changes and completely lost it. it works though.
// oh yeah this makes a new array with the movies that are in both arrays
function arraydivider(member,memberother){
  let matrix = [];
  let container = [];
  console.log(member.length)
  console.log(memberother.length)
  for(let i = 0; i < member.length -1; i++){
    let index = memberother.findIndex((movie) => movie.Name === member[i].Name);
    if(index !== -1){
    container.push([member[i],memberother[index]]);
    }
    if(index === -1 && check === false){
      container.push([member[i],{Rating: 'Not Seen'}]);
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



