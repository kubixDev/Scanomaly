import psycopg2
from config import DB_HOST, DB_NAME, DB_USER, DB_PASS


def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    return conn