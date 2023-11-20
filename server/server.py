from flask import Flask, request, jsonify
from flask_cors import CORS
import fire_fun
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def home():
    print("REC")
    try:
        # Extract data from the request
        input_data = request.json['input_data']
        testInput=[]
        trigger_alarm = request.json['trigger_alarm']
        for i in input_data:
            testInput.append(float(input_data[i]))
        print(testInput)
        # Perform prediction
        result = fire_fun.predictFalseAlarm(*testInput)
        print(result)
        return jsonify(result)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred"}), 500
    
@app.route('/hello', methods=['GET'])
def test():
    return jsonify({"hello": "yay"}), 500

if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

