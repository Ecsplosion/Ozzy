const ipr_openButton = document.getElementById('ipr-button-pc')
const ipr_closeButton = document.getElementById('modal-close-button')
const ipr_modal = document.getElementsByClassName('ipr-modal')[0]
ipr_openButton.addEventListener('click', ()=>{
    if(ipr_modal.style.display == 'none'){
        ipr_modal.style.display = 'block';
    } else {
        ipr_modal.style.display = 'none';
    }
})
ipr_closeButton.addEventListener('click', ()=> {
    if(ipr_modal.style.display == 'block'){
        ipr_modal.style.display = 'none';
    } else {
        ipr_modal.style.display = 'block';
    }
})