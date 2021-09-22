window.addEventListener("DOMContentLoaded", e => {
  const alltaskslist = document.getElementById("options1list");
  const alltasksarrow = document.getElementById("ddownarrow-tasks");
  alltasksarrow.addEventListener("click", e => {
    alltaskslist.style.display === ""
      ? (alltaskslist.style.display = "none")
      : (alltaskslist.style.display = "");
  });

  const alllistslist = document.getElementById("options2list");
  const alllistsarrow = document.getElementById("ddownarrow-lists");
  alllistsarrow.addEventListener("click", e => {
    alllistslist.style.display === ""
      ? (alllistslist.style.display = "none")
      : (alllistslist.style.display = "");
  });

  const alltagslist = document.getElementById("options3list");
  const alltagsarrow = document.getElementById("ddownarrow-tags");
  alltagsarrow.addEventListener("click", e => {
    alltagslist.style.display === ""
      ? (alltagslist.style.display = "none")
      : (alltagslist.style.display = "");
  });

  const alllanguagelist = document.getElementById("options4list");
  const alllanguagearrow = document.getElementById("ddownarrow-languages");
  alllanguagearrow.addEventListener("click", e => {
    alllanguagelist.style.display === ""
      ? (alllanguagelist.style.display = "none")
      : (alllanguagelist.style.display = "");
  });
});
