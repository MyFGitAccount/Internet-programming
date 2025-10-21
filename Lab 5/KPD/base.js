const canvases = [];

function setCanvas(width=400,height=300){
  const canvas=document.createElement("canvas");
  canvas.width=width;
  canvas.height=height;
  document.body.appendChild(canvas);
  const ctx=canvas.getContext("2d");
  canvases.push({canvas,ctx});
  return {canvas,ctx};
}

function setScreenSize(canvas,w,h){
  canvas.width=w;
  canvas.height=h;
}

function background(canvas,color="#ffffff"){
    canvas.style.background=color;
}

function line(ctx,size=1,x1,y1,x2,y2,color="black"){
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle=color;
  ctx.lineWidth=size;
  ctx.stroke();
  ctx.closePath();
}

function Vector(ctx,lineWidth=1,arrowSize=10,x1,y1,x2,y2,color="black"){
  const angle=Math.atan2(y2-y1,x2-x1);
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.strokeStyle=color;
  ctx.lineWidth=lineWidth;
  ctx.stroke();

  // arrowhead
  ctx.beginPath();
  ctx.moveTo(x2,y2);
  ctx.lineTo(x2-arrowSize*Math.cos(angle-Math.PI/6),
             y2-arrowSize*Math.sin(angle-Math.PI/6));
  ctx.lineTo(x2-arrowSize*Math.cos(angle+Math.PI/6),
             y2-arrowSize*Math.sin(angle+Math.PI/6));
  ctx.closePath();
  ctx.fillStyle=color;
  ctx.fill();
}

function CircleFill(ctx,r,x,y,color="red"){
  ctx.beginPath();
  ctx.ellipse(x,y,r,r,0,0,Math.PI*2);
  ctx.fillStyle=color;
  ctx.fill();
  ctx.closePath();
}

function CircleStroke(ctx,r,x,y,color="black"){
  ctx.beginPath();
  ctx.ellipse(x,y,r,r,0,0,Math.PI*2);
  ctx.strokeStyle=color;
  ctx.stroke();
  ctx.closePath();
}

function TextFill(ctx,font,text,x,y,color="black"){
  ctx.font=font;
  ctx.fillStyle=color;
  ctx.fillText(text,x,y);
}

function TextStroke(ctx,font,text,x,y,color="black"){
  ctx.font=font;
  ctx.strokeStyle=color;
  ctx.strokeText(text,x,y);
}

function drawEq(ctx,eqText,textSize,x,y,color="black"){
  ctx.font=`${textSize}px Arial`;
  ctx.fillStyle=color;
  ctx.textAlign="left";
  ctx.textBaseline="alphabetic";
  ctx.fillText(eqText,x,y);
}

function drawEqWithSubscript(ctx,base,sub,x,y,textSize=20,color="black"){
  ctx.textAlign="left";
  ctx.textBaseline="alphabetic";
  ctx.fillStyle=color
  ctx.font=`${textSize}px Arial`;
  ctx.fillText(base,x,y);

  const baseWidth=ctx.measureText(base).width;

  ctx.font=`${textSize * 0.7}px Arial`;
  ctx.fillText(sub,x+baseWidth,y+textSize*0.3);
}

function drawEqWithSuperscript(ctx,base,sup,x,y,textSize=20){
  ctx.textAlign="left";
  ctx.textBaseline="alphabetic";

  ctx.font=`${textSize}px Arial`;
  ctx.fillText(base,x,y);

  const baseWidth=ctx.measureText(base).width;

  ctx.font=`${textSize * 0.7}px Arial`;
  ctx.fillText(sup,x+baseWidth,y-textSize*0.3);
}

function drawFraction(ctx,numerator,denominator,x,y,textSize=20){
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.fillStyle="black";

  ctx.font=`${textSize}px Arial`;
  ctx.fillText(numerator,x,y-textSize*0.6);

  ctx.fillText(denominator,x,y+textSize*0.9);

  const width=Math.max(
    ctx.measureText(numerator).width,
    ctx.measureText(denominator).width
  )+10;

  ctx.beginPath();
  ctx.lineWidth=2;
  ctx.moveTo(x-width/2,y+textSize*0.2);
  ctx.lineTo(x+width/2,y+textSize*0.2);
  ctx.stroke();
}

function drawMatrix(ctx,matrix,x,y,cellSize=30,textSize=20,color="black"){
  ctx.font=`${textSize}px Arial`;
  ctx.fillStyle=color;
  ctx.textAlign="center";
  ctx.textBaseline="middle";

  const rows=matrix.length;
  const cols=matrix[0].length;

  const width=cols*cellSize;
  const height=rows*cellSize;

  //left bracket
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x,y+height);
  ctx.moveTo(x,y);
  ctx.lineTo(x+10,y);
  ctx.moveTo(x,y+height);
  ctx.lineTo(x+10,y+height);
  ctx.stroke();

  //right bracket
  ctx.beginPath();
  ctx.moveTo(x+width+18,y);
  ctx.lineTo(x+width+18,y+height);
  ctx.moveTo(x+width+18,y);
  ctx.lineTo(x+width+10,y);
  ctx.moveTo(x+width+18,y+height);
  ctx.lineTo(x+width+10,y+height);
  ctx.stroke();

  // Draw entries
  for (let i=0;i<rows;i++){
    for (let j=0;j<cols;j++){
      const cx=x+15+j*cellSize+cellSize/2;
      const cy=y+i*cellSize+cellSize/2;
      ctx.fillText(matrix[i][j],cx,cy);
    }
  }
}

//drawRoot(ctx, "x²+1", 50, 100, 24);       // √(x²+1)
//drawRoot(ctx, "y", 50, 150, 24, 3);       // ∛y
function drawRoot(ctx,radicand,x,y,textSize=20,index=null,color="black"){
  ctx.font=`${textSize}px Arial`;
  ctx.fillStyle=color;
  ctx.textAlign="left";
  ctx.textBaseline="alphabetic";

  // Draw the radical sign
  const rootHeight=textSize;
  const rootWidth=10;
  const radWidth = ctx.measureText(radicand).width;

  ctx.beginPath();
  ctx.moveTo(x,y-rootHeight*0.2);
  ctx.lineTo(x+rootWidth*0.3,y);
  ctx.lineTo(x+rootWidth*0.6,y-rootHeight*0.8);
  //ctx.lineTo(x+rootWidth,y-rootHeight*0.8);
  ctx.lineTo(x+rootWidth+radWidth+5,y-rootHeight*0.8);
  ctx.strokeStyle=color;
  ctx.lineWidth=2;
  ctx.stroke();

  // Optional index
  if (index!==null){
    ctx.font=`${textSize * 0.6}px Arial`;
    ctx.fillText(index,x-textSize*0.6,y-textSize*0.2);
    ctx.font=`${textSize}px Arial`;
  }

  // Draw the expression under the root
  ctx.fillText(radicand,x+rootWidth+2,y);
}