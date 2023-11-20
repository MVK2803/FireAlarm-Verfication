import sklearn
import pickle
import pandas as pd
import numpy as np

def predictFalseAlarm(Temperature,Humidity,TVOC,eCO2,RawH2,RawEthanol,Pressure,PM1,PM2_5,NC0_5,NC1,NC2_5,CNT):

    fire_alarm_names = ["NO FIRE","FIRE!!"]

    #LOADING SAVED MODEL
    pickle_in = open("firemodel.pickle", "rb")
    model = pickle.load(pickle_in)

    input_list = [[Temperature,Humidity,TVOC,eCO2,RawH2,RawEthanol,Pressure,PM1,PM2_5,NC0_5,NC1,NC2_5,CNT]]

    #PREDICTING
    prediction = model.predict(input_list)
    return(str(prediction[0]))

