from flask import Flask, jsonify, request, render_template
from datetime import datetime
from flask_cors import CORS
from json import dump, load
from os import path


app = Flask(__name__)
CORS(app)


def save_data(data):
    try:
        with open('./memory.json', 'w') as f:
            dump(data, f, indent=4)
        return True
    except Exception as e:
        print(f"An error occurred: {e}")

def load_data():
    with open('./memory.json', 'r') as f:
        data = load(f)
    return data


@app.route('/savememories', methods=['POST'], strict_slashes=False)
def savememories():
    """Save memories function"""
    data_memory = []
    data = request.get_json()

    if data is None:
        return jsonify({'Error': 'Data is empty.'})

    if path.exists('./memory.json') is False:
        data_memory.append({
            "id": 1,
            "time": datetime.now().strftime("%A %B %H:%M:%S.%f %p %d-%m-%Y"),
            "memory": data['memory']
        })
        save_data(data_memory)
        return jsonify({'message': 'Data saved successfully for first time'}), 200

    data_memory = load_data()

    i = len(data_memory) + 1
    data_memory.append({
        "id": i,
        "time": datetime.now().strftime("%A %B %H:%M:%S.%f %p %d-%m-%Y"),
        "memory": data['memory']
    })

    save_data(data_memory)

    return jsonify({'message': 'Data saved successfully', 'data': data_memory[i-1]}), 200


@app.route('/loadmemories', methods=['GET'], strict_slashes=False)
def loadmemories():
    """Load memories function"""
    try:
        data = load_data()
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({'memoryTextValue': ' can\'t get the data'})


@app.route('/deletememory/<int:id>', methods=['DELETE'], strict_slashes=False)
def deletememory(id):
    """Delete memories function"""
    try:
        data = load_data()
        new_data = [memory for memory in data if memory['id'] != id]

        if len(new_data) == len(data):
            return jsonify({'message': 'Memory not found', 'success': False}), 404

        save_data(new_data)
        return jsonify({'message': 'Memory deleted successfully', 'success': True}), 200
    except FileNotFoundError:
        return jsonify({'message': 'Memory file not found', 'success': False}), 404
    except Exception as e:
        return jsonify({'message': f'An error occurred: {e}', 'success': False}), 500


@app.route('/', strict_slashes=False)
def app_main():
    """Main function"""
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)