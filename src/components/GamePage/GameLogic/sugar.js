 function Asteriod() {

        this.position = args.position
        this.velocity = {
                x: randomNumBetween(-1.5, 1.5),
                y: randomNumBetween(-1.5, 1.5)
            }
        this.rotation = 0
        this.rotationSpeed = randomNumBetween(-1, 1)
        this.radius = args.size
        this.score = (80 / this.radius)*5
        this.create = args.create
        this.vertices = asteroidVertices(8, args.size)

    destroy(){
        this.delete = true

        // Explode
        for (let i = 0 i < this.radius i++) {
            const particle = new Particle({
                lifeSpan: randomNumBetween(60, 100),
                size: randomNumBetween(1, 3),
                position: {
                x: this.position.x + randomNumBetween(-this.radius/4, this.radius/4),
                y: this.position.y + randomNumBetween(-this.radius/4, this.radius/4)
                },
                velocity: {
                x: randomNumBetween(-1.5, 1.5),
                y: randomNumBetween(-1.5, 1.5)
                }
            })
        this.create(particle, 'particles')
        }

        // Break into smaller asteroids
        if(this.radius > 10){
            for (let i = 0 i < 2 i++) {
                let asteroid = new Asteroid({

                size: this.radius/2,
                position: {
                    x: randomNumBetween(-10, 20)+this.position.x,
                    y: randomNumBetween(-10, 20)+this.position.y
                },
                create: this.create.bind(this),
                addScore: this.addScore.bind(this)
                })
                this.create(asteroid, 'asteroids')
            }
        }
    }


        // Move
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // Rotation
        this.rotation += this.rotationSpeed
        if (this.rotation >= 360) {
        this.rotation -= 360
        }
        if (this.rotation < 0) {
        this.rotation += 360
        }

        // Draw
        const context = state.context
        context.save()
        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotation * Math.PI / 180)
        context.strokeStyle = '#FFF'
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(0, -this.radius)
        for (let i = 1 i < this.vertices.length i++) {
            context.lineTo(this.vertices[i].x, this.vertices[i].y)
        }
        context.closePath()
        context.stroke()
        context.restore()
    }
 }
 
 
 