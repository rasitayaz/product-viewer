import redis
import requests
from flask import Flask
from bs4 import BeautifulSoup
import mysql.connector

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

@app.route('/')
def main():
    connection = mysql.connector.connect(
        host='db',
        port=3306,
        user='root',
        password='1237132758'
    )

    cursor = connection.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS ProductViewer")
    cursor.execute("USE ProductViewer")

    connection.commit()

    return 'test'

def add_product(url, cursor):
    cursor.execute("CREATE TABLE IF NOT EXISTS Product (ID INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), Image VARCHAR(255), Price FLOAT)")

    html = requests.get(url).text
    soup = BeautifulSoup(html)

    name = soup.find('div', {'data-component' : 'listing-page-title-component'}).find('h1').get_text().strip()
    price = soup.find('div', {'data-buy-box-region' : 'price'}).find('p').get_text().strip()[1:]
    image = soup.find('div', {'data-component' : 'listing-page-image-carousel'}).find('img')['src'].strip()

    sql = "INSERT INTO Product (Name, Image, Price) VALUES (%s, %s, %s)"
    val = (name, image, price)
    cursor.execute(sql, val)
