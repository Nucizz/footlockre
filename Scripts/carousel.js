let index = 0;

function changeIndex(n) {
  display(index += n);
}

function currentIndex(n) {
  display(index = n);
}

function display(n) {
  let items = document.getElementsByClassName("car-item");
  let dots = document.getElementsByClassName("car-nav-dot");

  for (let i=0;i<items.length;i++) {
    items[i].style.display = "none";
    dots[i].classList.remove("car-nav-dot-active");
  }

  if (n > items.length) {
    index = 1
  } else if (n < 1) {
    index = items.length
  }

  items[index-1].style.display = "block";
  dots[index-1].classList.add("car-nav-dot-active");
}

function autoNext() {
  changeIndex(1);
  setTimeout(autoNext, 5000);
}

autoNext();