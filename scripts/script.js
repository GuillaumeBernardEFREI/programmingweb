function changeHeader(){
  const path = window.location.pathname;
  const page = path.split("/").pop().split(".")[0]; // e.g., 'about.html'

  const header = document.getElementsByTagName("header")[0];
  console.log(page);

  header.style.backgroundImage = `
  linear-gradient(to left,rgba(0, 12, 10, 0.34),rgba(2, 24, 20, 0.88)),url('../images/${page}.jpg')`;
    

}
