const  express =  require("express");
const router = express.Router();
const controller = require("../controllers/UserController");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/search", controller.search);
router.get("/getAllProduct", controller.getALlProduct);
router.post("/filterProduct", controller.filterProduct);
router.post("/getCart", controller.getCart);
router.post("/getProductCart", controller.getProductCart);
router.post("/getDetailProduct", controller.getDetailProduct);
router.post("/addToCart", controller.addToCart);
router.post("/deleteCartProduct", controller.deleteCartProduct);
router.post("/updateCartProduct", controller.updateCartProduct);
router.post("/insertOrder", controller.insertOrder);
router.post("/insertProductOrder", controller.insertProductOrder);
router.post("/getTotalMoneyOrder", controller.getTotalMoneyOrder);
router.post("/deleteOrderProduct", controller.deleteOrderProduct);
router.get("/getAllPromotions", controller.getAllPromotions);

module.exports =  router;