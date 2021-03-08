fetch('image-show.html').then(stream => stream.text()).then(text => define(text));

function define(html) {
  class ImageShow extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = html;
      this.images = Array.from(this.querySelectorAll('img'));
      this.interval = this.getAttribute('interval');

    }

    connectedCallback() {
      if(this.images.length>1){
        setInterval(() => {
          this.nextImage();
        }, this.interval);

        this.images.forEach(image => {
          image.style.opacity = 0;

        });
        this.images[0].style.opacity = 100;
      }
    }

    nextImage() {
      const currentImg = this.images.shift();
      currentImg.style.opacity = 0;
      this.images[0].style.opacity = 100;
      this.images.push(currentImg);
    }
  }
  customElements.define('image-show', ImageShow);
}
