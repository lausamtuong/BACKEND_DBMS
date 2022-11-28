var config = require('../dbconfig');
const sql = require('mssql');
const { v4:uuidv4} = require("uuid")

async function getOrders(req,res) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Orders");
        const listProduct = await products.recordsets;
      
        res.json(listProduct[0]);
    }
    catch (error) {
        console.log(error);
    }
}
async function getCarts(req,res) {
  try {
      let pool = await sql.connect(config);
      let products = await pool.request().query(`SELECT * from CART WHERE customer_id = ${req.body.data}`);
      const listProduct = await products.recordsets;
    
      res.json(listProduct[0]);
  }
  catch (error) {
      console.log(error);
  }
}
async function insert(req,res) {
    try {
     const   SHOSE= [
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2c46e149-c4c4-4608-a85b-0ae0a67ab8db/jordan-break-slides-QmwKlG.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2c46e149-c4c4-4608-a85b-0ae0a67ab8db/jordan-break-slides-QmwKlG.png",
              name: "Jordan Break",
              price: "889,000₫",
               price_import:"300.000đ",
              manufacturer:"CocaCOla",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d08feb3d-d04b-4251-9362-eb14398b82cf/zoom-freak-4-basketball-shoes-zmXv3D.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d08feb3d-d04b-4251-9362-eb14398b82cf/zoom-freak-4-basketball-shoes-zmXv3D.png",
              name: "Zoom Freak 4",
              price: "3,669,000₫",
               price_import:"300.000đ",
              manufacturer:"CocaCOla",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/93536e83-3116-4e49-81b5-fa66060473d8/zoomx-vaporfly-next-2-road-racing-shoes-D4ntS0.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/93536e83-3116-4e49-81b5-fa66060473d8/zoomx-vaporfly-next-2-road-racing-shoes-D4ntS0.png",
              name: "Nike ZoomX Vaporfly Next% 2",
              price: "6,609,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c19997f7-9241-441c-9a2d-f5514e90c86b/flex-experience-run-11-next-nature-road-running-shoes-CTCNv3.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c19997f7-9241-441c-9a2d-f5514e90c86b/flex-experience-run-11-next-nature-road-running-shoes-CTCNv3.png",
              name: "Nike Flex Experience Run 11 Next Nature",
              price: "1,909,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e7455dd-c1e4-4148-b4c7-9897304f0508/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e7455dd-c1e4-4148-b4c7-9897304f0508/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
              name: "Nike ZoomX Invincible Run Flyknit 2",
              price: "5,279,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20477ebc-c447-44d7-98bc-eb3523cc933f/phantom-gt2-elite-fg-football-boot-wRNH0g.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20477ebc-c447-44d7-98bc-eb3523cc933f/phantom-gt2-elite-fg-football-boot-wRNH0g.png",
              name: "Nike Phantom GT2 Elite FG",
              price: "7,319,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7d0cf10-58fc-4f0d-95c7-6352301a0f9d/zoomx-vaporfly-next-2-road-racing-shoes-zgvZjF.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7d0cf10-58fc-4f0d-95c7-6352301a0f9d/zoomx-vaporfly-next-2-road-racing-shoes-zgvZjF.png",
              name: "Nike ZoomX Vaporfly NEXT% 2",
              price: "6,609,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4364f1a0-d01e-4470-83d3-9056abae2589/air-force-1-luxe-shoes-651TPJ.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4364f1a0-d01e-4470-83d3-9056abae2589/air-force-1-luxe-shoes-651TPJ.png",
              name: "Nike Air Force 1 Luxe",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b05afb11-db22-461d-b94e-49bdc316b445/revolution-6-next-nature-road-running-shoes-NC0P7k.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b05afb11-db22-461d-b94e-49bdc316b445/revolution-6-next-nature-road-running-shoes-NC0P7k.png",
              name: "Nike Revolution 6 Next Nature",
              price: "1,759,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc8e8ae1-5e2a-40ac-b8ba-77515d72ecb6/air-zoom-pegasus-39-air-hola-lou-road-running-shoes-HzV9f8.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc8e8ae1-5e2a-40ac-b8ba-77515d72ecb6/air-zoom-pegasus-39-air-hola-lou-road-running-shoes-HzV9f8.png",
              name: "Nike Air Zoom Pegasus 39 A.I.R. Hola Lou",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/779ed33d-2b5b-4ef8-a0ef-4ead046e7b1f/air-max-90-slides-bPJh33.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/779ed33d-2b5b-4ef8-a0ef-4ead046e7b1f/air-max-90-slides-bPJh33.png",
              name: "Nike Air Max 90",
              price: "2,189,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vf6pvilvy7ijoryp4vow/hyperdunk-ep-basketball-shoes-J050xp.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vf6pvilvy7ijoryp4vow/hyperdunk-ep-basketball-shoes-J050xp.png",
              name: "Nike Hyperdunk X EP",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2dcd5e01-4313-486e-946f-387f10eb276a/air-jordan-3-retro-shoes-TJf2lm.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2dcd5e01-4313-486e-946f-387f10eb276a/air-jordan-3-retro-shoes-TJf2lm.png",
              name: "Air Jordan 3 Retro",
              price: "5,589,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/74c5cc3e-375d-4663-b1db-7f6f81242aab/air-force-1-07-lv8-next-nature-shoes-X2nrqR.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/74c5cc3e-375d-4663-b1db-7f6f81242aab/air-force-1-07-lv8-next-nature-shoes-X2nrqR.png",
              name: "Nike Air Force 1 '07 LV8 Next Nature",
              price: "3,089,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ae1ebb03-d904-4380-a9ff-297bb9655a3b/custom-nike-air-zoom-pegasus-39-by-you.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ae1ebb03-d904-4380-a9ff-297bb9655a3b/custom-nike-air-zoom-pegasus-39-by-you.png",
              name: "Nike Air Zoom Pegasus 39 By You",
              price: "4,109,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ee0c388a-d267-4daf-b69e-10cfa77fccfe/custom-nike-air-zoom-pegasus-39-by-you.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ee0c388a-d267-4daf-b69e-10cfa77fccfe/custom-nike-air-zoom-pegasus-39-by-you.png",
              name: "Nike Air Zoom Pegasus 39 By Bretman Rock",
              price: "4,109,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/go-flyease-easy-on-off-shoes-3svRCL.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/go-flyease-easy-on-off-shoes-3svRCL.png",
              name: "Nike Go FlyEase",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/721f7f93-0f2a-4cbf-baf4-72c841f60c21/luka-1-next-nature-pf-basketball-shoes-szjnCq.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/721f7f93-0f2a-4cbf-baf4-72c841f60c21/luka-1-next-nature-pf-basketball-shoes-szjnCq.png",
              name: "Luka 1 'Next Nature' PF",
              price: "3,239,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4638b3b8-c27c-440a-9b59-2a82897e16f1/jordan-series-es-shoes-FDtg9v.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4638b3b8-c27c-440a-9b59-2a82897e16f1/jordan-series-es-shoes-FDtg9v.png",
              name: "Jordan Series ES",
              price: "2,499,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/19e7a186-afc0-4445-93d9-57990301ca3c/air-max-terrascape-97-shoes-3cGxRv.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/19e7a186-afc0-4445-93d9-57990301ca3c/air-max-terrascape-97-shoes-3cGxRv.png",
              name: "Nike Air Max Terrascape 97",
              price: "5,589,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e73338e1-7967-49e7-9a40-1b41def25659/air-trainer-1-shoes-r74Kcn.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e73338e1-7967-49e7-9a40-1b41def25659/air-trainer-1-shoes-r74Kcn.png",
              name: "Nike Air Trainer 1",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/703e8bba-2a1b-4efe-98bc-9ec923174c5b/acg-mountain-fly-low-se-shoes-PFCvHS.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/703e8bba-2a1b-4efe-98bc-9ec923174c5b/acg-mountain-fly-low-se-shoes-PFCvHS.png",
              name: "Nike ACG Mountain Fly Low SE",
              price: "4,409,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3e7e9ea3-93f8-4d06-9f89-665b84eb0511/custom-nike-air-max-97-by-you.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3e7e9ea3-93f8-4d06-9f89-665b84eb0511/custom-nike-air-max-97-by-you.png",
              name: "Nike Air Max 97 By You",
              price: "5,589,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64b50ddd-a519-4301-95cc-5715d65efd19/air-force-1-07-lv8-shoes-V6SkWv.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64b50ddd-a519-4301-95cc-5715d65efd19/air-force-1-07-lv8-shoes-V6SkWv.png",
              name: "Nike Air Force 1 '07 LV8",
              price: "3,239,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2c46e149-c4c4-4608-a85b-0ae0a67ab8db/jordan-break-slides-QmwKlG.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2c46e149-c4c4-4608-a85b-0ae0a67ab8db/jordan-break-slides-QmwKlG.png",
              name: "Jordan Break",
              price: "889,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d08feb3d-d04b-4251-9362-eb14398b82cf/zoom-freak-4-basketball-shoes-zmXv3D.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d08feb3d-d04b-4251-9362-eb14398b82cf/zoom-freak-4-basketball-shoes-zmXv3D.png",
              name: "Zoom Freak 4",
              price: "3,669,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/93536e83-3116-4e49-81b5-fa66060473d8/zoomx-vaporfly-next-2-road-racing-shoes-D4ntS0.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/93536e83-3116-4e49-81b5-fa66060473d8/zoomx-vaporfly-next-2-road-racing-shoes-D4ntS0.png",
              name: "Nike ZoomX Vaporfly Next% 2",
              price: "6,609,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c19997f7-9241-441c-9a2d-f5514e90c86b/flex-experience-run-11-next-nature-road-running-shoes-CTCNv3.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c19997f7-9241-441c-9a2d-f5514e90c86b/flex-experience-run-11-next-nature-road-running-shoes-CTCNv3.png",
              name: "Nike Flex Experience Run 11 Next Nature",
              price: "1,909,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e7455dd-c1e4-4148-b4c7-9897304f0508/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e7455dd-c1e4-4148-b4c7-9897304f0508/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
              name: "Nike ZoomX Invincible Run Flyknit 2",
              price: "5,279,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20477ebc-c447-44d7-98bc-eb3523cc933f/phantom-gt2-elite-fg-football-boot-wRNH0g.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20477ebc-c447-44d7-98bc-eb3523cc933f/phantom-gt2-elite-fg-football-boot-wRNH0g.png",
              name: "Nike Phantom GT2 Elite FG",
              price: "7,319,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7d0cf10-58fc-4f0d-95c7-6352301a0f9d/zoomx-vaporfly-next-2-road-racing-shoes-zgvZjF.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7d0cf10-58fc-4f0d-95c7-6352301a0f9d/zoomx-vaporfly-next-2-road-racing-shoes-zgvZjF.png",
              name: "Nike ZoomX Vaporfly NEXT% 2",
              price: "6,609,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4364f1a0-d01e-4470-83d3-9056abae2589/air-force-1-luxe-shoes-651TPJ.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4364f1a0-d01e-4470-83d3-9056abae2589/air-force-1-luxe-shoes-651TPJ.png",
              name: "Nike Air Force 1 Luxe",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b05afb11-db22-461d-b94e-49bdc316b445/revolution-6-next-nature-road-running-shoes-NC0P7k.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b05afb11-db22-461d-b94e-49bdc316b445/revolution-6-next-nature-road-running-shoes-NC0P7k.png",
              name: "Nike Revolution 6 Next Nature",
              price: "1,759,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc8e8ae1-5e2a-40ac-b8ba-77515d72ecb6/air-zoom-pegasus-39-air-hola-lou-road-running-shoes-HzV9f8.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc8e8ae1-5e2a-40ac-b8ba-77515d72ecb6/air-zoom-pegasus-39-air-hola-lou-road-running-shoes-HzV9f8.png",
              name: "Nike Air Zoom Pegasus 39 A.I.R. Hola Lou",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/779ed33d-2b5b-4ef8-a0ef-4ead046e7b1f/air-max-90-slides-bPJh33.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/779ed33d-2b5b-4ef8-a0ef-4ead046e7b1f/air-max-90-slides-bPJh33.png",
              name: "Nike Air Max 90",
              price: "2,189,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vf6pvilvy7ijoryp4vow/hyperdunk-ep-basketball-shoes-J050xp.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vf6pvilvy7ijoryp4vow/hyperdunk-ep-basketball-shoes-J050xp.png",
              name: "Nike Hyperdunk X EP",
              price: "3,829,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2dcd5e01-4313-486e-946f-387f10eb276a/air-jordan-3-retro-shoes-TJf2lm.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2dcd5e01-4313-486e-946f-387f10eb276a/air-jordan-3-retro-shoes-TJf2lm.png",
              name: "Air Jordan 3 Retro",
              price: "5,589,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/74c5cc3e-375d-4663-b1db-7f6f81242aab/air-force-1-07-lv8-next-nature-shoes-X2nrqR.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/74c5cc3e-375d-4663-b1db-7f6f81242aab/air-force-1-07-lv8-next-nature-shoes-X2nrqR.png",
              name: "Nike Air Force 1 '07 LV8 Next Nature",
              price: "3,089,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ae1ebb03-d904-4380-a9ff-297bb9655a3b/custom-nike-air-zoom-pegasus-39-by-you.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ae1ebb03-d904-4380-a9ff-297bb9655a3b/custom-nike-air-zoom-pegasus-39-by-you.png",
              name: "Nike Air Zoom Pegasus 39 By You",
              price: "4,109,000₫",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ee0c388a-d267-4daf-b69e-10cfa77fccfe/custom-nike-air-zoom-pegasus-39-by-you.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ee0c388a-d267-4daf-b69e-10cfa77fccfe/custom-nike-air-zoom-pegasus-39-by-you.png",
              name: "Nike Air Zoom Pegasus 39 By Bretman Rock",
              price: "4,109,000₫",              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/go-flyease-easy-on-off-shoes-3svRCL.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/go-flyease-easy-on-off-shoes-3svRCL.png",
              name: "Nike Go FlyEase",
              price: "3,829,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/721f7f93-0f2a-4cbf-baf4-72c841f60c21/luka-1-next-nature-pf-basketball-shoes-szjnCq.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/721f7f93-0f2a-4cbf-baf4-72c841f60c21/luka-1-next-nature-pf-basketball-shoes-szjnCq.png",
              name: "Luka 1 'Next Nature' PF",
              price: "3,239,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4638b3b8-c27c-440a-9b59-2a82897e16f1/jordan-series-es-shoes-FDtg9v.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4638b3b8-c27c-440a-9b59-2a82897e16f1/jordan-series-es-shoes-FDtg9v.png",
              name: "Jordan Series ES",
              price: "2,499,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/19e7a186-afc0-4445-93d9-57990301ca3c/air-max-terrascape-97-shoes-3cGxRv.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/19e7a186-afc0-4445-93d9-57990301ca3c/air-max-terrascape-97-shoes-3cGxRv.png",
              name: "Nike Air Max Terrascape 97",
              price: "5,589,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e73338e1-7967-49e7-9a40-1b41def25659/air-trainer-1-shoes-r74Kcn.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e73338e1-7967-49e7-9a40-1b41def25659/air-trainer-1-shoes-r74Kcn.png",
              name: "Nike Air Trainer 1",
              price: "3,829,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/703e8bba-2a1b-4efe-98bc-9ec923174c5b/acg-mountain-fly-low-se-shoes-PFCvHS.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/703e8bba-2a1b-4efe-98bc-9ec923174c5b/acg-mountain-fly-low-se-shoes-PFCvHS.png",
              name: "Nike ACG Mountain Fly Low SE",
              price: "4,409,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3e7e9ea3-93f8-4d06-9f89-665b84eb0511/custom-nike-air-max-97-by-you.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3e7e9ea3-93f8-4d06-9f89-665b84eb0511/custom-nike-air-max-97-by-you.png",
              name: "Nike Air Max 97 By You",
              price: "5,589,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64b50ddd-a519-4301-95cc-5715d65efd19/air-force-1-07-lv8-shoes-V6SkWv.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64b50ddd-a519-4301-95cc-5715d65efd19/air-force-1-07-lv8-shoes-V6SkWv.png",
              name: "Nike Air Force 1 '07 LV8",
              price: "3,239,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2c46e149-c4c4-4608-a85b-0ae0a67ab8db/jordan-break-slides-QmwKlG.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2c46e149-c4c4-4608-a85b-0ae0a67ab8db/jordan-break-slides-QmwKlG.png",
              name: "Jordan Break",
              price: "889,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d08feb3d-d04b-4251-9362-eb14398b82cf/zoom-freak-4-basketball-shoes-zmXv3D.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d08feb3d-d04b-4251-9362-eb14398b82cf/zoom-freak-4-basketball-shoes-zmXv3D.png",
              name: "Zoom Freak 4",
              price: "3,669,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/93536e83-3116-4e49-81b5-fa66060473d8/zoomx-vaporfly-next-2-road-racing-shoes-D4ntS0.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/93536e83-3116-4e49-81b5-fa66060473d8/zoomx-vaporfly-next-2-road-racing-shoes-D4ntS0.png",
              name: "Nike ZoomX Vaporfly Next% 2",
              price: "6,609,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c19997f7-9241-441c-9a2d-f5514e90c86b/flex-experience-run-11-next-nature-road-running-shoes-CTCNv3.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c19997f7-9241-441c-9a2d-f5514e90c86b/flex-experience-run-11-next-nature-road-running-shoes-CTCNv3.png",
              name: "Nike Flex Experience Run 11 Next Nature",
              price: "1,909,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e7455dd-c1e4-4148-b4c7-9897304f0508/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e7455dd-c1e4-4148-b4c7-9897304f0508/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
              name: "Nike ZoomX Invincible Run Flyknit 2",
              price: "5,279,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20477ebc-c447-44d7-98bc-eb3523cc933f/phantom-gt2-elite-fg-football-boot-wRNH0g.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20477ebc-c447-44d7-98bc-eb3523cc933f/phantom-gt2-elite-fg-football-boot-wRNH0g.png",
              name: "Nike Phantom GT2 Elite FG",
              price: "7,319,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7d0cf10-58fc-4f0d-95c7-6352301a0f9d/zoomx-vaporfly-next-2-road-racing-shoes-zgvZjF.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7d0cf10-58fc-4f0d-95c7-6352301a0f9d/zoomx-vaporfly-next-2-road-racing-shoes-zgvZjF.png",
              name: "Nike ZoomX Vaporfly NEXT% 2",
              price: "6,609,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4364f1a0-d01e-4470-83d3-9056abae2589/air-force-1-luxe-shoes-651TPJ.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4364f1a0-d01e-4470-83d3-9056abae2589/air-force-1-luxe-shoes-651TPJ.png",
              name: "Nike Air Force 1 Luxe",
              price: "3,829,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b05afb11-db22-461d-b94e-49bdc316b445/revolution-6-next-nature-road-running-shoes-NC0P7k.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b05afb11-db22-461d-b94e-49bdc316b445/revolution-6-next-nature-road-running-shoes-NC0P7k.png",
              name: "Nike Revolution 6 Next Nature",
              price: "1,759,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc8e8ae1-5e2a-40ac-b8ba-77515d72ecb6/air-zoom-pegasus-39-air-hola-lou-road-running-shoes-HzV9f8.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc8e8ae1-5e2a-40ac-b8ba-77515d72ecb6/air-zoom-pegasus-39-air-hola-lou-road-running-shoes-HzV9f8.png",
              name: "Nike Air Zoom Pegasus 39 A.I.R. Hola Lou",
              price: "3,829,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/779ed33d-2b5b-4ef8-a0ef-4ead046e7b1f/air-max-90-slides-bPJh33.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/779ed33d-2b5b-4ef8-a0ef-4ead046e7b1f/air-max-90-slides-bPJh33.png",
              name: "Nike Air Max 90",
              price: "2,189,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
            {
              img1: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vf6pvilvy7ijoryp4vow/hyperdunk-ep-basketball-shoes-J050xp.png",
              img2: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vf6pvilvy7ijoryp4vow/hyperdunk-ep-basketball-shoes-J050xp.png",
              name: "Nike Hyperdunk X EP",
              price: "3,829,000",
              discount: "",
              percent: "",
              stars: "4.9",
            },
          ]
        let pool = await sql.connect(config);
        SHOSE.forEach(async({img1,name,price,manufacturer})=>{
           const id = uuidv4().slice(0,8)
            await pool.request().query(`INSERT INTO PRODUCT (product_id, product_name ,manufacturer, illustration, entry_price,sell_price,cart_id,category_id,supplier_id) 
               VALUES ('${id}',N'${name}}','${manufacturer}','${img1}','${price}','${price}',1,'07d9d019','012f19b4')`);
              
        })
        //INIT CATEGORY
        // const CATEGORY = ["WINTER","TANKTOP","POLO","SHORT","PANT","SHOE"]
        // CATEGORY.map(async(item)=>{
        //   const id = uuidv4().slice(0,8)
        //   await pool.request().query(`INSERT INTO CATEGORY (category_id,category_name) VALUES ('${id}','${item}')`);
        // })
        //INIT SUPPLIER
        //  const SUPPLIER = [
        //   {name:"COOL MATE",address:"250/144 Nguyễn Trãi, Quận 1, TP.HCM"},
        //   {name:"DONY",address:"150/14 Tân Lập, Quận 6, TP.HCM"},
        //   {name:"OUTERITY",address:"10/08/144 Thị Nghè, Quận 2, TP.HCM"},
        //   {name:"CANIFA",address:"88/94 Lý Thường Kiệt, Quận 10, TP.HCM"},
        //   {name:"GUCCI",address:"62/98 Nguyễn Thị Minh Khai, Quận Bình Thạnh, TP.HCM"}
        // ]
        // SUPPLIER.map(async(item)=>{
        //   const id = uuidv4().slice(0,8)
        //   await pool.request().query(`INSERT INTO SUPPLIER (supplier_id,supplier_name,_address) VALUES ('${id}',N'${item.name}',N'${item.address}')`);
        // })
        //INIT CLOTHES
        //   const CLOTHES = [
        //   {name:"COOL MATE",address:"250/144 Nguyễn Trãi, Quận 1, TP.HCM"},
        //   {name:"DONY",address:"150/14 Tân Lập, Quận 6, TP.HCM"},
        //   {name:"OUTERITY",address:"10/08/144 Thị Nghè, Quận 2, TP.HCM"},
        //   {name:"CANIFA",address:"88/94 Lý Thường Kiệt, Quận 10, TP.HCM"},
        //   {name:"GUCCI",address:"62/98 Nguyễn Thị Minh Khai, Quận Bình Thạnh, TP.HCM"}
        // ]
        // CLOTHES.map(async(item)=>{
        //   const id = uuidv4().slice(0,8)
        //   await pool.request().query(`INSERT INTO SHOE (shoe_id,product_id,shoe_elastic,size,color,shoe_type) VALUES ('${id}','0bbcbac9',N'Đàn hồi','40',N'Đen',N'Thể thao')`);
        // })
        // res.status(200).json("success")
        // console.log("success")
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    getOrders,
    insert,
    getCarts
}