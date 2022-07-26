import express, { Request, Response, Router as ExpressRouter,Express } from "express";

import {RequestMethod} from "../types/global";


export function routes(app:Express,method:RequestMethod,path:string){
    // @ts-ignore
    app[method.toLowerCase()]("/",(req:Request,res:Response)=>{
        res.send("cascsac")
    })
}