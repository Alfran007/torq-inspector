import cv2
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import io
app = Flask(__name__)

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return 'No image part'

   

    file = request.files['image'].read()
    #img = Image.open(io.BytesIO(file))
    #img = np.array(img)[:, :, ::-1]  # Convert to BGR format
    img = cv2.imread("image.jpg",1 )
    if np.shape(img) == (): # latest numpy / py3
        print('fail')
        return 'fail !!'
    npimg = np.frombuffer(file, np.uint8)
    if np.shape(npimg) == (): # latest numpy / py3
        print('fail due to npimg')
        return 'fail !!'
    
    print(file)
    #cv2.imshow('Source Image', npimg);
    try:
        img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)

        # Preprocess the image (optional)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        thresh = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)[1]

        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # Analyze contours (adjust based on your specific requirements)
        if len(contours) == 2:
            # Calculate centroids of the two contours
            M1 = cv2.moments(contours[0])
            M2 = cv2.moments(contours[1])
            cX1 = int(M1["m10"] / M1["m00"])
            cY1 = int(M1["m01"] / M1["m00"])
            cX2 = int(M2["m10"] / M2["m00"])
            cY2 = int(M2["m01"] / M2["m00"])

            # Check alignment based on distance between centroids
            distance_threshold = 50  # Adjust threshold as needed
            if abs(cX1 - cX2) < distance_threshold and abs(cY1 - cY2) < distance_threshold:
                return jsonify({'result': 'aligned'})
            else:
                return jsonify({'result': 'misaligned'})
        else:
            return jsonify({'result': 'no-mark'})

    except cv2.error as e:
        print(f"Error decoding image: {e}")
        return 'Error processing image'
if __name__ == '__main__':
    app.run(debug=True)

