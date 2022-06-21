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
var CsvDataOther = 'parsed 2 empty';

const papaconfig = {header:true};

const idioma = 'en-us';

const apikey = 'something';

const comparatorid = document.getElementById('comparatorid');

const testbtn = document.getElementById("testbtn");

const btn = document.getElementById("btn");

const topbar = document.getElementById("topbar");

const inputfile = document.getElementById('csvFile');


async function  DataofMovies(){
  let datalenght = Object.keys(CsvDataParsed).length;
    for(let i = 0; i < datalenght -1 ; i++){
      let objdata = Object.entries(CsvDataParsed[i]);
        if(objdata[4][1]>=4){
        names.push(objdata[1][1]);
        ratin.push(objdata[4][1]);
        links.push(objdata[3][1]);
        }
        else{
        }
    }
    console.log('test DataofMovies');
  return [names, ratin]
}
async function  DataofMovies2(csvdata){
  let datalenght = Object.keys(csvdata).length;
    for(let i = 0; i < datalenght -1 ; i++){
      let objdata = Object.entries(csvdata[i]);
        namesother.push(objdata[1][1]);
        ratinother.push(objdata[4][1]);
    }
    console.log('test DataofMovies2');
  return [namesother, ratinother]
}


// saves the data of primary csv
btn.addEventListener("pointerdown", async function (e) {
    e.preventDefault
    let input = csvFile.files[0];
    let reader = new FileReader(); 
    reader.onload = async function (input) {
      let text = input.target.result;
      let output = Papa.parse(text,papaconfig);
      let csvtext = output.data;
      CsvDataParsed = csvtext;
      console.log(await DataofMovies(csvtext));
      console.log(names.length);
      await csvreader();
      await adddiv(); 
      await comparator();     
      
    };
    reader.readAsText(input);
});

// saves data of secondary csv
testbtn.addEventListener("pointerdown", async function (e) {
  e.preventDefault
  let input = csvFile2.files[0];
  let reader = new FileReader();
  reader.onload = async function (input) {
    let text = input.target.result;
    let output = Papa.parse(text,papaconfig);
    let csvtext = output.data;
    CsvDataParsed = csvtext;
    console.log(await DataofMovies2(csvtext) );   
  };
  reader.readAsText(input);
});

async function csvreader(){
  let input = csvFile2.files[0];
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
// This script adds divs to the page
async function adddiv(){
  const divt = document.createElement('div');
  divt.className = 'titulo';
  divt.innerHTML = '';
  const divp = document.createElement('div');
  divp.className = 'poster';
  const ImgList = document.getElementById('ImgList');
  const imgurl = document.createElement('img');
  const divtinfo = document.createElement('h3');
  divtinfo.className = 'info';
  topbar.className = 'barraleft shadowred ' ;
  for(let i = 0; i < names.length ; i++){
    let divtinfo_cloned = divtinfo.cloneNode(true);
    divtinfo_cloned.id = 'info' + i;
    let divp_cloned = divp.cloneNode(true);
    divp_cloned.id = 'poster' + i ;
    ImgList.appendChild(divp_cloned);
    console.log('2primer for loop');
    let posterid = 'poster' + i;
    let ImgListChild = document.getElementById(posterid);
    ImgListChild.appendChild(divtinfo_cloned);
  };


  for(let i = 0; i < names.length ; i++){
    let divt_cloned = divt.cloneNode(true);
    divt_cloned.innerHTML = names[i] ;
    divt_cloned.id = 'namediv'+ i ;
    let posterid = 'poster' + i;
    let ImgListChild = document.getElementById(posterid);
    ImgListChild.appendChild(divt_cloned);
  };


  for(let i = 0; i < names.length ; i++){
    let moviedata =await tmdbapi(names[i]);
    let imgurl_cloned = imgurl.cloneNode(true);
    let one_cloned = divt.cloneNode(true);
    one_cloned.innerHTML = ratin[i] ;
    one_cloned.className = 'one' 
    one_cloned.id = 'ratindiv'+ i ;
    imgurl_cloned.src = "https://image.tmdb.org/t/p/w500"+ moviedata.poster_path;
    let posterid = 'poster' + i;
    let ImgListChild = document.getElementById(posterid);
    ImgListChild.appendChild(imgurl_cloned);
    ImgListChild.appendChild(one_cloned);
    document.getElementById('info'+i).innerHTML = moviedata.overview;
  }
  for(let i =0; i <names.length;i++){

  }
  topbar.className = 'barraleft shadowgreen ' ;
}
// api requests start here

async function tmdbapi(x){
  let title = x.replace(/\s+/g,'%20');
  let moviedata = await fetch("https://api.themoviedb.org/3/search/multi?"+apikey+"&language=en-US&query="+title).then(response => response.json());
  console.log('test');
  if(moviedata.results[0] == undefined){
    let nose = {
      poster_path: '/fj21HwUprqjjwTdkKC1XZurRSpV.jpg'
    }
    return nose 
  }
  else{ return moviedata.results[0];}
 
}
// api request end here

// compare ratins  start here

comparatorid.addEventListener('pointerdown', comparator);

function comparator(){
  console.log('comparator: '+namesother);
  console.log('names: '+ names);
  const two = document.createElement('div');
  for(let i=0; i < namesother.length; i++){
    if(names.indexOf(namesother[i]) > -1){
      let namesposition = names.indexOf(namesother[i]);
      console.log("Este nombre esta en el array original: "+namesother[i]);
      console.log('En la posicion: '+names.indexOf(namesother[i]));

      let two_cloned = two.cloneNode(true);
      two_cloned.id = 'ratingtwo'+namesposition;
      two_cloned.innerHTML = ratinother[i];
      two_cloned.className = 'two';
      let posterid = 'poster'+namesposition;
      let ImgListChild = document.getElementById(posterid);
      ImgListChild.appendChild(two_cloned);
      
  }
    else{
      console.log('no comparten esta pelicula ');
      console.log(namesother[i]);
    }
  }
};



