import { Response } from "express";
/**
 * Simple Express function for sending a response back with a status code
 *
 * @param res
 * @param code
 * @param body
 */
export default function respondWithCode(res: Response, code: number, body: any): void;
