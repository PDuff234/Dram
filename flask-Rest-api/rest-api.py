from flask import Flask, request, Response, make_response, jsonify
import psycopg2
import json
import requests
#from flask_cors import CORS, cross_origin

app = Flask(__name__)
#cors = CORS(app)
#CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/Test", methods=['POST', 'GET'])
#@cross_origin()
def retrieve():

    try:
        connection = psycopg2.connect(user="postgres", password="postgres", host="54.159.204.19", port="5432", dbname="postgres")
        cursor = connection.cursor()


        postgres_insert_query = """ INSERT INTO Test(description) VALUES (%s,)"""
        record_to_insert = ("blablabla")
        cursor.execute(postgres_insert_query, record_to_insert)

        connection.commit()
        count = cursor.rowcount
        print (count, "Record inserted successfully into mobile table")


    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Failed to insert record into mobile table", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
            
    return "send"



app.run(host='0.0.0.0', debug=True)