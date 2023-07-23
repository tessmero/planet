class Planet {
    
    constructor( pos, rad ){
        this.pos = pos
        this.rad = rad
        this.r2 = rad*rad
        
        // angles of incidence of light rays hitting the surface
        this.surfaceAois = null
        
        // relative intensity of light at surface
        this.surfaceInts = null
    }
    
    resetSurfaceAois(){
        if( this.surfaceAois == null ){
            this.surfaceAois = new Array(this.nScatterPoints)
        }
        this.surfaceAois.fill(10)
        
        if( this.surfaceInts == null ){
            this.surfaceInts = new Array(this.nScatterPoints)
        }
        this.surfaceInts.fill(0)
    }
    
    // update surfaceAois to consider the given ray
    registerSurfaceAoi(ray){
        
        if( !ray.touchAtmo ){
            return
        }
        var index = nnmod( Math.floor( (ray.acp+global.planetSpinAngle) / this.scr ), this.nScatterPoints )
        
        var val = Math.min(ray.aoi, this.surfaceAois[index])
        this.surfaceAois[index] = val
        
        if( !val ){
            console.log('poop')
        }
        
        this.adjustNegihboringSurfaceVals( this.surfaceAois, index, val, this.adjustAoi )
        this.adjustNegihboringSurfaceVals( this.surfaceInts, index, 2*(1-(ray.aoi/pio2)), this.adjustInt )
        
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
            i = nnmod(i+1,this.nScatterPoints)
            v = func(arrayToAdjust[i],v,i,count)
            if( !v ) break
            arrayToAdjust[i] = v
        }
        
        
        count = 0
        i = index
        v = val
        while( true ){
            count += 1
            i = nnmod(i-1,this.nScatterPoints)
            v = func(arrayToAdjust[i],v,i,count)
            if( !v ) break
            arrayToAdjust[i] = v
        }
    }
    
    
}