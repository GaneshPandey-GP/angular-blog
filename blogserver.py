from flask import Flask, request, json, Response, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
class MongoAPI:
    def __init__(self, data):
        self.client = MongoClient("mongodb://blog:impossible@52.237.72.43:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false")
        database = data['database']
        collection = data['collection']
        cursor = self.client.get_database(database)
        self.collection = cursor[collection]
        self.data = data
    def write(self, data):
        new_document = data['document']
        response = self.collection.insert_one(new_document)
        output = {'Status': '1',
                  'Document_ID': str(response.inserted_id)}
        return output
    def read(self):
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def readWithFilter(self):
        filt = self.data['Filter']
        documents = self.collection.find(filt)
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def login(self):
        documents = self.collection.find({"email": self.data['email'],"pwd":self.data['password'],"isActive":1})
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def update(self):
        filt = self.data['Filter']
        updated_data = {"$set": self.data['DataToBeUpdated']}
        response = self.collection.update_one(filt, updated_data)
        output = {'Status': '1' if response.modified_count > 0 else "Nothing was updated."}
        return output
    def getSequences(self):
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
app = Flask(__name__)
cors = CORS(app)
@app.route('/',methods=['GET'])
def index():
    return("API Server Running")
@app.route('/create', methods=['POST'])
def create():
    data = request.json
    data2=json.loads('{"database":"Blog","collection":"sequences"}')
    obj2 = MongoAPI(data2)
    sequenceType=data['sequenceType']
    idType=data['idType']
    print(obj2.getSequences()[0].get(sequenceType))
    cid=(obj2.getSequences()[0].get(sequenceType))
    print(cid)
    data['document'][idType]=cid
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    cid2=cid+1
    data3=json.loads('{"database":"Blog","collection":"sequences","Filter":{"'+sequenceType+'":'+str(cid)+'},"DataToBeUpdated":{"'+sequenceType+'":'+str(cid2)+'}}')
    obj3 = MongoAPI(data3)
    obj3.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/login', methods=['POST'])
def login_class():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.login()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/fetch', methods=['POST'])
def fetch():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.readWithFilter()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/update', methods=['POST'])
def update():
    data = request.json
    if data is None or data == {} or 'DataToBeUpdated' not in data:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
if __name__ == '__main__':
    data={}
    app.run(use_reloader=False, debug=True, port=5001, host='127.0.0.1')
    #from gevent.pywsgi import WSGIServer
    #app.debug = True
    #http_server = WSGIServer(('', 5001), app)
    #http_server.serve_forever()
