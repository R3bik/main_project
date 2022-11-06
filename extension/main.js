//chrome://extensions/
let myLeads=[]

// //turn into array:
// myLeads=JSON.parse(myLeads)
// //push vlue to array:
// myLeads.push("google.com")
// //turn array into string:
// myLeads=JSON.stringify(myLeads)


//get element from html
const inputEl=document.getElementById("input-el")
const deleteBtn=document.getElementById("delete-btn")
const inputBtn = document.getElementById("input-btn")
const tabBtn=document.getElementById("tab-btn")
const removeBtn=document.getElementById("remove-btn")
const inputNo=document.getElementById('no-el')
let ulEl=document.getElementById("ul-el")



// //create local storage:
// console.log(localStorage.getItem("leads","myLeads"))
// localStorage.getItem("leads")
// localStorage.clear()
const leadsfromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))



//check if the value is truthy or falsy in local storage
if(leadsfromLocalStorage){
    myLeads=leadsfromLocalStorage
    render(myLeads)
}




//addevent for tab:
tabBtn.addEventListener("click", function(){
    //chrome api
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

})



//addEvent listener double click to delete:
deleteBtn.addEventListener("dblclick",function(){
    console.log("deleted")
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})


//addeventlistener(click)
inputBtn.addEventListener("click", function(){
    //gets input value
    myLeads.push(inputEl.value)
    inputEl.value=""
    //save to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
   console.log(localStorage.getItem("myLeads"))
    
})


//render items in web page
function render(leads){
    let listItems=""


for(let i=0; i<myLeads.length; i++){
    
   
    //template string:
    listItems+=`
        <li>
            <a target='_blank' href='${myLeads[i]}'>
            ${myLeads[i]}
            </a>
        </li>
        `

    //adding html element to js
    //ulEl.innerHtml+="<li>"+listItems[i]+"</li>"

    //use of createElement()
    // const li= document.createElement("li")
    // li.textContent= myLeads[i]
    // ulEl.append(li)
}

   ulEl.innerHTML=listItems

}

