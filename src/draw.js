
    
    
// Render graphics
function draw(fps, t) {
   var ctx = global.ctx
   var canvas = global.canvas
    global.ctx.fillStyle = global.backgroundColor
    global.ctx.fillRect( 0, 0, canvas.width, canvas.height )
   
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
   //var denseA = randRange(-.5,.5)
   var denseB = randRange(-1,1)
   var denseC = .5
   var denseSpread = .2
   
   ctx.fillStyle = 'white'
   for( var i = 0 ; i < global.nStars ; i++ ){
       var x,y,r
       if( rand() > .2 ){
           x = rand()
           //y = denseA*Math.pow(x+denseO,2) + denseB*(x+denseO) + denseC
           y = denseB*(x+denseO) + denseC
           
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
       
       // clear scattering data
       global.allPlanets.forEach(p => p.resetSurfaceAois())
       
       // iterate through rays once per pass
       for( var pass = 0 ; pass < 2 ; pass += 1 ){
       
           
           if( pass==0 ){
               // first pass block stars
                ctx.fillStyle = 'black'
                ctx.lineWidth = .01
                ctx.lineCap = "round"
                ctx.beginPath()
                global.allPlanets.forEach(p => 
                    ctx.arc(p.pos.x,p.pos.y,p.rad,0,twopi)
                )
                ctx.fill()
               continue
           }
           
           // start ray drawing
            ctx.strokeStyle = 'rgb(150,150,0)'
            ctx.lineWidth = .001
            ctx.lineCap = "butt"
            ctx.beginPath()
           resetRand()
           
           for( var a = 0 ; a < twopi ; a += da ){
               
               var p = randRange(1e3,3e3)
               var o = rand()*1e3
               var oa = global.sunSpinDa*global.t + rand()*4e-2 * Math.sin( (global.t-o)/p )
               
               // construct ray and compute scattering
               var ray = new Ray(sp,sp.add(vp(a+oa,10+rand())))
               
               ray.draw(ctx)
           }
           
         // finish ray drawing
         ctx.stroke()
       }
   }
    // second pass draw planets and nearby scattered light
    global.allPlanets.forEach(p => p.draw(ctx))
   
   
   // draw sun circle
   ctx.fillStyle = 'yellow'
   ctx.beginPath()
   ctx.arc( global.sunPos.x, global.sunPos.y, global.sunRad, 0, twopi )
   ctx.fill()
   
   
   //debug
   //trace always-visible circle
   //ctx.strokeStyle = 'yellow'
   //ctx.beginPath()
   //ctx.arc( .5, .5, .2, 0, twopi )
   //ctx.stroke()
   
   
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