import numpy as np
from flask import Flask, request, Response, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.models import model_from_json
import json
import cv2
from flask_cors import CORS, cross_origin
import urllib

app = Flask(__name__)

CORS(app, support_credentials=True)

resnet_model = './models/ResNet50_Model.hdf5'
resnet_json = './models/ResNet50.json'

IMAGE_SIZE = 64

def resize_image(image, image_size):
    return cv2.resize(image.copy(), image_size, interpolation=cv2.INTER_AREA)



@app.route('/predict',methods=["POST"])
@cross_origin()
def predict():
    # print(request.json)
    # convert string of image data to uint8
    # print(request.json['img'])
    # nparr = np.fromstring(request.json['img'], dtype="uint8")
    # print(nparr)
    # print(len(nparr))


    url = request.json['img']
    # url = "https://storage.googleapis.com/kagglesdsdata/datasets/615374/1199870/non-COVID/Non-Covid%20%28100%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20211016%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20211016T063539Z&X-Goog-Expires=345599&X-Goog-SignedHeaders=host&X-Goog-Signature=b3ee0b4b01b555545c0066b4d511cd6736cda10b6edec0f1c3fd34009d89e43e158be0bb4c37534de022509cb73640932cc8706fe4801b29ca28c8a76856898eed0c676f1402446136481deefa69cfd7ff462dac65e151e4571ce28e53abfd596c86e829f94388e10141bad4eab1f86e555876bf9aafab200b2b83132d6c240c9b71389ec767116cc85230cf49f9238f9ebb08e8c7acee459da00d20049fd73c84c94a7ebafa4fd916c126c7bf0c3dad3f202dfef211fc129245d14a9e88a9c4f61dacda53f528169c4df8f00a2a57de90919fd9d39448aed85136b8bb556f9115973f6ca12bc454552c6e742d73aca6ebdc1137e8ee4bb2cc74c143d8dd87df"
    # print(url)
    resp = urllib.request.urlopen(url)
    img = np.asarray(bytearray(resp.read()), dtype="uint8")
    # print(img.shape)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    # cv2.imwrite("sample.jpg", img)
    # decode image
    #img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # print(img)
    pred_arr = np.zeros((1, IMAGE_SIZE, IMAGE_SIZE, 3))
    # print(pred_arr)
    if img is not None:
            pred_arr[0] = resize_image(img, (IMAGE_SIZE, IMAGE_SIZE))
            
    pred_arr = pred_arr/255
    # print(pred_arr)    
    with open(resnet_json, 'r') as resnetjson:
            resnetmodel = model_from_json(resnetjson.read())
    resnetmodel.load_weights(resnet_model)
    
    label_resnet = resnetmodel.predict(pred_arr)
    # print(label_resnet)
    idx_resnet = np.argmax(label_resnet[0])
    cf_score_resnet = np.amax(label_resnet[0])
    
    js_response= [
        {
            "idx_resnet":idx_resnet,
            "cf_score_resnet":cf_score_resnet
        }
    ]
    # print(js_response)
    return json.dumps(str(js_response))    

@app.route("/health_check", methods=["GET"])
@cross_origin()
def health_check():
    return "API Up And Running"

# Default port:
if __name__ == "__main__":
    app.run()