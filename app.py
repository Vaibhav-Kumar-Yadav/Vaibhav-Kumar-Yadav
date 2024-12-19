from flask import Flask, render_template

app = Flask(__name__)

@app.route('/index.html')
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/blogs.html')
def blogs():
    return render_template('blogs.html')

@app.route('/projects.html')
def projects():
    return render_template('projects.html')

if __name__ == '__main__':
    app.run(debug=True)