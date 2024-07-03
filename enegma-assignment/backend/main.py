from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import uuid
from sqlalchemy import func

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin123@localhost:5432/api_data'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class ApiRequest(db.Model):
    __tablename__ = 'api_requests'
    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    request_type = db.Column(db.String(10), nullable=False)
    request_time = db.Column(db.DateTime, default=datetime.utcnow)
    payload = db.Column(db.Text, nullable=True)
    content_type = db.Column(db.String(50))
    ip_address = db.Column(db.String(50)) 
    os = db.Column(db.String(50))
    user_agent = db.Column(db.String(255))
    response_time = db.Column(db.Float)

    @staticmethod
    def get_average_response_time():
        avg_response_time = db.session.query(func.avg(ApiRequest.response_time)).scalar()
        return avg_response_time or 0.0

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

@app.before_first_request
def create_tables():
    db.create_all()

@app.before_request
def log_request_info():
    payload = request.get_data(as_text=True) if request.method in ['POST', 'PUT', 'PATCH'] else None
    content_type = request.headers.get('Content-Type')
    user_agent = request.headers.get('User-Agent')
    os = request.user_agent.platform
    ip_address = request.remote_addr

    if payload is None and content_type is None:
        return

    api_request = ApiRequest(
        request_type=request.method,
        payload=payload,
        content_type=content_type,
        ip_address=ip_address,
        os=os,
        user_agent=user_agent
    )
    db.session.add(api_request)
    db.session.commit()

@app.route('/')
def index():
    return jsonify("Hello, World!")

@app.route('/requests', methods=['GET'])
def get_requests():
    requests = ApiRequest.query.all()
    result = [{
        'id': req.id,
        'request_id': req.request_id,
        'request_type': req.request_type,
        'request_time': req.request_time,
        'payload': req.payload,
        'content_type': req.content_type,
        'ip_address': req.ip_address,
        'os': req.os,
        'user_agent': req.user_agent,
        'response_time': req.response_time
    } for req in requests]
    return jsonify(result)


@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    result = [{'id': item.id, 'name': item.name} for item in items]
    return jsonify(result)

@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    if 'name' not in data:
        return jsonify({"error": "Name field is required"}), 400
    new_item = Item(name=data['name'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Item added", "item": {"id": new_item.id, "name": new_item.name}}), 201

@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    item = Item.query.get_or_404(item_id)
    if 'name' not in data:
        return jsonify({"error": "Name field is required"}), 400
    item.name = data['name']
    db.session.commit()
    return jsonify({"message": "Item updated", "item": {"id": item.id, "name": item.name}})

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted"})

@app.route('/items/<int:item_id>', methods=['PATCH'])
def patch_item(item_id):
    data = request.get_json()
    item = Item.query.get_or_404(item_id)
    if 'name' in data:
        item.name = data['name']
    db.session.commit()
    return jsonify({"message": "Item patched", "item": {"id": item.id, "name": item.name}})

if __name__ == "__main__":
    app.run(debug=True)
