import {getTotalAmountService , getThisMonthTotalAmountService,totalNumberOfCaseCloseService, totalNumberOfCaseCloseInMonthService,totalNumberOfApproachService, totalNumberOfMonthApproachService , findPendingCasesMoreThan5DaysService} from '../services/dashboardService.js'

export const dashboardController = async(req,res)=>{

    try {
        const  totalAmountSaved = await getTotalAmountService()
        // console.log(" Total  Amount saved ===>" ,totalAmountSaved);
     
        const monthAmountSaved = await getThisMonthTotalAmountService()
        // console.log( " Total month Amount Saved ===>" ,monthAmountSaved);
     
     
        const totalClosedCases = await totalNumberOfCaseCloseService()
        // console.log(totalClosedCases);


        const totalClosedCasesInMonth = await totalNumberOfCaseCloseInMonthService()
        // console.log("totalClosedCasesInMonth ===>" , totalClosedCasesInMonth);
     
     
        const totalNumberOfApproach = await totalNumberOfApproachService()
        // console.log("approach ===>",totalNumberOfApproach);
     
     
        const totalNumberOfMonthApproach = await totalNumberOfMonthApproachService()
        // console.log("month ===>",totalNumberOfMonthApproach);


        const PendingCasesMoreThan5Days = await findPendingCasesMoreThan5DaysService()
        // console.log("findPendingCasesMoreThan5DaysService==>" , findPendingCasesMoreThan5Days);

        res.status(200).json({
            success  : true,
            totalAmountSaved : totalAmountSaved,
            monthAmountSaved : monthAmountSaved,
            totalClosedCases : totalClosedCases,
            totalClosedCasesInMonth : totalClosedCasesInMonth,
            totalNumberOfApproach : totalNumberOfApproach,
            totalNumberOfMonthApproach : totalNumberOfMonthApproach,
            PendingCasesMoreThan5Days : PendingCasesMoreThan5Days

        })


        
    } catch (error) {
        res.status(400).json({
            success  : false,
            message : "Error While Getting the result",
            error:error.message
        })
    }


    res.status()

}
