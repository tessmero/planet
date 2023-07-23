
    
    
// Render graphics
function draw(fps, t) {
   var ctx = global.ctx
   var canvas = global.canvas
   
   
   
   var prevRay = null
   var sp = global.sunPos
   
   //debug
   if( false ){
        ctx.strokeStyle = 'rgba(255,255,0,.5)'
        ctx.lineWidth = .001
        ctx.beginPath()
            
       resetRand()
       global.earth.resetSurfaceAois()
       var a = new Ray( sp, sp.add(vp(-pio2-.2,10)) )
       var b = new Ray( sp, sp.add(vp(-pio2+.2,10)) )
       a.draw(ctx)
       b.draw(ctx)
       global.earth.registerSurfaceAoi(a)
       global.earth.registerSurfaceAoi(b)
       //new Raynge( a, b ).draw(ctx)
       
         ctx.stroke()
   }
   
   // draw stars
   resetRand()
   var denseO = randRange(-1,0)
   var denseA = randRange(-.5,.5)
   var denseB = randRange(-1,1)
   var denseC = .5
   var denseSpread = .1
   
   ctx.fillStyle = 'white'
   for( var i = 0 ; i < global.nStars ; i++ ){
       var x,y,r
       if( rand() > .2 ){
           x = rand()
           y = denseA*Math.pow(x+denseO,2) + denseB*(x+denseO) + denseC
           p = v(x,y).add(vp(rand()*twopi,rand()*denseSpread))
           r = global.minStarRad
       } else {
           p = v(rand(),rand())
           r = randRange( global.minStarRad, global.maxStarRad );
       }
       if( rand() > .5 ){
           var twp = randRange(1e3,3e3)
           o = rand()*1e3
           r *= Math.sin( (global.t-o)/twp )
       }
       
       ctx.fillRect( p.x-r,p.y-r,2*r,2*r )
   }
   
   
   // draw light from mouse position
   if( true ) {
       var n = global.nSunrays
       var da = twopi / (n-(1e-8))
       
       // iterate through rays once per pass
       for( var pass = 0 ; pass < 4 ; pass += 1 ){
       
           
           if( pass==0 ){
               // first pass block stars
               continue
                ctx.strokeStyle = 'black'
                ctx.lineWidth = .01
                ctx.lineCap = "round"
                ctx.beginPath()
           }
           if( pass==2 ){
               // third pass ray drawing
               continue
                ctx.strokeStyle = 'rgba(255,255,255,.2)'
                ctx.lineWidth = .005
                ctx.lineCap = "round"
                ctx.beginPath()
           }
           if( pass==3 ){
               
               // fourth pass ray drawing
                ctx.strokeStyle = 'rgb(150,150,0)'
                ctx.lineWidth = .001
                ctx.lineCap = "round"
                ctx.beginPath()
           }
           
           resetRand()
           global.earth.resetSurfaceAois()
           for( var a = 0 ; a < twopi ; a += da ){
               
               var p = randRange(1e3,3e3)
               var o = rand()*1e3
               var oa = rand()*4e-2 * Math.sin( (global.t-o)/p )
               var ray = new Ray(sp,sp.add(vp(a+oa,10+rand())))
               if( pass == 1 ){
                   // second pass compute scattering
                   global.earth.registerSurfaceAoi(ray)
               } else {
                   // otherwise draw light ray
                   ray.draw(ctx)
               }
           }
           
           
           if(pass==1) {
                // second pass draw scattered light near planet
                global.earth.draw(ctx)
           } else {
                 // otherwise finish ray drawing
                 ctx.stroke()
           }
       }
   }
   
   
   // draw sun circle
   ctx.fillStyle = 'yellow'
   ctx.beginPath()
   ctx.arc( global.sunPos.x, global.sunPos.y, global.sunRad, 0, twopi )
   ctx.fill()
   
   
   
    //ctx.clearRect( 0, 0, canvas.width, canvas.height )
    
    //debug
    //drawFilledChunks(ctx)
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}