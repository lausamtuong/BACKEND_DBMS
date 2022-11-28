const  express =  require("express");
const router = express.Router();
const controller = require("../controllers/dboperations");


router.get("/get", controller.getOrders);
router.post("/getCarts", controller.getCarts);
router.get("/insert", controller.insert);


module.exports =  router;