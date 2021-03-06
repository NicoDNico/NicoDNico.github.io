import requests
from bs4 import BeautifulSoup
import pandas as pd
from mangum import Mangum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import re
import math


import time



app = FastAPI()

origins = [
    "http://domainname.com",
    "https://nicodnico.github.io",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/api/{member}")
def get_member(member: str):
    start = time.time()
    response = get_info(member)
    print(f'Time: {time.time() - start}')
    return response

@app.get("/t/{member}")
def get_backloggd(member: str):
    response = get_games(member)
    return response

@app.get("/imdb/{member}")
def get_test(member: str):

    global movies_imdb_name
    global movies_imdb_url
    global movies_imdb_rating 
    movies_imdb_name = []
    movies_imdb_url = []
    movies_imdb_rating = []
    get_imdb("https://www.imdb.com/user/ur49546000/ratings?sort=your_rating,desc&ratingFilter=0&mode=detail&ref_=undefined&lastPosition=0")
    response = pd.DataFrame({'Name': movies_imdb_name,'Link': movies_imdb_url,'Rating': movies_imdb_rating})
    print(response)
    return response.to_csv(header=True, index=False)

handler = Mangum(app)


def get_info(member):
    def get_rating(rating):
        # api gateway doesnt support match yet so fuck me cause i aint not learning no dictionaries.
        if rating == "★★★★★":
            return 10
        if rating == "★★★★½":
            return 9
        if rating == "★★★★":
            return 8
        if rating == "★★★½":
            return 7
        if rating == "★★★":
            return 6
        if rating == "★★½":
            return 5
        if rating == "★★":
            return 4
        if rating == "★½":
            return 3
        if rating == "★":
            return 2
        if rating == "½":
            return 1
        if rating == "":
            return 0
        # match rating:
        #     case "★★★★★":
        #         return 10
        #     case "★★★★½":
        #         return 9
        #     case "★★★★":
        #         return 8
        #     case "★★★½":
        #         return 7
        #     case "★★★":
        #         return 6
        #     case "★★½":
        #         return 5
        #     case "★★":
        #         return 4
        #     case "★½":
        #         return 3
        #     case "★":
        #         return 2
        #     case "½":
        #         return 1
        #     case "":
        #         return 0


 

    content = requests.get('https://letterboxd.com/'+ member +'/films/by/member-rating/page/2/')
    soup = BeautifulSoup(content.text, 'html.parser')
    URL = soup.find('ul', class_='poster-list')
    pages = soup.find('div' , class_='paginate-pages')
    pages_li = pages.find_all('li')
    pages_last = pages_li[-1].text.strip()

    movies_list = []
    movies_rating_list = []
    movies_titles = []
    boilerdate = []


    moviescsv = []

    numOfpages = int(pages_last)
    if numOfpages > 40:
         numOfpages = 40


    for i in range (1,numOfpages+1):

        print(i)
        contentx = requests.get('https://letterboxd.com/'+ member +'/films/by/member-rating/page/'+ str(i) +'/')
        print('https://letterboxd.com/'+ member +'/films/by/member-rating/page/'+ str(i) +'/')
        soupx = BeautifulSoup(contentx.text, 'html.parser')
        URLx = soupx.find('ul', class_='poster-list')
        moviesdatax = URLx.find_all('div',{"data-film-id":True})
        moviesratingx = URLx.find_all('span',{"class":"rating"})
        for movie in moviesdatax :
            movie_link = movie['data-target-link']
            movie_url = 'https://letterboxd.com' + movie_link
            movies_list.append(movie_url)
            # print(movie)
            movie_title = movie.find('img')['alt']
            movies_titles.append(movie_title)
            boilerdate.append('2000,01,01')
        for movie in moviesratingx :
            movie_rating = get_rating(movie.text.strip())
            movies_rating_list.append(movie_rating)
        print(len(movies_list), len(movies_rating_list), len(movies_titles), len(boilerdate))
        # function that check if all vaues are the same if not adds till all are the same
        while len(movies_list) != len(movies_rating_list):
            movies_rating_list.append('')
    moviesinfo = pd.DataFrame({'Date': boilerdate,'Name': movies_titles,'Year': boilerdate,'Link':movies_list, 'Rating':movies_rating_list})
    # moviescsv.append(moviesinfo.to_csv(header=True, index=False))
    #moviesinfo.to_csv('C:/Users/nicod/Documents/GitHub/Future-supercool-thingy/python/tutorial_env/moviesinfo.csv', index=False)
    return moviesinfo.to_csv(header=True, index=False)

def get_games(member):

    def get_rating(rating):
        # api gateway doesnt support match yet so fuck me cause i aint not learning no dictionaries.
        if rating == 'width:100%':
            return 10
        if rating == 'width:90%':
            return 9
        if rating == 'width:80%':
            return 8
        if rating == 'width:70%':
            return 7
        if rating == 'width:60%':
            return 6
        if rating == 'width:50%':
            return 5
        if rating == 'width:40%':
            return 4
        if rating == 'width:30%':
            return 3
        if rating == 'width:20%':
            return 2
        if rating == 'width:10%':
            return 1
        else :
            return 0
        # match rating:
        #     case 'width:100%': 
        #         return 10
        #     case 'width:90%':
        #         return 9
        #     case 'width:80%':
        #         return 8
        #     case 'width:70%':
        #         return 7
        #     case 'width:60%':
        #         return 6
        #     case 'width:50%':
        #         return 5
        #     case 'width:40%':
        #         return 4
        #     case 'width:30%':
        #         return 3
        #     case 'width:20%':
        #         return 2
        #     case 'width:10%':
        #         return 1
        #     case 'width:0%':
        #         return 0


    content = requests.get('https://www.backloggd.com/u/'+member+'/games/user-rating?page=1')
    soup = BeautifulSoup(content.text, 'html.parser')
    main = soup.find('main', class_='main')
    container = main.find('div', class_='container')
    pages = container.find('nav', class_='pagination')
    NumberPages = pages.find_all('a')[-2].text

    
    link_list = []
    poster_list = []
    title_list = []
    rating_list = []
    for i in range (1,int(NumberPages)+1):
        content = requests.get('https://www.backloggd.com/u/'+member+'/games/user-rating?page=' + str(i))
        soup = BeautifulSoup(content.text, 'html.parser')
        main = soup.find('main', class_='main')
        container = main.find('div', class_='container')
        lista = container.find('div', id='game-lists')
        games = lista.find_all('div', class_='col-cus-5')
        print('https://www.backloggd.com/u/'+member+'/games/user-rating?page=' + str(i))
        for game in games:
            game_link = game.find('a')['href']
            game_url = 'https://www.backloggd.com' + game_link
            link_list.append(game_url)
            game_poster = game.find('img')['src']
            poster_list.append(game_poster)
            game_title = game.find('img')['alt']
            title_list.append(game_title)
            game_rating = game.find('div', class_='stars-top')
            if game_rating:
                rating_list.append(get_rating(game_rating['style']))
            else:
                rating_list.append('0')   
            
        Games_data = pd.DataFrame({'Name': title_list,'Poster': poster_list,'Link':link_list, 'Rating':rating_list})


    return Games_data.to_csv(header=True, index=False)

testeo = []
def get_imdb(URL):
    headersx = {"Accept-Language" : "en-US"}
    content = requests.get(URL, headers=headersx)
    soup = BeautifulSoup(content.text, 'html.parser')
    body = soup.find('div', class_='lister')
    pagination = body.find('div', class_='list-pagination')
    paginationRange = pagination.find('span', class_='pagination-range').string
    Range = re.findall(r'(\d+)(?!.*\d)', paginationRange).pop()
    CheckPage = pagination.find('a', class_='next-page')['href']
    List = body.find('div', class_='lister-list').find_all('div', class_='lister-item mode-detail')
    for movie in List:
        movie_name = movie.find('h3', class_='lister-item-header').find('a').text
        movies_imdb_name.append(movie_name)
        movie_link = movie.find('a')['href']
        movie_url = 'https://www.imdb.com' + movie_link
        movies_imdb_url.append(movie_url)
        movie_rating = movie.find('div', class_='ipl-rating-star--other-user').find('span', class_='ipl-rating-star__rating').text
        movies_imdb_rating.append(movie_rating)



    if CheckPage == URL or CheckPage == '#':
        print(CheckPage)
        print("End of pages")
    elif CheckPage != URL:
        print(CheckPage)
        print("More pages left")
        get_imdb("https://www.imdb.com"+CheckPage)



