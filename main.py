import mysql.connector as ms
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

# Connect to Database
mycon = ms.connect(host="localhost", user="root", db="FAQ", passwd="vibhu")
cur1 = mycon.cursor()

# Get all questions/keywords
sql = "select * from questions"
cur1.execute(sql)
keyword = cur1.fetchall()

# Get All Solutions
sql = "select * from solutions"
cur1.execute(sql)
solutions = cur1.fetchall()
 

# Process Question
def process_question(q):
    question = q
    # Input Question
    question = question.lower()
    question = question.replace('?', '')
    question = question.replace('.', '')
    q_no = []

    # Processing
    for i in keyword:
        if(i[1] not in question and i[2] == None):
            continue

        elif(i[1] in question and i[2] == None):
            q_no.append(i[0]-1)

        elif(i[1] in question and i[2] in question):
            q_no.append(i[0]-1)
            break

        elif(i[1] in question or i[2] in question):
            q_no.append(i[0]-1)
            
        ques = []
        ans = []
        count = 0

        for i in q_no:
            count += 1
            ques.append(solutions[i][1])
            ans.append(solutions[i][2])

        hello = ['hi','hello','alola']
        temp = []
        for i in hello:
            if i == question:
                a = 'Hello, How may I help you?'
                temp.append(a)
                return {'Question->':temp},{'Answer->':(' ')},{'count': count}

    return {'Question->':ques},{'Answer->':ans},{'count': count}


# Handle route
@app.get("/")
def get_answer(question: str = ""):
    return process_question(question)


cur1.close()
mycon.close()
