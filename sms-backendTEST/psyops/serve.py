from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "some_secret_key"

@app.route('/')
def index():
    return render_template("./templates/template.html")

@app.route('/scrape', methods=['POST'])
def scrape():
    listingId = request.form.get('listingId')
    max_reviews = int(request.form.get('max_reviews'))
    url = request.form.get('url')

    try:
        # Assuming your script is named 'scraper.py' and the 'run' function is inside it
        from scraper import run
        run(listingId, max_reviews, url)
        flash("Scraping completed successfully!", "success")
    except Exception as e:
        flash(f"Error occurred: {e}", "danger")
    
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
