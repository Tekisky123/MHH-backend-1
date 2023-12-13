
import PatientModel from "../models/patientModel.js";
import status from 'http-status'

export const getPatient = async (req, res) => {
    try {
        const result = await PatientModel.find()
        // console.log(result);

        if (!result) return res.status(404).json({
            success: false,
            message: "There Is No Users..."
        })

        return res.status(status.OK).json({
            success: true,
            result
        })
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Error While Displaying Users...",
            error: error.message
        })
    }
}


export const createPatient = async (req, res) => {
    try {
         console.log(req.body);
        const newPatient = new PatientModel(req.body)
        const patientData = await newPatient.save();
       // console.log(newPatient);
        //const patientData = await PatientModel.create(newPatient)
        res.status(status.CREATED).json({
            success: true,
            message: "Patient created successfully",
            patientData
        })

        
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Error While Creating Patient...",
            error: error.message + error.name
        })
    }
}

export const updatePatient = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);

        const patient = await PatientModel.findByIdAndUpdate(id, req.body)

        if (!patient) return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Invalid ID",
        })

        patient.save()
        return res.status(status.OK).json({
            success: true,
            message: "Patient record updated successfully",
            patient
        })

    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Error While Updating Patient...",
            error: error.message
        })
    }
}


export const deletePatient = async (req, res) => {
    const _id = req.params.id
    const patient = await PatientModel.findById(_id)

    if(!patient) {
        return res.status(status.NOT_FOUND).json({
            success: false,
            message: "Invalid ID"
        })
    }

    await PatientModel.deleteOne()
    res.json({
        success: true,
        message: "Patient deleted successfully..."
    })

}