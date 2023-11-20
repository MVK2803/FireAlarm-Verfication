import { useState } from 'react';
import React from 'react';
import axios from "axios";
const labels = [
  "Temperature", "Humidity", "TVOC", "eCO2",
  "Raw H2", "Raw Ethanol", "Pressure",
  "PM1.0", "PM2.5", "NC0.5", "NC1.0", "NC2.5",
  "CNT"
];

function App() {
  const [inputData, setInputData] = useState({});
  const [triggerAlarm, setTriggerAlarm] = useState(false);
  const [analysisRes,setanalysisRes]=useState(2);
  const handleInputChange = (label, value) => {
    setInputData((prevData) => ({ ...prevData, [label]: value }));
  };

  const handleToggleSwitch = () => {
    setTriggerAlarm((prevValue) => !prevValue);
    
  };

  const handleAnalyzeClick = async(event) => {
    event.preventDefault();
    const jsonData = {
      input_data: inputData,
      trigger_alarm: triggerAlarm,
    };

    
    //console.log('Sending data to the backend:', jsonData);
    try {
      //console.log(jsonData);
      const result = await axios.post('https://varghesebackend2.onrender.com/verify', jsonData);
      setanalysisRes(parseInt(result.data));
      console.log(result.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-indigo-200 absolute flex h-full w-full justify-center'>
      <div className='w-11/12 h-3/4 flex flex-row justify-between rounded-lg self-center'>
      <div className='bg-neutral-200 rounded-lg shadow-lg w-[60%] h-full p-[20px]'>
            <div className='bg-gray-700 rounded-lg h-full flex shadow-lg'>

              <div className=' rounded-b-lg w-full rounded-lg h-[85%] mx-auto flex flex-col'>
                  <div className='bg-black text-2xl  font-medium p-2 justify-between w-full text-white flex flex-row'>
                    <div>
                      <h>Siemens</h>
                    </div>
                    <div>
                      <h>Simatic HMI</h>
                    </div>

                  </div>
                  <div className=' w-[90%] mx-auto h-[80%] flex flex-col space-y-4'>
                    <div className=' flex flex-row justify-between w-[80%] mx-auto text-2xl font-bold text-white'>
                    <div className={`mt-10 p-[50px] ${analysisRes===0? 'bg-red-500':'bg-red-100'} rounded-md `}>
                        <h>Fasle Alarm</h>
                      </div>
                      
                      <div className={`mt-10 p-[50px] ${analysisRes===1? 'bg-lime-500':'bg-lime-100'} rounded-md `}>
                        <h>True Alarm</h>
                      </div>

                    </div>
                    <div className='text-center w-[80%] mx-auto bg-gray-400 rounded-md h-full flex items-center'>
                      <div className='text-3xl font-bold w-full text-center'>
                        {analysisRes===2?<h></h>:
                        (analysisRes===1 ?<h>Initiate Fire protocol!!</h>:<h>No action Required!!</h>)}
                          
                          
                      </div>

                    </div>

                  </div>
              </div>

            </div>


          </div>
        <div className='border-[3px] w-[35%] rounded-md h-full'>
          <div className="flex flex-wrap mt-2 w-full p-2">
            {labels.map((label, index) => (
              <div key={index} className="relative w-1/2 mb-4">
                <label className="bg-indigo-200 px-3 ml-1 absolute -top-4">
                  {label}
                </label>
                <input
                  className="border-[2px] rounded-md outline-none bg-transparent p-2"
                  type="text"
                  placeholder={`Enter ${label}`}
                  onChange={(e) => handleInputChange(label, e.target.value)}
                />
              </div>
            ))}
            <div className='w-1/2 flex items-center'>
              <input
                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchChecked"
                defaultChecked={triggerAlarm}
                onChange={handleToggleSwitch}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer text-xl font-medium"
                htmlFor="flexSwitchChecked"
              >Trigger Alarm</label>
            </div>
          </div>
          <div className='flex'>
            <button
              className='mx-auto p-2 text-2xl  font-bold rounded-md bg-indigo-400 hover:bg-green-700 hover:text-white hover:border-0'
              onClick={handleAnalyzeClick}
            >
              Analyze Alarm ⇨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
