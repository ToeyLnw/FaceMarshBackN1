import express from "express";
import { conn } from "../dbconnect";
import { PicturePortRequest } from "../model/pic-get-res";
import mysql from "mysql";

export const router = express.Router();

router.post("/", (req, res) => {
    //request PicID and Point . Insert PID point and date
    let body = req.body; 
    let sql = "SELECT * FROM History WHERE PID = ?";
    // sql = mysql.format(sql, [data.PID]);
    res.status(201).json({ Text: "Get in index.ts body: "+JSON.stringify(body)});
});

// router.get("/", (req,res)=>{
//     conn.query('SELECT CURRENT_TIMESTAMP() as date', (err,result, fields)=>{
//         res.json("result: "+result);
//     })
// });

//SELECT DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY), '%d-%m-%y') AS yesterdayDate
//SELECT DATE_FORMAT(NOW(), "%d-%m-%y") AS currentDate
router.get("/", (req, res) => {
    conn.query("SELECT DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY), '%d-%m-%y') AS currentDate", (err, result, fields) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the date.' });
        return;
      }
      const currentDate = result[0].currentDate;
      res.json({ thisday: currentDate });
    });
  });

// router.put("/update", async (req,res)=>{
//     let data : PicturePortRequest = req.body;
//     // res.status(201).json({ Text: "Get in index.ts body: "+JSON.stringify(data)});
//     //ข้อมูลต้นฉบับ
//     let sql = "SELECT * FROM Picture WHERE PID = ?";
//     sql = mysql.format(sql, [data.PID]);
//     const result = await queryAsync(sql);
//     const jsonStr = JSON.stringify(result);
//     const jsonObj = JSON.parse(jsonStr);
//     const PicOri : PicturePortRequest = jsonObj[0];

//     //merge data
//     const updatePic = {...PicOri, ...data}

//     //update data
//     sql = "update  `Picture` set `madeBy`=?, `fname`=?, `lname`=?, `image`=?, `description`=?, `category`=?, `point`=? where `PID`=?";
//     sql = mysql.format(sql,[
//         updatePic.madeBy,
//         updatePic.fname,
//         updatePic.lname,
//         updatePic.image,
//         updatePic.description,
//         updatePic.category,
//         updatePic.point,
//         updatePic.PID
//     ]);
//     conn.query(sql, (err,result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             affected_rows : result.affectedRows
//         });
//     })
// })