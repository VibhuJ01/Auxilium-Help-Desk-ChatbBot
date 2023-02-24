import mysql.connector as ms
mycon = ms.connect(host="localhost",user="root",db="FAQ",passwd="vibhu")
cur1 = mycon.cursor()

def tables():

    sql = '''create table questions
    (
     Qnumber int primary key,
     keyword1 varchar(100),
     keyword2 varchar(100)
    );'''

    cur1.execute(sql)
    mycon.commit()
    
    sql = '''create table solutions
    (
     snumber int primary key,
     question varchar(500),
     answer varchar(1000)
    );'''
    
    cur1.execute(sql)
    mycon.commit()


tables()
print('Done')
mycon.close()
