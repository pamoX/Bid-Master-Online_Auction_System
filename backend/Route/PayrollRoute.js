const express = require("express");
const router = express.Router();
const { addPayroll, getPayroll,deletePayroll,updatePayroll,getPendingPayrollCount } = require("../Controlers/PayrollControl");

router.post("/", addPayroll);
router.get("/", getPayroll);
router.get('/pending-count', getPendingPayrollCount);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);


module.exports = router;
