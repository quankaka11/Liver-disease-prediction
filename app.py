from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load mô hình đã lưu
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = np.array([[
        data['age'],
        data['gender'],
        data['Total_Bilirubin'],
        data['Direct_Bilirubin'],
        data['Alkaline_Phosphotase'],
        data['Alamine_Aminotransferase'],
        data['Aspartate_Aminotransferase'],
        data['Total_Protiens'],
        data['Albumin'],
        data['Albumin_and_Globulin_Ratio']
    ]])

    # Chuẩn hóa dữ liệu
    features = scaler.transform(features)

    # Dự đoán
    prediction = model.predict(features)

    # Trả về kết quả dự đoán
    result = {'prediction': int(prediction[0])}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
