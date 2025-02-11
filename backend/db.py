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


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS results (
            id SERIAL PRIMARY KEY,
            timestamp TIMESTAMP NOT NULL,
            heatmap_image BYTEA NOT NULL,
            prediction TEXT NOT NULL,
            confidence FLOAT NOT NULL
        );
    """)

    conn.commit()
    cursor.close()
    conn.close()