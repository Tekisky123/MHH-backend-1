import mongoose from 'mongoose';

// Define the Patient Details schema
const patientDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhar: { type: String, required: true },
  mobile: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  pin: { type: String, required: true },
  talukha: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  maritalstatus: { type: String, required: true },
});

// Define the Family Detail schema
const familyDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
});

// Define the CareTaker schema
const careTakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile1: { type: String, required: true },
  mobile2: { type: String, required: true },
  particulars: { type: String, required: true },
});

// Define the Disease Detail schema
const diseaseDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diagnoseDate: { type: Date, required: true },
  diagnoseBy: { type: String, required: true },
  investigationDone1: { type: String, required: true },
  investigationDone2: { type: String, required: true },
  investigationDone3: { type: String, required: true },
  currentHospitalName: { type: String, required: true },
  currentHospitalAddress: { type: String, required: true },
  currentHospitalContactNo: { type: String, required: true },
  currentTreatmentDetail: { type: String, required: true },
  doctorAdviceForFurtherProcess: { type: String, required: true },
});

// Define the Main schema
const patientSchema = new mongoose.Schema({
 
  patientDetails: { type: patientDetailsSchema, required: true },
  familyDetail: { type: [familyDetailSchema], required: true },
  careTaker: { type: careTakerSchema, required: true },
  disease: { type: String, required: true },
  // Assuming disease is a string, you can adjust the type as needed
  diseaseDetail: { type: diseaseDetailSchema, required: true },
}, {timestamps : true});

patientSchema.pre('save', function (next) {
  // Check if the _id is not already set
  if (!this._id) {
    // Set custom _id like "mmh01"
    this._id = 'mmh' + Math.floor(1 + Math.random() * 2);
  }
  next();
});


// Create the Patient model
const PatientModel = mongoose.model('Patient', patientSchema);

export default PatientModel;
