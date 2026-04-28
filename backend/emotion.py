from deepface import DeepFace
import sys
import base64
import numpy as np
import cv2

# Read base64 image from Node
data = sys.stdin.read()

if not data:
    print("neutral")
    sys.exit()

try:
    # Remove base64 header
    image_data = data.split(",")[1]
    img_bytes = base64.b64decode(image_data)

    # Convert to OpenCV image
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # 🔥 FIX HERE
    result = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)

    print(result[0]['dominant_emotion'])

except Exception as e:
    print("neutral")  # 🔥 NEVER CRASH