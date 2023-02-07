var config = require("../dbconfig");
var mysql = require("mysql");
const sql = require("mssql");
const { v4: uuidv4 } = require("uuid");

async function register(req, res) {
  try {
    const id = uuidv4().slice(0, 4);
    const today = new Date();
    var dd = today.getDate();
    var mm = String(today.getMonth());
    var yy = String(today.getFullYear());
    let con = mysql.createConnection(config);
    con.connect(function (err) {
      if (err) throw err;
      
        con.query(
          `INSERT INTO CUSTOMER(customer_id,register_date) VALUES ('CUS${id}','${yy}-${mm}-${dd}')`,
          function (err, result, fields) {
            if (err) throw err;
          }
        );
        con.query(
          `INSERT INTO ACCOUNT (account_id,username,_password,type_account,customer_id) VALUES('${req.body.id_user}', '${req.body.username}',	'${req.body.password}', N'${req.body.type}', 'CUS${id}')`,
          function (err, result, fields) {
            if (err) throw err;
          }
        )
    });
    res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    res.status(200).json("AccountExist");
  }
}
async function login(req, res) {
  const { email, password } = req.body.data;
  try {
   let con  = mysql.createConnection(config)
      con.query(
        `SELECT * from ACCOUNT WHERE username = '${email}' AND _password = '${password}' `,
        function (err, result, fields) {
          if (err) throw err;
          res.status(200).json(result|| "false");
        }
      )
    
  } catch (error) {
    console.log(error);
  }
}
async function search(req, res) {
  try {
    let pool = await sql.connect(config);

    let products = await pool
      .request()
      .query(
        `SELECT * FROM PRODUCT WHERE product_name LIKE N'%${req.body.data}%'`
      );
    res.status(200).json(products.recordsets);
  } catch (error) {
    console.log(error);
  }
}
async function insertOrder(req, res) {
  try {
    const today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1);
    var yy = String(today.getFullYear());
    var hour = today.getHours();
    var minutes = today.getMinutes();
    let pool = await sql.connect(config);
    const order_id = uuidv4().slice(0, 4);
    await pool
      .request()
      .query(
        `EXEC insert_ORDER 'ORD${order_id}', N'Đơn hàng${order_id}', '${yy}${mm}${dd}', '${hour}:${minutes}', '${req.body.customer_id}', 'EMP0009'`
      );
    console.log(`ORD${order_id}`);
    res.status(200).json({ order_id: `ORD${order_id}` });
  } catch (error) {
    console.log(error);
  }
}
async function insertProductOrder(req, res) {
  try {
    const order_id = req.body.order_id.order_id;
    let pool = await sql.connect(config);
    const cart = req.body.cart;
    let current = 0;
    let timerId = setInterval(function () {
      if (current == cart.length - 1) {
        clearInterval(timerId);
      }
      pool
        .request()
        .query(
          `EXEC insertPRODUCT_OF_ORDER '${order_id}', '${cart[current]?.product_id}',  '${cart[current]?.amount}'`
        );
      current++;
    }, 1000);
    res.status(200).json("insertProductOrder Success!");
  } catch (error) {
    console.log(error);
  }
}
async function deleteOrderProduct(req, res) {
  try {
    const order_id = req.body.order_id.order_id;
    let pool = await sql.connect(config);
    const cart = req.body.cart;
    let current = 0;
    let timerId = setInterval(function () {
      if (current == cart.length - 1) {
        clearInterval(timerId);
      }
      pool
        .request()
        .query(
          `DELETE FROM PRODUCT_OF_ORDER WHERE [order_id] = '${order_id}' and product_id ='${cart[current]?.product_id}'`
        );
      current++;
    }, 1000);
    res.status(200).json("deleteProductOrder Success!");
  } catch (error) {
    console.log(error);
  }
}
async function getALlProduct(req, res) {
  try {
    let con = mysql.createConnection(config);
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM PRODUCT", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
async function getTotalMoneyOrder(req, res) {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .query(
        `SELECT [total_money] FROM _ORDER WHERE [order_id]='${req.body?.order_id?.order_id}'`
      );
    console.log(products.recordsets[0]);
    res.status(200).json(products.recordsets[0][0]?.total_money);
  } catch (error) {
    console.log(error);
  }
}
async function filterProduct(req, res) {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .query(`SELECT * FROM PRODUCT WHERE category_id = '${req.body.data}'`);
    res.status(200).json(products.recordsets);
  } catch (error) {
    console.log(error);
  }
}
async function getCart(req, res) {
  try {
    let pool = await sql.connect(config);
    let listCart = await pool
      .request()
      .query(`SELECT * FROM CART WHERE [customer_id]='${req.body.data}' `);
    res.status(200).json(listCart.recordsets);
  } catch (error) {
    console.log(error);
  }
}
async function addToCart(req, res) {
  try {
    let pool = await sql.connect(config);
    const cart_id = uuidv4().slice(0, 5);
    const x = await pool
      .request()
      .query(
        `SELECT * FROM CART WHERE [customer_id]='${req.body.customer_id}'`
      );
    if (!x.recordset[0]) {
      pool
        .request()
        .query(`EXEC insertCART 'CRT${cart_id}','${req.body.customer_id}'`);
    } else {
      const CRT_id = await pool
        .request()
        .query(
          `SELECT [cart_id] from CART where [customer_id] = '${req.body.customer_id}' `
        );

      pool
        .request()
        .query(
          `EXEC insertCART_PRODUCT '${req.body.item.product_id}',  '${CRT_id.recordset[0].cart_id}', 1`
        );
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
async function updateCartProduct(req, res) {
  try {
    console.log(req.body);
    let pool = await sql.connect(config);
    await pool.request().query(`     
                UPDATE CART_PRODUCT
                SET amount =${req.body.amount}
                WHERE product_id = '${req.body.product_id}' AND cart_id='${req.body.cart_id}'`);
    res.status(200).json("updateCartProduct Success!");
  } catch (error) {
    res.status(400).json(error);
  }
}
async function getProductCart(req, res) {
  try {
    let arr = [];
    let pool = await sql.connect(config);
    const product_id = await pool
      .request()
      .query(
        `SELECT [product_id],[amount],[cart_id] FROM CART_PRODUCT WHERE [cart_id]='${req.body.data}' `
      );

    product_id.recordset.forEach(async (i, k) => {
      let listCart = await pool
        .request()
        .query(`SELECT * FROM PRODUCT WHERE [product_id]='${i.product_id}' `);
      listCart.recordset[0] = {
        ...listCart.recordset[0],
        amount: i.amount,
        cart_id: i.cart_id,
      };

      arr = [...arr, listCart.recordset[0]];
    });
    setTimeout(() => {
      res.status(200).json(arr);
    }, [500]);
  } catch (error) {
    throw res.status(400).json(error);
  }
}
async function getDetailProduct(req, res) {
  try {
    //let pool = await sql.connect(config);
    let con = mysql.createConnection(config);

    con.connect(function (err) {
      if (err) throw err;
      //Select all customers and return the result object:
      con.query(
        `SELECT * FROM PRODUCT WHERE product_id='${req.body.data}' `,
        function (err, result, fields) {
          if (err) throw err;
          res.status(200).json(result);
        }
      );
    });
  } catch (error) {
    res.status(400).json(error);
  }
}
async function getAllPromotions(req, res) {
  try {
    let pool = await sql.connect(config);
    let listPromotions = await pool.request().query(`SELECT * FROM PROMOTION `);
    res.status(200).json(listPromotions.recordsets[0]);
  } catch (error) {
    res.status(400).json(error);
  }
}
async function deleteCartProduct(req, res) {
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `EXEC deleteCART_PRODUCT '${req.body.data.product_id}',  '${req.body.data.cart_id}'`
      );
    res.status(200).json("delete CART_PRODUCT SUCCESS");
  } catch (error) {
    res.status(400).json(error);
  }
}
async function payment(req, res) {
  try {
    console.log(req.body);
    const {
      name,
      phoneNumber,
      address,
      email,
      customer_id,
      order_id,
      payment_note,
      payment_method,
      promotion_id,
      total_money,
    } = req.body;
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth();
    const yy = today.getFullYear();
    const hours = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    const payment_id = uuidv4().slice(0, 5);
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `EXEC insertPAYMENT 'PAY${payment_id}',  '${payment_note}','Thành công','${payment_method}','${yy}-${mm}-${dd}','${hours}:${min}:${sec}','${order_id}','${customer_id}','${promotion_id}'`
      );
    res.status(200).json("insert PAYMENT SUCCESS");
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  register,
  login,
  search,
  getALlProduct,
  filterProduct,
  getCart,
  getProductCart,
  getDetailProduct,
  getAllPromotions,
  addToCart,
  deleteCartProduct,
  updateCartProduct,
  insertOrder,
  insertProductOrder,
  getTotalMoneyOrder,
  deleteOrderProduct,
  payment,
};
