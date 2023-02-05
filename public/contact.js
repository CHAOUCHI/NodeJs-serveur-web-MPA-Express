const form = document.querySelector("form");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const password = document.querySelector("#password").value.trim();
    console.log({name,password})
});