window.addEventListener("DOMContentLoaded", async e => {
  //Sidebar whole menu dropdown functionality
  const hamburgerButton = document.getElementById("hamburger");
  const sideBar = document.getElementById("sidebartasks--open");
  hamburgerButton.addEventListener("click", e => {
    sideBar.id === "sidebartasks--open"
      ? sideBar.setAttribute("id", "sidebartasks--closed")
      : sideBar.setAttribute("id", "sidebartasks--open");
  });

  //Sidebar list Dropdown Functionality
  const alltaskslist = document.getElementById("options1list");
  const alltasksarrow = document.getElementById("ddownarrow-tasks");
  const alllistslist = document.getElementById("options2list");
  const alllanguagelist = document.getElementById("options4list");
  alltasksarrow.addEventListener("click", e => {
    alltaskslist.style.display === "block"
      ? (alltaskslist.style.display = "none") &&
        alltasksarrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alltaskslist.style.display = "block") &&
        (alllistslist.style.display = "none") &&
        (alllanguagelist.style.display = "none") &&
        alltasksarrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  });

  const alllistsarrow = document.getElementById("ddownarrow-lists");
  alllistsarrow.addEventListener("click", e => {
    alllistslist.style.display === "block"
      ? (alllistslist.style.display = "none") &&
        alllistsarrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alllistslist.style.display = "block") &&
        (alltaskslist.style.display = "none") &&
        (alllanguagelist.style.display = "none") &&
        alllistsarrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  });

  const alllanguagearrow = document.getElementById("ddownarrow-languages");
  alllanguagearrow.addEventListener("click", e => {
    alllanguagelist.style.display === "block"
      ? (alllanguagelist.style.display = "none") &&
        alllanguagearrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
      : (alllanguagelist.style.display = "block") &&
        (alllistslist.style.display = "none") &&
        (alltaskslist.style.display = "none") &&
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

  const feature = document.querySelectorAll(".feature");
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

  const search = document.getElementById("search");

  search.addEventListener("click", e => {
    search.removeAttribute("placeholder");
  });

  /* Searches*/
  const showResults = input => {
    let tasksContainer = document.querySelector("#tasks-container");

    for (let i = tasksContainer.children.length - 1; i >= 0; i--) {
      tasksContainer.children[i].remove();
    }

    input.forEach(result => {
      let divMain = document.createElement("div");
      let divLeft = document.createElement("div");
      let input1 = document.createElement("input");
      let pTasks = document.createElement("p");
      pTasks.innerText = `${result.taskName}`;
      divMain.classList.add("mainTaskList");
      divLeft.classList.add("taskLeft");
      input1.id = "taskCheckBox";
      input1.setAttribute("type", "checkbox");
      pTasks.classList.add("taskText");

      divMain.appendChild(divLeft);
      divLeft.appendChild(input1);
      divLeft.appendChild(pTasks);
      tasksContainer.appendChild(divMain);
    });
  };

  const showResults2 = input => {
    let tasksContainer2 = document.querySelector("#tasks-container-complete");

    for (let i = tasksContainer2.children.length - 1; i >= 0; i--) {
      tasksContainer2.children[i].remove();
    }

    input.forEach(result => {
      let divMain2 = document.createElement("div");
      let divLeft2 = document.createElement("div");
      let input12 = document.createElement("input");
      let pTasks2 = document.createElement("p");
      pTasks2.innerText = `${result.taskName}`;
      divMain2.classList.add("mainTaskList");
      divMain2.id = "createdTask";
      divLeft2.classList.add("taskLeft");
      input12.id = "taskCheckBox";
      input12.setAttribute("type", "checkbox");
      pTasks2.classList.add("completedTask");
      pTasks2.classList.add("taskText");

      divMain2.appendChild(divLeft2);
      divLeft2.appendChild(input12);
      divLeft2.appendChild(pTasks2);
      tasksContainer2.appendChild(divMain2);
    });
  };

  search.addEventListener("blur", e => {
    for (let i = 0; i <= 24; i++) {
      let newDiv = document.createElement("div");
      newDiv.classList.add("mainTaskList");
      tasksContainer.appendChild(newDiv);
    }
  });

  search.addEventListener("keyup", async e => {
    try {
      const input = e.target.value;
      const data = await fetch(`/search`, {
        method: "POST",
        body: JSON.stringify({ input }),
        headers: { "Content-Type": "application/json" },
      });
      if (!data.ok) throw data;
      let results = await data.json();
      results2 = results.tasks2.filter(ele => ele.taskName.includes(input));

      showResults(results2);
    } catch (err) {}
  });

  search.addEventListener("keydown", async e => {
    try {
      const input2 = e.target.value;
      const data2 = await fetch(`/search2`, {
        method: "POST",
        body: JSON.stringify({ input2 }),
        headers: { "Content-Type": "application/json" },
      });
      if (!data2.ok) throw data2;
      let resultsComplete = await data2.json();
      results3 = resultsComplete.tasks3.filter(ele =>
        ele.taskName.includes(input2)
      );
      showResults2(results3);
    } catch (err) {
      
    }
  });

  const completedButton = document.getElementById("completed");
  completedButton.addEventListener("click", async e => {
    const checkedBoxes = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    const ids = [...checkedBoxes].map(el => el.getAttribute("taskId"));

    ids.forEach(id => {
      const p = document.querySelectorAll(`p.taskText`);
      p.forEach(el => {
        if (id === el.getAttribute("taskId")) {
          el.setAttribute("class", "completedTask");
        }
      });
    });

    await fetch("/users/tasks/Completed-Tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completedIds: ids }),
    }).then(location.reload());
  });

  const deleteButton = document.getElementById("delete");

  deleteButton.addEventListener("click", async e => {
    const checkedBoxes = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    const ids = [...checkedBoxes].map(el => el.getAttribute("taskId"));
    console.log("=======================================", ids);

    await fetch("/users/tagsjoins", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deletedIds: ids }),
    });

    await fetch("/users/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deletedIds: ids }),
    });

    await location.reload();
  });

  // Modal event listener to create new list
  const modalBackground = document.querySelector(".modalBackground");
  const addListButton = document.getElementById("addListImage");
  const modalClose = document.querySelector(".modalClose");

  addListButton.addEventListener("click", e => {
    modalBackground.classList.add("backgroundActive");
  });

  modalClose.addEventListener("click", e => {
    modalBackground.classList.remove("backgroundActive");
  });

  const modalButton = document.querySelector("#completedList");
  modalButton.addEventListener("click", async e => {
    const newList = document.getElementById("newListInput").value;
    if (newList != "") {
      await fetch("/users/tasks/New-List", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newList }),
      }).then(location.reload());
    }
  });

  // Logout button

  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    location.href = "/users/logout";
  });
});
