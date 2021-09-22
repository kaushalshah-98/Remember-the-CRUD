window.addEventListener("DOMContentLoaded", e => {
  //Sidebar whole menu dropdown functionality
  const hamburgerButton = document.getElementById("hamburger");
  const sideBar = document.getElementById("sidebartasks--open")
  hamburgerButton.addEventListener("click", (e) => {
    sideBar.id === "sidebartasks--open" ?
    sideBar.setAttribute("id","sidebartasks--closed") : sideBar.setAttribute("id","sidebartasks--open");
  });

  //sidebar list Dropdown Functionality
  const alltaskslist = document.getElementById("options1list");
  const alltasksarrow = document.getElementById("ddownarrow-tasks");
  alltasksarrow.addEventListener("click", e => {
    alltaskslist.style.display === "block"
      ? (alltaskslist.style.display = "none")&&alltasksarrow.setAttribute("src","/images/blue-dright-arrow.PNG")
      : (alltaskslist.style.display = "block")&&alltasksarrow.setAttribute("src","/images/blue-ddown-arrow.PNG");
    });

  });

  const alllistslist = document.getElementById("options2list");
  const alllistsarrow = document.getElementById("ddownarrow-lists");
  alllistsarrow.addEventListener("click", e => {
    alllistslist.style.display === "block"
      ? (alllistslist.style.display = "none")&&alllistsarrow.setAttribute("src","/images/blue-dright-arrow.PNG")
      : (alllistslist.style.display = "block")&&alllistsarrow.setAttribute("src","/images/blue-ddown-arrow.PNG");
  });

  const alltagslist = document.getElementById("options3list");
  const alltagsarrow = document.getElementById("ddownarrow-tags");
  alltagsarrow.addEventListener("click", e => {
    alltagslist.style.display === "block"
      ? (alltagslist.style.display = "none")&&alltagsarrow.setAttribute("src","/images/blue-dright-arrow.PNG")
      : (alltagslist.style.display = "block")&&alltagsarrow.setAttribute("src","/images/blue-ddown-arrow.PNG");
  });

  const alllanguagelist = document.getElementById("options4list");
  const alllanguagearrow = document.getElementById("ddownarrow-languages");
  alllanguagearrow.addEventListener("click", e => {
    alllanguagelist.style.display === "block"
      ? (alllanguagelist.style.display = "none")&&alllanguagearrow.setAttribute("src","/images/blue-dright-arrow.PNG")
      : (alllanguagelist.style.display = "block")&&alllanguagearrow.setAttribute("src","/images/blue-ddown-arrow.PNG");
  });
});
