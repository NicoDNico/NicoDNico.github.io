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

// retrieves the #name #rating and link of the movies from the csv given by the user or the API
// thanks to a spelling mistake this now only works with CVS recipes.
async function  DataofMovies(CVSdata){
  let datalenght = CVSdata.length;
  if(check == true){
  CVSdata.sort(function(a, b){
    if (a.Rating<b.Rating){
      return 1;
    }
    if (a.Rating>b.Rating){
      return -1;
    }
    return 0;
  });
  for(let i = 0; i < datalenght -1 ; i++){
      let objdata = Object.entries(CVSdata[i]);
      if(objdata[4][1]>=4){
      names.push(objdata[1][1]);
      ratin.push(objdata[4][1]);
      links.push(objdata[3][1]);
      }
    else{
      }
    }}
      else{
        for(let i = 0; i < CVSdata.length; i++){
        let f = Papa.parse(CVSdata[0],papaconfig).data;
        let objdatarecursive = Papa.parse(CVSdata[i],papaconfig).data;
        let namestemp = [];
        let ratintemp = [];
        let linkstemp = [];
        for(let j = 0; j <= objdatarecursive.length-2; j++){
          if(objdatarecursive[j].Rating>=7){
          namestemp.push(objdatarecursive[j].Name);
          ratintemp.push(objdatarecursive[j].Rating);
          linkstemp.push(objdatarecursive[j].Link);
          }
          else{
          }}
          names.push(namestemp);
          ratin.push(ratintemp);
          links.push(linkstemp);
      
    }
    console.log('DataofMovies Finished');
  return [names, ratin]
  }}
// retreves rating and name of a movies from the datagiven to the other
async function  DataofMovies2(csvdata){
  let datalenght = Object.keys(csvdata).length;
  if(check == true){
    for(let i = 0; i < datalenght -1 ; i++){
      let objdata = Object.entries(csvdata[i]);
        namesother.push(objdata[1][1]);
        ratinother.push(objdata[4][1]);
    }
  }
  else{
    let namesothertemp = []
    let ratinothertemp = []
    let ParsedCsv= Papa.parse(csvdata,papaconfig).data;
    for(let i = 0; i < ParsedCsv.length; i++){
      let objdatarecursive = ParsedCsv[i];
      namesothertemp.push(objdatarecursive[1][1]);
      ratinothertemp.push(objdatarecursive[4][1]);
    }
    namesother.push(namesothertemp);
    ratinother.push(ratinothertemp);
  }
  return [namesother, ratinother]
};


// checks the mode the page is in. And then reads the files if in csv mode or launches the api if in id mode. Then launches the comparison function.
btn.addEventListener("pointerdown", async function (e) {
  topbar.className = 'barraleft shadowred ' ;
  if(check == true){
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


// reads the second csv file 
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
  // maybe with a framework i would not need 3 different loops maybe i could add all to a single loop but this works. this loop adds the poster container
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

  // this loops adds the titles
  for(let i = 0; i < names.length ; i++){
    let divt_cloned = divt.cloneNode(true);
    divt_cloned.innerHTML = names[i] ;
    divt_cloned.id = 'namediv'+ i ;
    let posterid = 'poster' + i;
    let ImgListChild = document.getElementById(posterid);
    ImgListChild.appendChild(divt_cloned);
  };

// this loop adds the img and the rating
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


const textbox = document.getElementById('search');
const textboxOther = document.getElementById('searchOther');

// calls the python api and receives the data in csv
async function letterboxdAPicall(memberAPI){
  // https://ztjpjn5f7fwndqkdylx5t36hyq0zakks.lambda-url.us-east-1.on.aws/api/nidan
  let memberjson = await fetch('http://127.0.0.1:8000/api/'+ memberAPI).then(response => response.json());
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
  if(checkbox.checked){
    dropother.style.display = 'block';
    dropyourself.style.display = 'block';
    userfile.style.display = 'block';
    comparefile.style.display = 'block';
    textboxContainer.style.display = 'none';
    TextBoxOtherContainer .style.display = 'none';
    check = false;
  }
  if(!checkbox.checked){
    dropother.style.display = 'none';
    dropyourself.style.display = 'none';
    userfile.style.display = 'none';
    comparefile.style.display = 'none';
    textboxContainer.style.display = 'flex';
    TextBoxOtherContainer .style.display = 'flex';
    check = true;
  }
  
});

test.addEventListener("pointerdown", async function(){
  let member = await letterboxdAPicall('nidan');
  let member2 = Papa.parse(member[0],papaconfig).data
  removedivs();
  console.log('member2 :',member2);
  await DataofMovies(member);
  console.log('paginator starts')
  await addpaginator(names);
console.log('paginator ends/ moviepages starts')
  addmoviepages();
  console.log('moviepages ends/ divtopages starts')
  await adddivtopages();
});
// function that makes an array with n number of elements or testing 
function arraymaker(number){
  let array = [];
  for(let i =0; i < number; i++){
    array.push(i);
  }
  return array;
}

// making the pages each with 72 elements

async function addpaginator(array){
 let paginatorContainer = document.getElementById("paginatorContainer");
 //pagesN is pagesNumber
 let pagesN = document.createElement('h1');
 for(let i=1; i <= array.length; i++){
    let pagesN_cloned = pagesN.cloneNode(true);
    pagesN_cloned.id = 'page'+i;
    pagesN_cloned.innerHTML = i;
    pagesN_cloned.className = 'page';
    paginatorContainer.appendChild(pagesN_cloned);
    pagesN_cloned.addEventListener('pointerdown', async function(){
      let PageContainerId = document.getElementById('pagemoviecontainer'+i);
      let pagesquery = document.querySelectorAll('.basic-grid');
      pagesquery.forEach(elements=> {
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
  for(let i=1; i <= paginatorContainer.childElementCount; i++){
    let page_cloned = page.cloneNode(true);
    page_cloned.id = 'pagemoviecontainer'+i;
    page_cloned.style = 'display: none;';
    page_cloned.appendChild(examplePoster.cloneNode(true));
    page_cloned.appendChild(examplePoster.cloneNode(true));
    pageContainer.appendChild(page_cloned);
  }
}
async function adddivtopages(){
  let poster = document.createElement('div');
  poster.className = 'poster';
  let title = document.createElement('div');
  title.className = 'titulo';
  let img = document.createElement('img');
  img.alt = '';
  let one = document.createElement('div');
  one.className = 'one';

  for(let i = 0; i< names.length;i++){
    let page = document.getElementById('pagemoviecontainer'+(i+1));
    for(let j = 0; j<names[i].length;j++){
      let poster_cloned = poster.cloneNode(true);
      poster_cloned.id = 'poster_'+i+'_'+j;
      let title_cloned = title.cloneNode(true);
      title_cloned.innerHTML = names[i][j];
      let img_cloned = img.cloneNode(true);
      let x = await tmdbapi(names[i][j]);
      img_cloned.src = "https://image.tmdb.org/t/p/w500"+ x.poster_path;
      img_cloned.alt = names[i][j];
      let one_cloned = one.cloneNode(true);
      one_cloned.innerHTML = ratin[i][j];
      poster_cloned.appendChild(title_cloned);
      poster_cloned.appendChild(img_cloned);
      poster_cloned.appendChild(one_cloned);
      page.appendChild(poster_cloned);
    }
  }
}