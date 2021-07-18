// get focus element
var lastActiveElement = document.activeElement;

var intervalId = window.setInterval(() => {

  var currentActiveElement = document.activeElement;
  if(lastActiveElement != currentActiveElement) {

      lastActiveElement = currentActiveElement;
      if(currentActiveElement.tagName === 'TEXTAREA')  {
        counter(currentActiveElement.getAttribute("data-clone-id"))
      }

  }

}, 100);


const getParents = (elem) => {

	var parents = [];

	for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if(elem.classList.contains("todolist--adding-todo")) {
      parents.push(elem);
    }
		
	}
	return parents;

};



const counter = (clone_id) => {

  var parents = getParents(document.activeElement);
  var todos = parents[0]?.querySelectorAll(".checkbox__content")
 
  // console.log(todos)
  const content = []
  const ticket_no = []
  let current_no;
  let ticket_suffix;

  todos?.forEach(ele => {   
      let text =  ele.querySelector("a")?.innerText
      if (text) {
        content.push(text)
      }
  });


    content?.forEach(el => {
      const ticket_prefix = el?.split(":")[0]
      let content_tick_no = ticket_prefix?.split("-")[1]

      
      
      if(+content_tick_no) {
        ticket_suffix = ticket_prefix?.split("-")[0]

        ticket_no.push(+content_tick_no)
      }
      })

      ticket_no.sort((a, b) => {
          return b - a;
      });

      current_no = ticket_no[0] + 1 || 1

      const todoItem = document.querySelector(clone_id? `[data-clone-id=${clone_id}]` : "todo_content");
      if(todoItem) {
        todoItem.value = `${ticket_suffix || "ISS"}-${current_no}: `

  }



}
