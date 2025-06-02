(function () {
    const canvas = document.getElementById("leaf-canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    Object.assign(canvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none", 
        zIndex: "9999999", 
    });


    const leafImages = [
        "https://static.vecteezy.com/system/resources/thumbnails/022/802/950/small_2x/gooseberry-leaves-isolated-on-a-transparent-background-png.png",
        "https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-tea-leaf-png-png-image_10117348.png",
        "https://static.vecteezy.com/system/resources/thumbnails/020/027/759/small/green-leaves-on-transparent-background-free-png.png"
    ];

    const loadedLeafImages = [];
    let imagesLoaded = 0;

    leafImages.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === leafImages.length) {
                animate(); 
            }
        };
        loadedLeafImages.push(img);
    });
    let leaves = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    let wind = 0;
    let targetWind = 0;
    let spawnInterval = null;

    class Leaf {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 10 + Math.random() * 40;
            this.speedY = 1 + Math.random() * 2;
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.swing = Math.random() * 100;
            this.image = loadedLeafImages[Math.floor(Math.random() * loadedLeafImages.length)];
        }


        update() {

            //physics go brrrrrrrrrrrrrr    
            this.x += wind + Math.sin(this.swing + this.y / 60) * 1;
            this.y += this.speedY;
            this.angle += this.rotationSpeed;

            return !(this.y > height + this.size || this.x < -this.size || this.x > width + this.size);
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function updateWind() {
        targetWind = ((mouseX - width / 2) / (width / 2)) * 3;
        const smoothing = 0.03;
        wind += (targetWind - wind) * smoothing;
    }
    function animate() {
        ctx.clearRect(0, 0, width, height);
        updateWind();
        leaves = leaves.filter(leaf => {
            const alive = leaf.update();
            if (alive) leaf.draw();
            return alive;
        });
        requestAnimationFrame(animate);
        //console.log(leaves.length);
    }

    function spawnLeaf(x, y) {
        for (let i = 0; i < 3; i++) {
            leaves.push(new Leaf(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5));
        }
    }

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });


    document.addEventListener("mousedown", (e) => {
        const isTextSelected = window.getSelection().toString().length > 0;


        const tag = e.target.tagName.toLowerCase();
        const ignoredTags = ["input", "textarea", "button", "select"];
        const isInteractive = ignoredTags.includes(tag);

        if (isTextSelected || isInteractive) return;

        spawnLeaf(mouseX, mouseY);


        spawnInterval = setInterval(() => spawnLeaf(mouseX, mouseY), 90 + Math.round(Math.random() * 90));
    });

    document.addEventListener("mouseup", () => {
        clearInterval(spawnInterval);
    });

    document.addEventListener("mouseleave", () => {
        clearInterval(spawnInterval);
    });
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
})();
