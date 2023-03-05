from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://db:27017/todolist"
mongo = PyMongo(app)

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = mongo.db.tasks.find()
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def create_task():
    task = {
        "title": request.json["title"],
        "description": request.json["description"],
        "done": False
    }
    mongo.db.tasks.insert_one(task)
    return jsonify(task)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
