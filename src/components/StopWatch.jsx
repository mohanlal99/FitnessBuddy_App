import React, { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";
const initialTimer = ["00", "00", "00"]
const StopWatch = () => {
  let [timer, setTimer] = useState(initialTimer);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(null)
  const inputRef = useRef(null)

  function startTimer() {
    if(timer[2]== '00' && timer[1] =='00' && timer[0] == '00'){
    inputRef.current.focus()
    }else{
    setIsRunning(true)
    if(timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(()=>{      
      setTimer((prev) => {
        const [h,m,s] = updateTimer(prev[0],prev[1],prev[2])
        console.log(h,m,s)
        return [String(h),String(m),String(s)];
        // return [updateHour(prev[0]), updateMin(prev[1]), updateSec(prev[2])];
      });

    },1000)
  }
  }


  function updateTimer(hour,min,sec){
    hour = Number(hour)
    min = Number(min)
    sec = Number(sec)
    if((hour * 3600 + min * 60 + sec)<=0){
      clearInterval(timerRef.current)
      setIsRunning(false)
      audioRef.current.pause()
      return initialTimer
    }
    audioRef.current.play()


    if(hour==0 && min==0 && sec>0){
      return ['00','00',sec<9?`0${sec-1}`:sec-1]
    }else if(hour==0 && min>0){
      if(sec==0){
        return ['00',min<9?`0${min-1}`:min-1 , 59]
      }      
      return ['00', min<9?`0${min}`:min ,sec<9?`0${sec-1}`:sec-1]
    }else{
      if(min==0 && sec==0){
        return [hour<=9?`0${hour-1}`:hour - 1 ,59 ,59]
      }else if(sec==0){
        return [hour<=9?`0${hour}`:hour,min<9?`0${min-1}`:min-1 , 59]
      }  
      return [hour<=9?`0${hour}`:hour, min<9?`0${min}`:min ,sec<9?`0${sec-1}`:sec-1]
    }
    // return initialTimer
  }

  function resetTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(initialTimer)
    audioRef.current.pause()
    setIsRunning(false)
  }

  function handleChange(e){
    const {name,value} = e.target
    if(isNaN(value)) return
    // console.log(e.target)
    if(name=="hour"){
      if(value>24){
        setTimer([24,"00","00"])
        return
      }
      setTimer([value,timer[1],timer[2]])
    }else if(name=='min'){
      if(value>60){
        setTimer([timer[0],60,timer[2]])
        return
      }
      setTimer([timer[0],value,timer[2]])
    }else{
      if(value>60){
        setTimer([timer[0],timer[1],60])
        return
      }
      setTimer([timer[0],timer[1],value])
    }
  }

  function stopTimer(){
    clearInterval(timerRef.current)
    audioRef.current.pause()
  }

  return (
   <div className="w-full max-w-md mx-auto p-4 bg-white space-y-6">
  <audio ref={audioRef} src="/tick.mp3"></audio>

  {/* Timer Inputs */}
  <div className="flex justify-center gap-3 text-5xl font-mono">
    <input
      type="text"
      name="hour"
      value={timer[0]}
      onChange={handleChange}
      disabled={isRunning}
      maxLength={2}
      placeholder="00"
      className="w-20 text-center bg-blue-900 text-lime-400 px-3 py-2 rounded-md shadow focus:outline-none"
    />
    <span className="text-gray-700">:</span>
    <input
      type="text"
      name="min"
      value={timer[1]}
      onChange={handleChange}
      disabled={isRunning}
      maxLength={2}
      placeholder="00"
      className="w-20 text-center bg-blue-900 text-lime-400 px-3 py-2 rounded-md shadow focus:outline-none"
    />
    <span className="text-gray-700">:</span>
    <input
    ref={inputRef}
      type="text"
      name="sec"
      value={timer[2]}
      onChange={handleChange}
      disabled={isRunning}
      maxLength={2}
      placeholder="00"
      className="w-20 text-center focus:bg-amber-900 bg-blue-900 text-lime-400 px-3 py-2 rounded-md shadow focus:outline-none"
    />
  </div>

  {/* Timer Buttons */}
  <div className="flex gap-3">
    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={startTimer}>
      Start
    </Button>
    <Button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white" onClick={resetTimer}>
      Reset
    </Button>
    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={stopTimer}>
      Stop
    </Button>
  </div>
</div>

  );
};

export default StopWatch;
