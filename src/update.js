
var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;

function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var padding = 10; // (extra zoom IN) thickness of pixels CUT OFF around edges
        var dimension = Math.max(cvs.width, cvs.height) + padding*2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
    }
}


function update(dt) {    
    fitToContainer()
    
    global.t += dt
    
    global.planetSpinAngle = global.planetSpinDa * global.t
    
    // update moon position
    var ma = global.moonOrbitOa + global.moonOrbitDa*global.t
    global.moon.pos = v(.5,.5).add( v( 
                        Math.cos(ma)*global.moonOrbitRx, 
                        Math.sin(ma)*global.moonOrbitRy ))
                        
    // update sun position
    if( global.sunTargetPos ){
    
        // accel sun to user click location
        var d = global.sunTargetPos.sub(global.sunPos)
        var angle = d.getAngle()
        var dv = v(0,0)
        if( d.getMagnitude() > global.sunTargetMargin ){
            dv = vp( angle, global.sunTargetAccel )
        }
        global.sunTargetVel = global.sunTargetVel
                                .mul( (1.0-dt*global.sunTargetFriction) )
                                .add( dv.mul(dt) )
        global.sunPos = global.sunPos.add(global.sunTargetVel.mul(dt))
        
    } else {
        
        //procedural sun movement
        resetRand()
        var sa = global.sunOrbitOa + global.sunOrbitDa*global.t
        global.sunPos =  global.sunOrbitC.add( v( 
                    global.sunOrbitRx*Math.cos(sa), 
                    global.sunOrbitRy*Math.sin(sa) ))
    }
}