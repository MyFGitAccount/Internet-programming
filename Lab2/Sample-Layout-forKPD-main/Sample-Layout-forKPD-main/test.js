import {} from "base.js"
import { canvases, dotLine, setCanvas } from "./base"


console.log(canvases)
const {ctx1}=setCanvas(600,600);
dotLine(ctx1,size=1,10,10,20,20);
