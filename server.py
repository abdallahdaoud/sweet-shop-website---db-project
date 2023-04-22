import mysql.connector
from socket import *
import json
import os
from datetime import date

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="MData119",
    auth_plugin='mysql_native_password',
    database="SweetsShop"
)
mycursor = db.cursor()

# os.system("start cd sweet-shop & echo Type: 'npm start' to run")
# os.system("start cd customers-website & echo Type: 'npm start' to run")

os.system("cd sweet-shop & start npm start")
os.system("cd customers-website & start npm start")



head = (
        "HTTP/1.1 200 OK\r\n"
        "Access-Control-Allow-Origin: *\r\n"  # Set the Access-Control-Allow-Origin header
        "Content-Type: application/json\r\n"
        "\r\n"
)

#####################
def serverReq(x):
    mycursor.execute(x)
    if(x[0:6].upper() == "SELECT"):
        res = []
        for row in mycursor: #{row[i]: row[i + 1] for i in range(0, len(row), 2)}
            res.append(row)
        res = json.dumps(res)
        print(res)
        connectionSocket.sendall(bytes(head + res, "UTF-8"))
    else:
        connectionSocket.send(bytes(head + "execute command succeeded", "UTF-8"))
        db.commit()        #if you want changes to be permenent into the database
        print("execute command succeeded")

def customerReq(x):
    phones=[]
    myList=[]
    sweetNames=[]
    for i in x.split(','):
        myList.append(i)
    print(myList)
    mycursor.execute("SELECT phone FROM Customers")
    for s in mycursor:
        phones.append(s[0])
    print(f'Phones in DB: {phones}')
    if myList[1] not in phones:
        mycursor.execute(f"insert into Customers (phone, cname, email) values ('{myList[1]}','{myList[0]}','{myList[2]}')")
        db.commit()
        print("Customer added")
    mycursor.execute("select sName from sweets")    
    for x in mycursor:
        sweetNames.append(x[0])
    print(f'Sweets in DB: {sweetNames}')
    if myList[3] in sweetNames:
        mycursor.execute(f"INSERT INTO orders (price, OrderDate, customers_phone, Sweet_name) VALUES('{myList[4]}','{str(date.today())}','{myList[1]}','{myList[3]}')")
        db.commit()        #if you want changes to be permenent into the database
        print("Sweet is in the store")
        connectionSocket.send(bytes("execute command succeeded", "UTF-8"))
        print("execute command succeeded")
    else:
        print("Wrong input for sweet")

#####################
PORT = 9000  # the port that we will be working on
SERVER = socket(AF_INET, SOCK_STREAM)  # create a new socket from type Af_INET, and the SOCK_STREAM is TCP
SERVER.bind(("", PORT))  # to bind the IP address of the device with the port we created
SERVER.listen(1)  # server is waiting for a connection
print("THE SERVER IS NOW RECEIVING")
i = 1
while True:
    connectionSocket, address = SERVER.accept()  # if their is a connection it will make a connection for every call
    Response = connectionSocket.recv(1824).decode()
    ip = address[0]  # to get the ip address of the device
    port = address[1]  # to get the port of the device
    print("**********************************************************************")
    try:
        x = Response.split()[1].replace('%20', ' ').replace('/', '').replace('%3E', '>').replace('%3C', '<')
        print("requested command[" + str(i) + "]: " + x + "\n ############# response #############")
        if x[0:10] == "customer: ":
            customerReq(x[10:])
        else:
            serverReq(x)
    except:
        connectionSocket.send(bytes("execute command failed", "UTF-8"))
        print("execute command failed")
    print('----------------------------------------------------------------------')
    connectionSocket.close()  # to close the connection
    i+=1
    