import fs from "fs";
import { Request, Response, NextFunction } from "express";
import ytdl from "ytdl-core";

export const downloadVideo = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { url } = req.body;
        if (url) {
            const result = await new Promise( async(resolve, reject) => {
                const { videoDetails } = await ytdl.getBasicInfo(url);
                const file = `${process.cwd()}/downloads/${videoDetails.title}.mp4`;
                const stream = fs.createWriteStream(file);
                ytdl(url).pipe(stream)
                    .on("finish", () => {
                        console.log("fine")
                        resolve({
                            title: videoDetails.title
                        });
                    })
                    .on("error", (error) => {
                        reject(error);
                        console.error("error")
                    });
            })
            return res.status(200).json({ result });
        }
        return res.status(404).json({ result: "URL Not Found" });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}