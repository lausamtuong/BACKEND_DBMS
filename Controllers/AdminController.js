var config = require("../dbconfig");
const sql = require("mssql");
const { v4: uuidv4 } = require("uuid");
async function getProduct(req, res) {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * from PRODUCT");
    let products_chil = await pool.request().query("SELECT * from CLOTHES");
    let shoe = await pool.request().query("SELECT * from SHOE");
    // console.log(products?.recordset.concat(products_chil.recordset))

    function findOcc(arr, key, key2) {
      let arr2 = [];
      arr.forEach((x) => {
        // Checking if there is any object in arr2
        // which contains the key value
        if (
          arr2.some((val) => {
            return val[key] == x[key] && val[key2] == x[key2];
          })
        ) {
          // If yes! then increase the occurrence by 1
          arr2.forEach((k) => {
            if (k[key] === x[key] && k[key2] === x[key2]) {
              k["total"]++;
            }
          });
        } else {
          // If not! Then create a new object initialize
          // it with the present iteration key's value and
          // set the occurrence to 1
          let a = {};
          a[key] = x[key];
          a["clothes_elastic"] = x["clothes_elastic"];
          a["color"] = x["color"];
          a["style"] = x["style"];
          a[key2] = x[key2];
          a["clothes_id"] = x["clothes_id"];
          a["total"] = 1;
          arr2.push(a);
        }
      });

      return arr2;
    }
    function findShoe(arr, key, key2) {
      let arr2 = [];
      arr.forEach((x) => {
        // Checking if there is any object in arr2
        // which contains the key value
        if (
          arr2.some((val) => {
            return val[key] == x[key] && val[key2] == x[key2];
          })
        ) {
          // If yes! then increase the occurrence by 1
          arr2.forEach((k) => {
            if (k[key] === x[key] && k[key2] === x[key2]) {
              k["total"]++;
            }
          });
        } else {
          // If not! Then create a new object initialize
          // it with the present iteration key's value and
          // set the occurrence to 1
          let a = {};
          a[key] = x[key];
          a["shoe_elastic"] = x["shoe_elastic"];
          a["color"] = x["color"];
          a["shoe_type"] = x["shoe_type"];
          a[key2] = x[key2];
          a["shoe_id"] = x["shoe_id"];
          a["total"] = 1;
          arr2.push(a);
        }
      });

      return arr2;
    }
    return res
      .status(200)
      .json(
        products?.recordset
          .concat(findOcc(products_chil.recordset, "size", "product_id"))
          .concat(findShoe(shoe.recordset, "size", "product_id"))
      );
  } catch (error) {
    console.log(error);
  }
}
async function getCustomer(req, res) {
  try {
    let pool = await sql.connect(config);
    let customers = await pool.request().query(`SELECT * FROM CUSTOMER`);
    res.status(200).json(customers.recordsets);
  } catch (error) {
    console.log(error);
  }
}
async function sumary(req, res) {
  try {
    let pool = await sql.connect(config);
    let customers = await pool
      .request()
      .query(`select count(*) AS 'TOTAL' from CUSTOMER`);

    res.status(200).json(customers.recordsets[0][0]);
  } catch (error) {
    console.log(error);
  }
}
async function sumaryOrder(req, res) {
  try {
    let pool = await sql.connect(config);
    let customers = await pool
      .request()
      .query(`select count(*) AS 'TOTAL' from _ORDER`);
    res.status(200).json(customers.recordsets[0][0]);
  } catch (error) {
    console.log(error);
  }
}
async function sumaryMoney(req, res) {
  try {
    let pool = await sql.connect(config);
    let customers = await pool
      .request()
      .query(` select SUM(total_money) AS TOTAL from _ORDER`);
    res.status(200).json(customers.recordsets[0][0]);
  } catch (error) {
    console.log(error);
  }
}
async function sumaryProduct(req, res) {
  try {
    let pool = await sql.connect(config);
    let customers = await pool
      .request()
      .query(` select count(*) as TOTAL from PRODUCT`);
    res.status(200).json(customers.recordsets[0][0]);
  } catch (error) {
    console.log(error);
  }
}
async function getTrans(req, res) {
  try {
    let pool = await sql.connect(config);
    let trans = await pool
      .request()
      .query(
        ` select  DISTINCT TOP 7 * from PAYMENT  Order BY payment_hour  DESC`
      );
    res.status(200).json(trans.recordsets[0]);
  } catch (error) {
    console.log(error);
  }
}
async function deleteUsers(req, res) {
  try {
  
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        ` delete product where product_id = '${req.body.product_id}   '`
      );
      res.status(200).json(`Delete User ${req.body.product_id} Success!`)
  } catch (error) {
    console.log(error);
  }
}
async function deleteCustomer(req, res) {
  console.log(req.body)
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        ` EXEC deleteCUSTOMER '${req.body.customer_id} '`
      );
      res.status(200).json(`Delete User ${req.body.product_id} Success!`)
  } catch (error) {
    console.log(error);
  }
}
async function updateProduct(req, res) {
  try {
  const {
    product_name,
    manufacturer,
    illustration,
    entry_price,
    sell_price,
    category_id,
    supplier_id,
    product_id
  } = req.body;
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        ` EXEC updatePRODUCT '${product_id}',N'${product_name}',N'${manufacturer}','${illustration}','${entry_price}','${sell_price}','${category_id}','${supplier_id}'`
      );
      res.status(200).json("UpdateProduct Success")
  } catch (error) {
    res.status(400).json(error);
  }
}
async function updateCustomer(req, res) {
  try {
  const {
    customer_id,
    register_date,
    f_name, 
    l_name,
    bdate,
    sex,
    _address,
  } = req.body;
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        ` EXEC updateCUSTOMER '${customer_id }','${register_date}',N'${f_name}',N'${l_name }','${sex}','${bdate}',N'${_address }'`
      );
      res.status(200).json("updateCUSTOMER Success")
  } catch (error) {
    res
      .status(400)
      .json(error?.precedingErrors[0]?.originalError?.info?.message);
  }
}
async function addEmployee(req, res) {
  try {
    let pool = await sql.connect(config);
    let customers = await pool.request().query(`INSERT INTO [dbo].[EMPLOYEE]
    ([employee_id]
    ,[f_name]
    ,[l_name]
    ,[bdate]
    ,[sex]
    ,[_address]
    ,[salary]
    ,[degree]
    ,[_start_date]
    ,[employee_type]
    ,[branch_id]
    ,[employee_manage_id])
VALUES
    ('asdas1csd'
    ,'tuong'
    ,'lauAS'
    ,'12-01-2012'
    ,'M'
    ,'dinh quan'
    ,7000000
    ,'Loai 1'
    ,'12-02-2022'
    ,'loai2'
    ,'BRA0001'   
    ,'EMP0001'  )`);
    res.status(200).json(customers.recordsets);
  } catch (error) {
    res
      .status(400)
      .json(error?.precedingErrors[0]?.originalError?.info?.message);
  }
}
async function addProduct(req, res) {
  const {
    product_name,
    manufacturer,
    entry_price,
    sell_price,
    supplier_id,

    category_id,
    illustration,
  } = req.body.data;

  try {
    const id = uuidv4().slice(0, 5);
    let pool = await sql.connect(config);
    let customers = await pool
      .request()
      .query(
        `EXEC insertPRODUCT 'PRD${id}',  N'${product_name}',  N'${manufacturer}',  N'${illustration}', ${entry_price},  ${sell_price},  '${category_id}',  '${supplier_id}'`
      );
    res.status(200).json(customers.recordsets);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error?.precedingErrors[0]?.originalError?.info?.message);
  }
}
async function addProductChild(req, res) {
  const {
    amount,
    clothes_elastic,
    color,
    shoe_elastic,
    shoe_type,
    product_id,
    size,
    style,
    type,
  } = req.body.data;
  try {
    console.log(req.body.data);
    let pool = await sql.connect(config);
    for (var i = 0; i < amount; i++) {
      var id = uuidv4().slice(0, 5);
      if (type == "SHOE")
        await pool.request().query(
          `EXEC insert${type} 'SHO${id}',  '${product_id}',  N'${clothes_elastic}' , N'${color}', 
              ${size}
           ,  N'${style}'`
        );
      else
        await pool.request().query(
          `EXEC insert${type} 'CLO${id}',  '${product_id}',  N'${clothes_elastic}',
              '${size}'
            , N'${color}',  N'${style}'`
        );
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error?.precedingErrors[0]?.originalError?.info?.message);
  }
}
module.exports = {
  getProduct,
  getCustomer,
  addEmployee,
  addProduct,
  addProductChild,
  sumary,
  sumaryOrder,
  sumaryMoney,
  sumaryProduct,
  getTrans,
  deleteUsers,
  updateProduct,
  updateCustomer,
  deleteCustomer
};
