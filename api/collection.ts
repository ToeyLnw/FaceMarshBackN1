import express from "express";
import { conn,queryAsync } from "../dbconnect";

import mysql from "mysql";
import { PicturePortRequest } from "../model/pic-get-res";


export const router = express.Router();

router.get("/", (req,res)=>{
    conn.query('select * from Picture ORDER BY point DESC', (err,result, fields)=>{
        res.json(result);
    })
});

router.get("/random", (req,res)=>{
    let sql = 'SELECT * FROM Picture ORDER BY RAND() LIMIT ?';
    sql = mysql.format(sql,[2]) 
    conn.query(sql, (err, result, fields)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(result);
        }
    })
})

router.get("/:id", (req,res)=>{
    let id = +req.params.id;
    let sql = 'SELECT * FROM Picture WHERE PID = ?'
    sql = mysql.format(sql,[id])
    conn.query(sql, (err, result, fields)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(result);
        }
    })
})

router.put("/update", async (req,res)=>{
    let data : PicturePortRequest = req.body;
    // res.status(201).json({ Text: "Get in index.ts body: "+JSON.stringify(data)});
    //ข้อมูลต้นฉบับ
    let sql = "SELECT * FROM Picture WHERE PID = ?";
    sql = mysql.format(sql, [data.PID]);
    const result = await queryAsync(sql);
    const jsonStr = JSON.stringify(result);
    const jsonObj = JSON.parse(jsonStr);
    const PicOri : PicturePortRequest = jsonObj[0];

    //merge data
    const updatePic = {...PicOri, ...data}

    //update data
    sql = "update  `Picture` set `madeBy`=?, `fname`=?, `lname`=?, `image`=?, `description`=?, `category`=?, `point`=? where `PID`=?";
    sql = mysql.format(sql,[
        updatePic.madeBy,
        updatePic.fname,
        updatePic.lname,
        updatePic.image,
        updatePic.description,
        updatePic.category,
        updatePic.point,
        updatePic.PID
    ]);
    conn.query(sql, (err,result)=>{
        if(err) throw err;
        res.status(200).json({
            affected_rows : result.affectedRows
        });
    })
})

