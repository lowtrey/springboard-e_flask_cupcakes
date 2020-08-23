from flask import Flask, render_template, redirect, flash, request, jsonify
from models import db, connect_db, Cupcake

app = Flask(__name__)

# Configure and Initialize Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route("/api/cupcakes")
def list_cupcakes():
  all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
  return jsonify(cupcakes=all_cupcakes)

@app.route("/api/cupcakes/<int:id>")
def get_cupcake(id):
  cupcake = Cupcake.query.get_or_404(id)
  return jsonify(cupcake=cupcake.serialize())

@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
  new_cupcake = Cupcake(
    flavor=request.json["flavor"], 
    size=request.json["size"], 
    rating=request.json["rating"], 
    image=request.json.get("image", None))
  db.session.add(new_cupcake)
  db.session.commit()
  response_json = jsonify(cupcake=new_cupcake.serialize())
  return (response_json, 201)

@app.route("/api/cupcakes/<int:id>", methods=["PATCH"])
def update_cupcake(id):
  cupcake = Cupcake.query.get_or_404(id)
  cupcake.flavor = request.json["flavor"]
  cupcake.size = request.json["size"]
  cupcake.rating = request.json["rating"]
  cupcake.image = request.json["image"]
  db.session.add(cupcake)
  db.session.commit()
  return jsonify(cupcake.serialize())

@app.route("/api/cupcakes/<int:id>", methods=["DELETE"])
def delete_cupcake(id):
  cupcake = Cupcake.query.get_or_404(id)
  db.session.delete(cupcake)
  db.session.commit()
  return jsonify(message="Deleted")