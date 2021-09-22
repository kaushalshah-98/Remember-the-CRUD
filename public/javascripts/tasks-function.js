window.addEventListener("DOMContentLoaded", e => {
  const alltaskslist = document.getElementById("options1list");
  const alltasksarrow = document.getElementById("ddownarrow-tasks");
  alltasksarrow.addEventListener("click", (e) => {
    alltaskslist.style.display === "block"
      ? (alltaskslist.style.display = "none")
      : (alltaskslist.style.display = "block");
  });

  const alllistslist = document.getElementById("options2list");
  const alllistsarrow = document.getElementById("ddownarrow-lists");
  alllistsarrow.addEventListener("click", (e) => {
    alllistslist.style.display === "block"
      ? (alllistslist.style.display = "none")
      : (alllistslist.style.display = "block");
  });

  const alltagslist = document.getElementById("options3list");
  const alltagsarrow = document.getElementById("ddownarrow-tags");
  alltagsarrow.addEventListener("click", (e) => {
    alltagslist.style.display === "block"
      ? (alltagslist.style.display = "none")
      : (alltagslist.style.display = "block");
  });

  const alllanguagelist = document.getElementById("options4list");
  const alllanguagearrow = document.getElementById("ddownarrow-languages");
  alllanguagearrow.addEventListener("click", e => {
    alllanguagelist.style.display === ""
      ? (alllanguagelist.style.display = "none")
      : (alllanguagelist.style.display = "");
  });
});
