// For future reference 

// Taken from user.js
// let userTags = new Set();
// below provides the tags list when creating a new task
// for (let i = 0; i < lists.length; i++) {
//   const list = lists[i];
//   let Tasks = list.Tasks;
//   for (let j = 0; j < Tasks.length; j++) {
//     const task = Tasks[j];
//     let Tags = task.Tags;
//     for (let k = 0; k < Tags.length; k++) {
//       const tag = Tags[k];
//       userTags.add(tag.name);
//     }
//   }
// }

// tags = Array.from(userTags);

// Taken from tasks-function.js
  // const alltagslist = document.getElementById("options3list");
  // const alltagsarrow = document.getElementById("ddownarrow-tags");
  // alltagsarrow.addEventListener("click", e => {
  //   alltagslist.style.display === "block"
  //     ? (alltagslist.style.display = "none") &&
  //       alltagsarrow.setAttribute("src", "/images/blue-dright-arrow.PNG")
  //     : (alltagslist.style.display = "block") &&
  //       alltagsarrow.setAttribute("src", "/images/blue-ddown-arrow.PNG");
  // });

// Taken from tasks.pug
   //- div#tagsorts
        //-   img#ddownarrow-tags(src="/images/blue-dright-arrow.PNG")
          //- div#options3
          //-   p#alltags="Tags"
          //-   ul#options3list
          //-     if tags
          //-       each tag in tags
          //-         li.alltagoptions-open= tag


           //- select(name="tagId").feature.task-hidden
            //-   if tags
            //-     each tag in tags
            //-       option(value=tag.id)=tag.name