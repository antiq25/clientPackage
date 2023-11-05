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


def update_listing_expiration(listingId, expiresAt):
    sql = """
    UPDATE "Listing"
    SET "dataExpiresIn" = %s
    WHERE id = %s
    """
    params = (expiresAt, listingId)
    execute_sql(sql, params)


def execute_sql(sql, params=None, executeMany = False):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            print(f"Executing SQL: {sql} with params: {params}") 
            if executeMany:
                cursor.executemany(sql, params)
            else:
                cursor.execute(sql, params)
            print("SQL executed successfully.") 
            conn.commit()  
            print("Changes committed to the database.") 
    except Exception as e:
        conn.rollback() 
        print(f"Error executing SQL: {e}. Changes rolled back.")
    finally:
        release_connection(conn)


def batch_insert_reviews(listingId, reviews):
    expiresAt = datetime.datetime.now() + datetime.timedelta(hours=2)
    sql = """
    INSERT INTO "Review" ("listingId", author, "authorDescription", stars, date, content)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    review_data = [(listingId, review['author'], review['authorDescription'], review['stars'].split(' ')[0], review['date'], review['content']) for review in reviews]
    execute_sql(sql, review_data, True)
    update_listing_expiration(listingId, expiresAt)