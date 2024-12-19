from flask_frozen import Freezer
from app import app

# Configuration
app.config['FREEZER_DESTINATION'] = 'docs'  # Output to docs directory
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()