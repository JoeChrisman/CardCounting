export default class Sprite {
    constructor(x, y, width, height, rotation, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.image = image;

        this.velocity = 0;
        this.direction = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.rotationVelocity = 0;
    }

    moveTo(targetX, targetY, targetRotation, velocity) {
        return new Promise(resolve => {
            this.isMoving = true;
            this.resolve = resolve;
            if (targetX === this.x && targetY === this.y) {
                this.isMoving = false;
                resolve();
                return;
            }
            this.targetX = targetX;
            this.targetY = targetY;
            this.targetRotation = targetRotation;

            this.velocity = velocity;
            const xOffset = targetX - this.x;
            const yOffset = targetY - this.y;
            const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);

            // probably will never happen, but just in case...
            if (velocity === 0 || distance === 0) {
                this.isMoving = false;
                resolve();
                return;
            }
            this.direction = Math.atan2(xOffset, yOffset);
            this.rotationVelocity = (targetRotation - this.rotation) / (distance / velocity);
        });
    }

    update() {
        if (this.isMoving === false) {
            //console.warn('static sprite was updated', this);
        }
        this.x += this.velocity * Math.sin(this.direction);
        this.y += this.velocity * Math.cos(this.direction);
        this.rotation += this.rotationVelocity;

        const dx = this.x - this.targetX;
        const dy = this.y - this.targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.velocity) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.rotation = this.targetRotation;
            this.rotationVelocity = 0;
            this.velocity = 0;
            this.resolve();
            this.isMoving = false;
        }
    }

    render(ctx) {
        ctx.save();
        // translate to the center, then rotate - so the rotation isn't screwed
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        // draw from the center so the rest of the program has easy math
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height);
        ctx.restore();
    }
}