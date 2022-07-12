from operator import index
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




def get_info(member):
    def get_rating(rating):
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
        return 404

 

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
    if numOfpages > 20:
        numOfpages = 20


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


