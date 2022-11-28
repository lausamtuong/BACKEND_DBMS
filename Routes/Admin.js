const  express =  require("express");
const router = express.Router();
const controller = require("../controllers/AdminController");

router.get("/product", controller.getProduct);
router.get("/getAllCustomers", controller.getCustomer);
router.post("/addEmployee", controller.addEmployee);
router.post("/addProduct", controller.addProduct);
router.post("/addProductChild", controller.addProductChild);

module.exports =  router;