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


async function  DataofMovies(CVSdata){
  let datalenght = Object.keys(CVSdata).length;
  if(check == false){
  CVSdata.sort(function(a, b){
    if (a.Rating<b.Rating){
      return 1;
    }
    if (a.Rating>b.Rating){
      return -1;
    }
    return 0;
  })};
    for(let i = 0; i < datalenght -1 ; i++){
      let objdata = Object.entries(CVSdata[i]);
      if(check == false){
        if(objdata[4][1]>=4){
        names.push(objdata[1][1]);
        ratin.push(objdata[4][1]);
        links.push(objdata[3][1]);
        }
        else{
        }}
      else{
          if(objdata[4][1]>=7){
          names.push(objdata[1][1]);
          ratin.push(objdata[4][1]);
        }
        else{
        }
    }}
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
};


// saves the data of primary csv
btn.addEventListener("pointerdown", async function (e) {
  topbar.className = 'barraleft shadowred ' ;
  if(check == false){
    e.preventDefault
    let input = csvFile.files[0];
    if(check1 == true){
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



async function csvreader2(){
  let input = csvFile2.files[0];
  if(check2 == true){
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
async function adddiv(){
  removedivs();
  const divt = document.createElement('div');
  divt.className = 'titulo';
  divt.innerHTML = '';
  const divp = document.createElement('div');
  divp.className = 'poster';
  const ImgList = document.getElementById('ImgList');
  const imgurl = document.createElement('img');
  const divtinfo = document.createElement('h3');
  divtinfo.className = 'info';
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
}
function removedivs(){
 btn.style.display = 'none';
 dropother.style.display = 'none';
 dropyourself.style.display = 'none';
 document.getElementById("examplePoster").style.display = 'none';

}
// api requests start here

async function tmdbapi(x){
  let title = x.replace(/\s+/g,'%20');
  let moviedata = await fetch("https://api.themoviedb.org/3/search/multi?"+apikey+"&language=en-US&query="+title).then(response => response.json());
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


function comparator(){
  console.log('comparator: '+namesother);
  console.log('names: '+ names);
  const two = document.createElement('div');
  for(let i=0; i < namesother.length; i++){
    if(names.indexOf(namesother[i]) > -1){
      let namesposition = names.indexOf(namesother[i]);
      moviesshared.push(namesother[i]);

      let two_cloned = two.cloneNode(true);
      two_cloned.id = 'ratingtwo'+namesposition;
      two_cloned.innerHTML = ratinother[i];
      two_cloned.className = 'two';
      let posterid = 'poster'+namesposition;
      let ImgListChild = document.getElementById(posterid);
      ImgListChild.appendChild(two_cloned);
      
  }
    else{
      moviesnotshared.push(namesother[i]);
    }
  }
  console.log(moviesshared);
  console.log(moviesnotshared);
};

// page maker

const textbox = document.getElementById('search');
const textboxOther = document.getElementById('searchOther');

test.addEventListener("pointerdown", async function(){
  let member = textbox.value; 
  let member2 = textboxOther.value;
  console.log("You're: "+member);
  console.log("Other is: "+member2);
  console.log("algo raro esta pasando")
  let MemberData = await letterboxdAPicall(member);
  MemberDataParsed = Papa.parse(MemberData,papaconfig).data;
  console.log(MemberDataParsed);
  // let MemberDataOther = await letterboxdAPicall(member2);
  // MemberDataOtherParsed = Papa.parse(MemberDataOther,papaconfig).data;
  // console.log(MemberDataOtherParsed);
});

async function letterboxdAPicall(memberAPI){
  let memberjson = await fetch('http://localhost:8000/api/'+ memberAPI).then(response => response.json());
  return memberjson;
};

// drop box. 

const dropyourself = document.getElementById("downloadyourself");
const dropother = document.getElementById("downloadother");

dropyourself.addEventListener("dragover", e =>{
  e.preventDefault();
  console.log('dragtest')
});

dropyourself.addEventListener("drop", function(e) {
  e.preventDefault();
  dropfile = e.dataTransfer.files[0];
  console.log(dropfile);
  check1 = true;
});

dropother.addEventListener("dragover", e =>{
  e.preventDefault();
  console.log('dropothertest')
});
dropother.addEventListener("drop",function(e) {
  e.preventDefault();
  dropfile2 = e.dataTransfer.files[0];
  console.log(dropfile2);

  check2 = true;
 
});

document.addEventListener("dragover", event=>{
  event.preventDefault();
});
document.addEventListener("drop", event=>{
  event.preventDefault();
});

const checkbox = document.getElementById("switch");
const TextBoxOtherContainer = document.getElementById("searchBoxOtherContainer");
const textboxContainer = document.getElementById("searchBoxContainer");
var check = false;
checkbox.addEventListener("change", function(){
  console.log('x');
  if(checkbox.checked){
    console.log('checked');
    dropother.style.display = 'none';
    dropyourself.style.display = 'none';
    userfile.style.display = 'none';
    comparefile.style.display = 'none';
    textboxContainer.style.display = 'block';
    TextBoxOtherContainer .style.display = 'block';
    check = true;
  }
  else{
    console.log('unchecked');
    dropother.style.display = 'block';
    dropyourself.style.display = 'block';
    userfile.style.display = 'block';
    comparefile.style.display = 'block';
    textboxContainer.style.display = 'none';
    TextBoxOtherContainer .style.display = 'none';
    check = false;
  }
  
});
