import datetime
from psycopg2 import pool
import os
from dotenv import load_dotenv

load_dotenv()

# db_url = os.getenv("DATABASE_URL")
# lmao for some fucking reason the env var wasn't being fetched correctly, like it had the schema that i removed long ago
# idk wtf is wrong, its testing db anyways so here is the cute hardcoded value that MUST NOT GO INTO PRODUCTION
connection_pool = pool.SimpleConnectionPool(1, 10, dsn="postgresql://kata:aightwhatever@localhost:5432/spa-db")

def get_connection():
    return connection_pool.getconn()


def release_connection(conn):
    connection_pool.putconn(conn)

def execute_sql(sql, params=None, executeMany=False, fetch=False):
    conn = get_connection()
    result = None  
    try:
        with conn.cursor() as cursor:
            if fetch:
                cursor.execute(sql, params)
                result = cursor.fetchall()
                return result  
            elif executeMany:
                cursor.executemany(sql, params)
            else:
                cursor.execute(sql, params)
            conn.commit()  
    except Exception as e:
        conn.rollback() 
    finally:
        release_connection(conn)
    return result

# really didn't wanted to do this but shell was messing url so whateva
def get_url_from_listing(listingId):
    listingId = int(listingId)
    sql = """
    SELECT place_url FROM "Listing" WHERE id = %s;
    """

    params = (listingId,)
    result = execute_sql(sql, params, False, True)
    return result[0][0]

def update_listing_expiration(listingId, expiresAt):
    sql = """
    UPDATE "Listing"
    SET "dataExpiresIn" = %s
    WHERE id = %s
    """
    params = (expiresAt, listingId)
    execute_sql(sql, params)


def batch_insert_reviews(listingId, reviews):
    expiresAt = datetime.datetime.now() + datetime.timedelta(hours=24)
    sql = """
    INSERT INTO "Review" ("listingId", author, "authorDescription", stars, date, content)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    review_data = [(listingId, review['author'], review['authorDescription'], review['stars'].split(' ')[0], review['date'], review['content']) for review in reviews]
    execute_sql(sql, review_data, True)
    update_listing_expiration(listingId, expiresAt)
