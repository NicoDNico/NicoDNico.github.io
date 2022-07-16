import requests
from bs4 import BeautifulSoup
import pandas as pd
from mangum import Mangum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import time



app = FastAPI()
handler = Mangum(app)
origins = [
    "http://domainname.com",
    "https://nicodnico.github.io",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
def get_test(member: str):
    response = get_games(member)
    return response

def get_test2(member):
    response = get_games(member)
    return response




def get_info(member):
    def get_rating(rating):
        match rating:
            case "★★★★★":
                return 10
            case "★★★★½":
                return 9
            case "★★★★":
                return 8
            case "★★★½":
                return 7
            case "★★★":
                return 6
            case "★★½":
                return 5
            case "★★":
                return 4
            case "★½":
                return 3
            case "★":
                return 2
            case "½":
                return 1
            case "":
                return 0


 

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
        match rating:
            case 'width: 100%': 
                return 10
            case 'width: 90%':
                return 9
            case 'width: 80%':
                return 8
            case 'width: 70%':
                return 7
            case 'width: 60%':
                return 6
            case 'width: 50%':
                return 5
            case 'width: 40%':
                return 4
            case 'width: 30%':
                return 3
            case 'width: 20%':
                return 2
            case 'width: 10%':
                return 1
            case 'width: 0%':
                return 0


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

