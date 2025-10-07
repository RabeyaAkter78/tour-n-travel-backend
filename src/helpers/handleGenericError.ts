/* eslint-disable prettier/prettier */
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const handleGenericError=(err:any, res:Response)=>{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         name: err.name,
         message: `Any Error: ${err.message}`,
         error: err,
       }) 
}