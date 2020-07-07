"""
Created on Wed May 20 11:47:30 2020

flask is the name of the module

@author: Admin
"""


from flask import Flask, url_for, render_template, request, redirect, session
from flask_session import Session
from markupsafe import escape
import datetime
import random


# app = Flask(__name__)
# app = Flask(__name__.split('.')[0])

# app is the variable that reprsents the flask application
# the __name__ argument means that I am serving the flask application from THIS file

app = Flask("Hello")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/')
@app.route('/<name>')
def index(name=None):
    return render_template('hello.html', name=name)


@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)


@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user

    return f"User name is  {escape(username)}"
    # return 'User %s' % escape(username)


@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id


@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)


@app.route('/projects/')
def projects():
    return 'The project page'


@app.route('/about')
def about():
    return 'The about page'


@app.route('/login')
def login():
    return 'login'


@app.route('/wkg/')
@app.route('/wkg/<name>')
def wkg(name=None):
    title = "WKG - Working Examples"
    currentTime = datetime.datetime.now()
    headsOrTails = random.randint(0, 1)
    myFavoriteFoods = ['Raspberries', 'Sweet Potato Fries', 'Tuna Emmental Quiche', 'Key Lime Pie', 'Vanilla Chip Ice Cream']
    return render_template('wkg.html',
                           name=name,
                           currentTime=currentTime,
                           headsOrTails=headsOrTails,
                           myFavoriteFoods=myFavoriteFoods,
                           title=title
                           )


@app.route('/feedback', methods=['POST'])
def feedback():
    name = request.form['name']
    email = request.form['emailAddress']
    zip = email = request.form['zip']
    allBusiness = request.form['allBusiness']
    if allBusiness:
        allBusiness = request.form['allBusiness'].split(',')
    allInterested = request.form['allInterested']
    if allInterested:
        allInterested = request.form['allInterested'].split(',')
    allColors = request.form['allColors']
    if allColors:
        allColors = request.form['allColors'].split(',')
    title = "Thank you, " + name
    return render_template('feedback.html',
                           title=title,
                           name=name,
                           email=email,
                           zip=zip,
                           allBusiness=allBusiness,
                           allInterested=allInterested,
                           allColors=allColors
                           )


with app.test_request_context():
    print("url for index = " + url_for('index'))
    print("url for login = " + url_for('login'))
    print("url for login, next='/' = " + url_for('login', next='/'))
    print("url for show_user_profile = " + url_for('show_user_profile', username='John Doe'))
    print("url for static style.css = " + url_for('static', filename='style.css'))

# if __name__ == "__main__":
#    app.run()
