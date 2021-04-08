import redis
import requests
import random
import string
from flask import Flask, render_template, request, flash, redirect, url_for
from bs4 import BeautifulSoup
import mysql.connector

app = Flask(__name__)
app.secret_key = ''.join(random.choice(string.ascii_letters) for i in range(10))
cache = redis.Redis(host='redis', port=6379)

def connect():
    connection = mysql.connector.connect(
        host='db',
        port=3306,
        user='root',
        password='1237132758'
    )

    cursor = connection.cursor()
    cursor.execute('CREATE DATABASE IF NOT EXISTS ProductViewer')
    cursor.execute('USE ProductViewer')

    return connection

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/add_product', methods=['GET', 'POST'])
def add_product():
    connection = connect()
    cursor = connection.cursor()
    message = ''
    if request.method == 'POST':
        url = request.form['url'].strip()
        
        try:
            cursor.execute('CREATE TABLE IF NOT EXISTS Product (ID INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), Image VARCHAR(255), Price FLOAT)')

            html = requests.get(url).text
            soup = BeautifulSoup(html)

            name = soup.find('div', {'data-component' : 'listing-page-title-component'}).find('h1').get_text().strip()
            price = soup.find('div', {'data-buy-box-region' : 'price'}).find('p').get_text().strip()[1:]
            image = soup.find('div', {'data-component' : 'listing-page-image-carousel'}).find('img')['src'].strip()

            sql = 'INSERT INTO Product (Name, Image, Price) VALUES (%s, %s, %s)'
            val = (name, image, price)
            cursor.execute(sql, val)
            connection.commit()

            cursor.close()
            connection.close()

            message = f'"{name}" added to the database successfully.'
        except (requests.exceptions.MissingSchema, AttributeError):
            message = 'Invalid URL'
    
    return render_template('add_product.html', message = message)

@app.route('/products')
def display_products():
    connection = connect()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Product')
    rows = [list(i) for i in cursor.fetchall()]
    
    # header = [i[0] for i in cursor.description]
    # rows.insert(0, header)
    cursor.close()
    connection.close()

    return render_template('products.html', products = rows)
