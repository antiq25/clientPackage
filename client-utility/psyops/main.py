from src.scraper import run
from argparse import ArgumentParser

parser = ArgumentParser()

parser.add_argument("listingId", type=int, help="The listing ID to scrape reviews from")
parser.add_argument("max_reviews", type=int, help="The maximum number of reviews to scrape")
parser.add_argument("url", type=str, help="The URL to scrape reviews from")

args = parser.parse_args()

listingId = args.listingId
max_reviews = args.max_reviews
url = args.url

if not listingId or not max_reviews or not url:
    print("You must provide a listingId, max_reviews, and url.")
    exit()    

if __name__ == "__main__":
    run(listingId, max_reviews, url)