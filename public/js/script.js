//FUNÇÃO PARA CONFIRMAÇÃO DO MODAL 
function deleteConfirm(event, form) {

    event.preventDefault();

    const del = document.getElementById("teste")
    
    del.addEventListener("click",()=>{
        form.submit();
    })
}
