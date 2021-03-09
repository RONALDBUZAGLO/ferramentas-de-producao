//FUNÇÃO PARA CONFIRMAÇÃO DO MODAL 
function deleteConfirm(event, form) {

    event.preventDefault();

    const del = document.getElementById("modalDel")
    
    del.addEventListener("click",()=>{
        form.submit();
    })
}
