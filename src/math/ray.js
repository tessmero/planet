// beam of light defined by two points
// gsecond point should always be off-screen

class Ray{
    constructor( start, end ){
        this.debugSpecs = []
        
        this.start = start
        this.end = end
        
        // prepare for tracing
        var d = end.sub(start)
        this.d = d
        this.angle = d.getAngle()
        this.det = d.x*d.x + d.y*d.y
        
        // find where the ray hits the earth
        // (or off-screen endpoint)
        var hit = this.getHit(global.earth)
        
        this.end = hit[0] // REPLACE given endpoint
        this.aoi = hit[1] // angle of incidence
        this.acp = hit[2] // angular coord on planet surface
        this.hitPlanet = hit[3] // true if terminates on surface
        this.touchAtmo = hit[4] // true if intersects planet atmosphere
    }
    
    // find where this ray hits the given planet
    // return vals used to set member vars above
    //      end       vector  - position 
    //      aoi       angle   - angle of incidence
    //      acp       angle   - angular coord on planet surface
    //      hitPlanet boolean - true if terminates on surface
    //      touchAtmo boolean - true if touches atmosphere
    getHit(planet){      
        var p = planet.pos  
        var r2 = planet.r2
        
        // locate point nearest planet center
        var d = p.sub(this.start)
        var rat = (this.d.x*d.x + this.d.y*d.y)/this.det
        var np = this.start.add(this.d.mul(rat))
        //this.debugSpecs.push(['red',np])
        var npa = np.sub(p).getAngle()
        var d2 = planet.pos.sub(np).getD2()
        
        
        
        // compute point on planet surface
        var dist = Math.sqrt(d2)
        var theta = Math.acos( dist / planet.rad )
        var p1 = p.add(vp(npa-theta,planet.rad))
        var p2 = p.add(vp(npa+theta,planet.rad))
        var s = this.start
        if( p1.sub(s).getD2() < p2.sub(s).getD2() ){
            var pos = p1
            var acp = npa-theta
        } else {
            var pos = p2
            var acp = npa+theta
        }
        
        //debug
        if( false ){
            console.log(`dist: ${dist.toFixed(2)}`)
            console.log(`theta: ${theta.toFixed(2)}`)
            console.log(`this.angle: ${this.angle.toFixed(2)}`)
        }
        if( false ){
            this.debugSpecs.push(['orange',p,p.add(vp(npa,dist))])
            this.debugSpecs.push(['white',p,p.add(vp(acp,planet.rad))])
            this.debugSpecs.push(['blue',pos])
        }
        
        // check if missed planet
        if( (rat < 0) || (d2 > r2) ){
            var touchAtmo = dist<(planet.rad+global.scatterInfluenceRadius)
            return [this.end,pio2,npa,false,touchAtmo]
        }
        
        //return [pos,theta,theta]
        return [pos,pio2-theta,acp,true,true]
    }
    
    draw(g, debug=false){
        
        //debug
        if( this.debugSpecs ){
            this.debugSpecs.forEach( s => {
                if( s.length == 2 ){
                    g.fillStyle = s[0]
                    g.beginPath()
                    g.arc( s[1].x, s[1].y, .005, 0, twopi )
                    g.fill()
                } else if( s.length == 3 ){
                    g.strokeStyle = s[0]
                    g.lineWidth = .002
                    g.beginPath()
                    g.moveTo( s[1].x, s[1].y )
                    g.lineTo( s[2].x, s[2].y )
                    g.stroke()
                }
            })
        }
        
        // trace ray
        if( true ){
            var s = this.start.sub(vp(this.angle,.02*rand()))
            g.moveTo( s.x,s.y )
            g.lineTo( this.end.x, this.end.y )
        }
        
        
        // debug angular coord on planet surface
        if( debug ){
            var p = global.earth
            var s = p.pos.add(vp(this.acp,p.rad))
            g.strokeStyle = 'red'
            g.lineWidth = .001
            g.beginPath()
            g.moveTo( p.pos.x, p.pos.y )
            g.lineTo( s.x, s.y )
            g.stroke()
        }
        
        // debug angle of incidence
        if( false && (this.endY < 1) ){
            g.font = ".01px Arial";
            g.textAlign = "center";
            g.fillStyle = "white";
            g.fillText(this.aoi.toFixed(2), this.x, this.endY)
        }
    }
}