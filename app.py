import redis
import requests
from flask import Flask
from bs4 import BeautifulSoup

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

@app.route('/')
def main():
    return 'Hello World!\n'

def add_product(url):
    html = requests.get(url).text
    soup = BeautifulSoup(html)
    name = soup.find('div', {'data-component' : 'listing-page-title-component'}).find('h1').get_text()
    price = soup.find('div', {'data-buy-box-region' : 'price'}).find('p').get_text()
    image = soup.find('div', {'data-component' : 'listing-page-image-carousel'}).find('img')['src']
