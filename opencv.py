import cv2
import base64
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import io
import logging
import tempfile
app = Flask(__name__)

@app.route('/process-image', methods=['POST'])
def process_image():
    logging.basicConfig(level=logging.DEBUG)
    logging.info('Image processing begins')
    if 'image' not in request.files:
       logging.info(request.files)
       logging.info(request.data)
       return 'No image part'

      # Extract image data from request.data
    logging.info(request.data)
    logging.info(request.files)

    # boundary_string = b'------WebKitFormBoundary'  # Adjust based on your boundary string
    # start_index = request.data.find(boundary_string, len(boundary_string)) + len(boundary_string) + 2  # Skip boundary and headers
    # end_index = request.data.rfind(boundary_string) - 2  # Find the end before the closing boundary
    # image_data = request.data[start_index:end_index]
    # logging.info(image_data)
    # image_data = request.data.split(b'\r\n\r\n')[1]  # Split based on boundary

    # Decode the image data (adjust based on encoding)
    # try:
    #     image_bytes = base64.b64decode(image_data)
    #     logging.info(image_bytes)  # Assuming base64 encoding
    # except Exception as e:
    #     print(f"Error decoding image: {e}")
    #     return 'Error processing image'

    # # Convert image bytes to a NumPy array (adjust based on format)
    # np_image = np.frombuffer(image_bytes, np.uint8)
    # img = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

    # # Process the image using OpenCV
    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # # ... (rest of your image processing logic)

    logging.debug('Reading image begin')
    logging.debug('Reading begins')
    file = request.files['image'].read()
    #uploaded_file = request.files['image']
    # Create a temporary file
    #with tempfile.NamedTemporaryFile(delete=False) as temp_file:
     #   uploaded_file.save(temp_file.name)

        # Open the image using PIL
      #  try:
       #     img = Image.open(temp_file.name)
            # ... (Your image processing logic)
        #    return jsonify({'result': 'processed'})

        #except Exception as e:
         #   print(f"Error processing image: {e}")
          #  return 'Error processing image'

    # Delete the temporary file after processing
    #os.remove(temp_file.name)

    #temp_file_path = 'temp_image.jpg'  # Adjust the filename and format as needed
    #file.save(temp_file_path)

        # Load the image using OpenCV
    #img = cv2.imread(temp_file_path)

        # Process the image using OpenCV
        # ... (Your image processing logic)

        # Remove the temporary file
    #os.remove(temp_file_path)
    #img = Image.open(io.BytesIO(file))
    #img = np.array(img)[:, :, ::-1]  # Convert to BGR format
    #img = cv2.imread("image.jpg",1 )
    #if np.shape(img) == (): # latest numpy / py3
     #   print('fail')
      #  return 'fail !!'
    #npimg = np.frombuffer(file, np.uint8)
    #if np.shape(npimg) == (): # latest numpy / py3
     #   print('fail due to npimg')
      #  return 'fail !!'
        
    print(file)
    np_array = np.frombuffer(file, np.uint8)
    print('np array: ', np_array)
    #cv2.imshow('Source Image', npimg);
    try:
        img = cv2.imdecode(np_array, cv2.IMREAD_UNCHANGED)
        print('Preprocess image begins')
        # Preprocess the image (optional)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        thresh = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)[1]

        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        print(len(contours))
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
                print('aligned')
                return jsonify({'result': 'aligned'})
            else:
                print('misaligned')
                return jsonify({'result': 'misaligned'})
        else:
            print('no-mark')
            return jsonify({'result': 'no-mark'})

    except cv2.error as e:
        print(f"Error decoding image: {e}")
        return 'Error processing image'
if __name__ == '__main__':
    app.run(debug=True)

