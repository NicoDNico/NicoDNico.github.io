import requests
from bs4 import BeautifulSoup
import pandas as pd
import csv

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
member= 'nidan'
boilerdate = '2000-01-01'

content = requests.get('https://letterboxd.com/'+ member +'/films/by/member-rating/page/2/')
soup = BeautifulSoup(content.text, 'html.parser')
URL = soup.find('ul', class_='poster-list')
pages = soup.find('div' , class_='paginate-pages')
pages_li = pages.find_all('li')
pages_last = pages_li[-1].text.strip()

moviesdata = URL.find_all('div',{"data-film-id":True})
movies_list = []
movies_rating_list = []
movies_titles = []

print(pages_last)
print(int(pages_last))

for i in range (3):
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
        S = slice(6,-1)
        movie_title = movie_link[S]
        movies_titles.append(movie_title)
    for movie in moviesratingx :
        movie_rating = get_rating(movie.text.strip())
        movies_rating_list.append(movie_rating)
    moviesinfo = pd.DataFrame({'Date': boilerdate,'Name': movies_titles,'Year': boilerdate,'movies-link':movies_list, 'Rating':movies_rating_list})
    print(moviesinfo)
    moviesinfo.to_csv('moviesinfo.csv', index=False)




