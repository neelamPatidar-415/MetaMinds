const menubtn = document.getElementById("menubtn");
const sidebar = document.getElementById("sidebar");
const menuoffbtn = document.getElementById("menuoffbtn");

menubtn.addEventListener("click", () => {
    sidebar.classList.replace("translate-x-full", "translate-x-0");
});

menuoffbtn.addEventListener("click", () => {
    sidebar.classList.replace("translate-x-0", "translate-x-full");
});

document.addEventListener("click",(e) =>{
    if(!sidebar.contains(e.target) && !menubtn.contains(e.target) ){
        sidebar.classList.add("translate-x-full");
    }
})