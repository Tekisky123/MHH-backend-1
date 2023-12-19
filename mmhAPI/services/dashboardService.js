import PatientModel from "../models/patientModel.js"


export const getTotalAmountService = async () => {
    try {
      const result = await PatientModel.aggregate([
        {
          $group: {
            _id: null,
            amountSaved: { $sum: { $toInt: '$amountSaved' } }, // Convert to integer if 'amountSaved' is a string
          },
        },
      ]);
  
      if (result.length > 0) {
        const totalAmount = result[0].amountSaved;
        console.log('Total Amount:', totalAmount);
        return totalAmount;
      } else {
        console.log('No records found.');
        return 0;
      }
    } catch (error) {
      console.error('Error fetching total amount:', error);
      throw error;
    }
  };
  


export const getThisMonthTotalAmountService = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript

    const result = await PatientModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$registeredDate' }, currentMonth],
          },
        },
      },
      {
        $group: {
          _id: null,
          amountSaved: { $sum: { $toInt: '$amountSaved' } },
        },
      },
    ]);

    if (result.length > 0) {
      const monthAmount = result[0].amountSaved;
      console.log('Total Amount for the current month:', monthAmount);
      return monthAmount;
    } else {
      console.log('No records found for the current month.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total amount for the current month:', error);
    throw error;
  }
};




export const totalNumberOfCaseCloseService = async () => {
  try {
    const closedStatusValues = [
      'Patient Rejected',
      'Closed-Civil',
      'Closed-Ayushman Bharat',
      'Closed-Private',
      'Closed-MJPJA',
      'Application Closed',
      'Closed-Other'
    ];

    const result = await PatientModel.aggregate([
      {
        $match: {
          status: { $in: closedStatusValues },
        },
      },
      {
        $group: {
          _id: null,
          totalClosedCases: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      const totalClosedCases = result[0].totalClosedCases;
      console.log('Total number of closed cases:', totalClosedCases);
      return totalClosedCases;
    } else {
      console.log('No closed cases found.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total number of closed cases:', error);
    throw error;
  }
};


export const totalNumberOfCaseCloseInMonthService = async () => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript
    
        const closedStatusValues = [
          'Patient Rejected',
          'Closed-Civil',
          'Closed-Ayushman Bharat',
          'Closed-Private',
          'Closed-MJPJA',
          'Application Closed',
          'Closed-Other'
        ];
    
        const result = await PatientModel.aggregate([
          {
            $match: {
              status: { $in: closedStatusValues },
              $expr: {
                $eq: [{ $month: '$registeredDate' }, currentMonth],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalClosedCases: { $sum: 1 },
            },
          },
        ]);
    
        if (result.length > 0) {
          const totalClosedCases = result[0].totalClosedCases;
          console.log('Total number of closed cases for the current month:', totalClosedCases);
          return totalClosedCases;
        } else {
          console.log('No closed cases found for the current month.');
          return 0;
        }
      } catch (error) {
        console.error('Error fetching total number of closed cases for the current month:', error);
        throw error;
      }
};



export const totalNumberOfApproachService =async ()=>{
    
  try {
    const totalNumberOfApproach = await PatientModel.find()
    return totalNumberOfApproach.length
  } catch (error) {
     console.log("error while getting approch ");
  }

}

export const totalNumberOfMonthApproachService = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript

    const totalNumberOfMonthApproach = await PatientModel.find({
      $expr: {
        $eq: [{ $month: '$registeredDate' }, currentMonth],
      },
    });

    return totalNumberOfMonthApproach.length;
  } catch (error) {
    console.error('Error while getting the total number of approaches for the month:', error);
    throw error;
  }
};



export const findPendingCasesMoreThan5DaysService = async () => {
  try {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const pendingCases = await PatientModel.find({
      status: { $not: { $in: ['Closed', 'Rejected'] } }, // Assuming 'Closed' and 'Rejected' are your closed status values
      registeredDate: { $lte: fiveDaysAgo },
    });

    console.log('Pending cases open for more than 5 days:', pendingCases);
    return pendingCases.length;
  } catch (error) {
    console.error('Error fetching pending cases:', error);
    throw error;
  }
};
