const  express =  require("express");
const router = express.Router();
const controller = require("../Controllers/AdminController");

router.get("/product", controller.getProduct);
router.get("/getAllCustomers", controller.getCustomer);
router.get("/sumary", controller.sumary);
router.get("/sumaryOrder", controller.sumaryOrder);
router.get("/sumaryMoney", controller.sumaryMoney);
router.get("/sumaryProduct", controller.sumaryProduct);
router.get("/getTrans", controller.getTrans);
router.post("/deleteUsers", controller.deleteUsers);
router.post("/deleteCustomer", controller.deleteCustomer);
router.post("/addEmployee", controller.addEmployee);
router.post("/addProduct", controller.addProduct);
router.post("/updateProduct", controller.updateProduct);
router.post("/updateCustomer", controller.updateCustomer);
router.post("/addProductChild", controller.addProductChild);

module.exports =  router;