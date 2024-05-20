// static/script.js
document.getElementById('submitBtn').addEventListener('click', function(e) {
    e.preventDefault();

    // Lấy giá trị từ các input
    const data = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        Total_Bilirubin: document.getElementById('Total_Bilirubin').value,
        Direct_Bilirubin: document.getElementById('Direct_Bilirubin').value,
        Alkaline_Phosphotase: document.getElementById('Alkaline_Phosphotase').value,
        Alamine_Aminotransferase: document.getElementById('Alamine_Aminotransferase').value,
        Aspartate_Aminotransferase: document.getElementById('Aspartate_Aminotransferase').value,
        Total_Protiens: document.getElementById('Total_Protiens').value,
        Albumin: document.getElementById('Albumin').value,
        Albumin_and_Globulin_Ratio: document.getElementById('Albumin_and_Globulin_Ratio').value
    };

    // Gửi yêu cầu POST tới API
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Hiển thị kết quả
        document.getElementById('result').innerText = `Kết quả dự đoán: ${result.prediction === 1 ? 'Mắc bệnh' : 'Không mắc bệnh'}`;
        
        // Làm mới các input sau khi gửi thành công
        document.getElementById('predictionForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
