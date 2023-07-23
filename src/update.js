

function fitToContainer(){
    
    var cvs = global.canvas
  cvs.style.width='100%';
  cvs.style.height='100%';  
  cvs.width  = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;
    
    var padding = 10; // (extra zoom IN) thickness of pixels CUT OFF around edges
    var dimension = Math.max(cvs.width, cvs.height) + padding*2;
    global.canvasScale = dimension;
    global.canvasOffsetX = (cvs.width - dimension) / 2;
    global.canvasOffsetY = (cvs.height - dimension) / 2;
    
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
    global.ctx.fillStyle = global.backgroundColor
    global.ctx.fillRect( 0, 0, cvs.width, cvs.height )
}


function update(dt) {    
    global.t += dt
    
    fitToContainer()
}