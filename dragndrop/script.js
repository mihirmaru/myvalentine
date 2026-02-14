let highestZ = 1;

class Paper {
  holdingPaper = false;
  pointerStartX = 0;
  pointerStartY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {

    paper.addEventListener("pointerdown", (e) => {
      e.preventDefault();

      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.pointerStartX = e.clientX;
      this.pointerStartY = e.clientY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.setPointerCapture(e.pointerId);
    });

    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      this.velX = currentX - this.prevX;
      this.velY = currentY - this.prevY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevX = currentX;
      this.prevY = currentY;

      paper.style.transform =
        `translateX(${this.currentPaperX}px) 
         translateY(${this.currentPaperY}px) 
         rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener("pointerup", (e) => {
      this.holdingPaper = false;
      paper.releasePointerCapture(e.pointerId);
    });

    paper.addEventListener("pointercancel", () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
