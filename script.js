class Application {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.backgroundColor = 'transparent';
    this.images = [];
    this.loadedImages = 0;



    this.totalImages = 64;
    this.currentFrameIndex = 1;

    for (let i = 0; i < this.totalImages; i++) {
      const img = new Image();
      img.onload = () => {
        this.loadedImages++;
        if (this.loadedImages === this.totalImages) {
          this.addEventListeners();

          this.render();
        }
      };
      img.src = `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/medium/${String(i).padStart(4, '0')}.png`;
      this.images.push(img);
    }
  }



  handleDifferentUIComponents = {
    handleHeadingAnimationBasedonScroll: () => {
      const heading = document.querySelector('h1');
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate opacity based on scroll position
      const opacity = Math.max(0, 1 - (scrollTop / (2 * viewportHeight)));
      
      // Apply the calculated opacity
      heading.style.opacity = opacity;

    }
  }

  addEventListeners() {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameCount = this.totalImages;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      this.currentFrameIndex = frameIndex;
      this.render();

      this.handleDifferentUIComponents.handleHeadingAnimationBasedonScroll();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const img = this.images[this.currentFrameIndex];
    if (!img) return;

    const canvasRatio = this.canvas.width / this.canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than the image
      drawWidth = this.canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetY = (this.canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than the image
      drawHeight = this.canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (this.canvas.width - drawWidth) / 2;
    }

    this.ctx.save();
    if (this.totalImages - this.currentFrameIndex < 10) {
      this.ctx.globalAlpha = (this.totalImages - this.currentFrameIndex) / 10;
    }
    // this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    this.ctx.restore();
  }
}

window.onload = () => {
  window.app = new Application();
};