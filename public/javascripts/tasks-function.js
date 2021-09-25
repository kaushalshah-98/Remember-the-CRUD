


window.addEventListener("DOMContentLoaded", async e => {
  let tasks = await fetch('/users/tasksArray')
  tasks = await tasks.json();



  let totalTasks = tasks.length

  let totalTasksSummary = document.getElementById("")
  window.onload= ()=>{
    totalTasksSummary.innerText = "8";
  }


  //Sidebar whole menu dropdown functionality
  const hamburgerButton = document.getElementById("hamburger");
  const sideBar = document.getElementById("sidebartasks--open");
  hamburgerButton.addEventListener("click", e => {
    sideBar.id === "sidebartasks--open"
      ? sideBar.setAttribute("id", "sidebartasks--closed")
      : sideBar.setAttribute("id", "sidebartasks--open");
  });

  //sidebar list Dropdown Functionality
  const alltaskslist = document.getElementById("options1list");
  const alltasksarrow = document.getElementById("ddownarrow-tasks");
  alltasksarrow.addEventListener("click", e => {
    alltaskslist.style.display === "block"
      ? (alltaskslist.style.display = "none") &&
        alltasksarrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alltaskslist.style.display = "block") &&
        alltasksarrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  });

  const alllistslist = document.getElementById("options2list");
  const alllistsarrow = document.getElementById("ddownarrow-lists");
  alllistsarrow.addEventListener("click", e => {
    alllistslist.style.display === "block"
      ? (alllistslist.style.display = "none") &&
        alllistsarrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alllistslist.style.display = "block") &&
        alllistsarrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  });

  const alltagslist = document.getElementById("options3list");
  const alltagsarrow = document.getElementById("ddownarrow-tags");
  alltagsarrow.addEventListener("click", e => {
    alltagslist.style.display === "block"
      ? (alltagslist.style.display = "none") &&
        alltagsarrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alltagslist.style.display = "block") &&
        alltagsarrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  });

  const alllanguagelist = document.getElementById("options4list");
  const alllanguagearrow = document.getElementById("ddownarrow-languages");
  alllanguagearrow.addEventListener("click", e => {
    alllanguagelist.style.display === "block"
      ? (alllanguagelist.style.display = "none") &&
        alllanguagearrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alllanguagelist.style.display = "block") &&
        alllanguagearrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  });

  // Functionality adding button or create task but not active until typing begins
  const input = document.getElementById("tasks-input");
  const addTaskButton = document.getElementById("tasks-button");
  input.addEventListener("click", e => {
    input.removeAttribute("placeholder");
    addTaskButton.classList.remove("task-hidden");
  });

  input.addEventListener("keypress", e => {
    feature.forEach(el => {
      el.classList.remove("task-hidden");
    });
    test.classList.remove("task-hidden");
    addTaskButton.disabled = false;
  });

  const feature = document.querySelectorAll(".attribute");
  const test = document.getElementById("test-div");
  const tasksContainer = document.getElementById("tasks-container");

  tasksContainer.addEventListener("click", e => {
    input.removeAttribute("placeholder");
    feature.forEach(el => {
      el.classList.add("task-hidden");
    });
    test.classList.add("task-hidden");
    addTaskButton.classList.add("task-hidden");
  });


  input.addEventListener("change", e => {
    if (e.target.value) {
      addTaskButton.disabled = false;
    }
  });

  const search = document.getElementById("search")

  search.addEventListener("click",(e) => {
    search.removeAttribute("placeholder");
  })

/* patches searches*/
  const showResults = (input) => {
    let tasksContainer = document.querySelector("#tasks-container");
   console.log(tasksContainer.children)

for (let i = 0; i < tasksContainer.children.length;i++) {
            tasksContainer.children[i].remove()

}


   input.forEach( result =>{
     let newDiv = document.createElement("div")
      let divMain = document.createElement("div")
      let divLeft = document.createElement("div")
      let input1 = document.createElement("input")
      let pTasks = document.createElement("p")
      divMain.classList.add('mainTaskList')
      divLeft.classList.add('taskLeft')
      input1.id = "taskCheckBox"
      pTasks.classList.add('taskText')

      divMain.appendChild(divLeft)
      divLeft.appendChild(input1)
      divLeft.appendChild(pTasks)
      tasksContainer.appendChild(divMain)
      tasksContainer.appendChild(divLeft)
      tasksContainer.appendChild(input1)
      tasksContainer.appendChild(pTasks)
      for (let i = 0; i < 24; i++) {
         tasksContainer.appendChild(newDiv)

      }
    });


}


const searchForm =document.getElementById('search-form')

    search.addEventListener("keyup", async (e) =>{
        try {
            const input = e.target.value
            const data = await fetch(`/search`,{
              method:'POST',
              body: JSON.stringify({input}),
              headers:{'Content-Type': 'application/json'}
            });
              if(!data.ok) throw data
            let results = await data.json();
             results = results.tasks2.filter((ele) => ele.taskName.includes(input))
             console.log(results)
            //  if(results.taskName.includes(input)){
              showResults(results)
            //  }

        } catch(err) {
            console.error('Something went wrong.', err);
        }
});

// document
//     .getElementById("search")
//     .addEventListner("keyup", async (e) =>{
//       try{
//       const input = e.value
//       const data = await fetch(`/search?q=${input}`);
//       const results = await data.json();
//       return true
//     } catch(err) {
//       console.error("item not found",err);
//       return false
//     }


});
