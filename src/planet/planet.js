class Planet {
    
    constructor( pos, rad ){
        this.pos = pos
        this.rad = rad
        this.r2 = rad*rad
        
        // angles of incidence of light rays hitting the surface
        this.surfaceAois = new Array(global.nScatterPoints).fill(10)
        
        // relative intensity of light at surface
        this.surfaceInts = new Array(global.nScatterPoints).fill(0)
        
        this.scr = twopi/global.nScatterPoints
    }
    
    resetSurfaceAois(){
        this.surfaceAois.fill(10)
        this.surfaceInts.fill(0)
    }
    
    // update surfaceAois to consider the given ray
    registerSurfaceAoi(ray){
        
        if( !ray.touchAtmo ){
            return
        }
        var index = nnmod( Math.floor( ray.acp / this.scr ), global.nScatterPoints )
        
        var val = Math.min(ray.aoi, this.surfaceAois[index])
        this.surfaceAois[index] = val
        
        if( !val ){
            console.log('poop')
        }
        
        this.adjustNegihboringSurfaceVals( this.surfaceAois, index, val, this.adjustAoi )
        this.adjustNegihboringSurfaceVals( this.surfaceInts, index, 2*(1-(ray.aoi/pio2)), this.adjustInt )
        
    }
    
    // propogate scattering effect across atmosphere
    // used in registerSurfaceAoi
    // pass as func argument to adjustNegihboringSurfaceVals
    adjustAoi(oldv,v,i,count){
        return (count<40) && (oldv>v) && v+.09
    }
    
    // propogate intensity effect across atmosphere
    // used in registerSurfaceAoi
    // pass as func argument to adjustNegihboringSurfaceVals
    adjustInt(oldv,v,i,count){
        return (count<40) && (oldv<v) && v-.05
    }
    
    // used in registerSurfaceAoi
    // apply rolling adjustment to neighboring values in a given array
    // arrayToAdjust is treated as a loop with nScatterPoints elements
    adjustNegihboringSurfaceVals( arrayToAdjust, index, val, func ){
        
        var count = 0
        var i = index
        var v = val
        while( true ){
            count += 1
            i = nnmod(i+1,global.nScatterPoints)
            v = func(arrayToAdjust[i],v,i,count)
            if( !v ) break
            arrayToAdjust[i] = v
        }
        
        
        count = 0
        i = index
        v = val
        while( true ){
            count += 1
            i = nnmod(i-1,global.nScatterPoints)
            v = func(arrayToAdjust[i],v,i,count)
            if( !v ) break
            arrayToAdjust[i] = v
        }
    }
    
    draw(g){
        
        // draw scattered light around surface
        for( var i = 0 ; i < global.nScatterPoints ; i++ ){
            this.drawScatterPoint(g,i)
        }
        
        // draw landmass
        var innerD = .08
        var innerR = .03
        var outerD = 0
        var outerR = .11
        var angle = this.pos.sub(global.sunPos).getAngle()
        var innerC = this.pos.add(vp(angle,innerD))
        var outerC = this.pos.add(vp(angle,outerD))
        var gradient = g.createRadialGradient(
            innerC.x, innerC.y, innerR, 
            outerC.x, outerC.y, outerR)
        gradient.addColorStop(0, "green");
        gradient.addColorStop(.9, "rgb(150,255,100)");
        gradient.addColorStop(1, "rgb(220,255,180)");
        g.fillStyle = gradient
        g.beginPath()
        g.arc( this.pos.x, this.pos.y, this.rad, 0, twopi )
        g.fill()
        
    }
    
    // used in draw
    drawScatterPoint(g,i){
        
        if( this.surfaceAois[i] == 10 ){
            return
        }
        
        var acp1 = i*this.scr
        var aoi1 = this.surfaceAois[i]
        var int1 = this.surfaceInts[i]
        
        var color = this.getScatterColor(aoi1,int1)
        
        var gradient = g.createRadialGradient(
                            this.pos.x, this.pos.y, this.rad, 
                            this.pos.x, this.pos.y, this.rad + global.scatterVisibleRadius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(.5, color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        g.fillStyle = gradient
        g.beginPath()
        var pos = this.pos.add(vp(acp1,this.rad))
        //shortArch()
        //g.arc( pos.x, pos.y, global.scatterVisibleRadius, 0, twopi )
        shortArch(g, this.pos, this.rad + global.scatterVisibleRadius, 
                    acp1-this.scr, acp1+this.scr )
        g.fill()
    }

    // given angle of incidence with atmosphere, 
    // get color of scattered light
    getScatterColor(angle,intensity){
        var ang = Math.abs(cleanAngle(angle))
        var frac = Math.pow(ang/pio2,.7)
        
        var r = 100*frac
        var g = 200*(1.0-.7*frac) 
        var b = 255*(1.0-.7*frac) 
        
        r *= intensity
        g *= intensity
        b *= intensity
        var a = 2*intensity//(intensity>1) ? 1 : Math.max(r,g,b)/255
        return `rgba(${r},${g},${b},${a})`
    }
    
}