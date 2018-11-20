class Sticky{
  constructor(){
    this.scrollpos = window.scrollY;
    this.header = document.querySelector("header");
    this.header_height = this.header.offsetHeight;
    this.stickyStart();
  }

  stickyStart(){
    const add_class_on_scroll = () => this.header.classList.add("sticky__header");
    const remove_class_on_scroll = () => this.header.classList.remove("sticky__header");

    window.addEventListener('scroll', () => { 
      this.scrollpos = window.scrollY;
    
      if (this.scrollpos >= this.header_height) {
        add_class_on_scroll()
      } else {
        remove_class_on_scroll()
      }
    })
  } 
}

window.header = new Sticky();