var express = require("express");
var app = express();

const config = require('./config/config.json');
const defaultConfig = config.development;
global.gConfig = defaultConfig;

const PORT = process.env.PORT || global.gConfig.exposedPort;

function calculateCategory(diastolic, systolic) {
  if (diastolic < 60 && systolic < 90) {
   return "Low";
  }
  if ((diastolic >= 60 && diastolic < 80) && systolic < 90) {
   return "Normal";
  }
  if (diastolic < 80 && (systolic >= 90 && systolic < 120)) {
   return "Normal";
  }
  if ((diastolic >= 80 && diastolic < 90) && systolic < 120) {
   return "PreHigh";
  }
  if (diastolic < 90 && (systolic >= 120 && systolic < 140)) {
   return "PreHigh";
  }
  if ((diastolic >= 90 && diastolic < 100) && systolic < 140) {
   return "High";
  }
  return "Unknown";
}

function checkSystolic(systolic){
    if (systolic < config.ranges.SYSTOLIC_MIN){
        throw new Error("Invalid Systolic Value - too low")
    }
    if (systolic > config.ranges.SYSTOLIC_MAX){
        throw new Error("Invalid Systolic Value - too high")
    }
    return systolic;
}

function checkDiastolic(diastolic){
    if (diastolic < config.ranges.DIASTOLIC_MIN){
        throw new Error("Invalid Diastolic Value - too low")
    }
    if (diastolic > config.ranges.DIASTOLIC_MAX){
        throw new Error("Invalid Diastolic Value - too high")
    }
    return diastolic;
}

app.listen(PORT, () => {
 console.log("Server running on port "+ PORT);
});

app.get('/getCategory', (req, res) => {
    const systolic = req.query.systolic;
    const diastolic = req.query.diastolic;

    let categoryResp = {
     "systolic": systolic ,
     "diastolic": diastolic,
     "category": "",
     "error": ""
    }
     try{
        categoryResp.category = calculateCategory(checkDiastolic(diastolic), checkSystolic(systolic));
     }catch (error){
       res.status(400);
       categoryResp.category = "";
       categoryResp.error = error.toString();
    }
    res.json(categoryResp);
});
