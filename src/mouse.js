function updateMousePos(event){
    fitToContainer()
    
    var rect = global.canvas.getBoundingClientRect();
    var scaleX = global.canvas.width / rect.width;
    var scaleY = global.canvas.height / rect.height;
    
    global.canvasMousePos = new Vector( 
        (event.clientX - rect.left) * scaleX, 
        (event.clientY - rect.top) * scaleY 
    
    )
    global.mousePos = new Vector( 
        virtualMouseX = (global.canvasMousePos.x-global.canvasOffsetX)/global.canvasScale, 
        virtualMouseY = (global.canvasMousePos.y-global.canvasOffsetY)/global.canvasScale
    )
    
    //global.sunPos = global.mousePos
}

function mouseClick(e){
    updateMousePos(e)
    global.sunTargetPos = global.mousePos
}