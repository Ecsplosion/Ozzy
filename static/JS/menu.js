const my_menu = document.getElementsByClassName('menu')[0]
if(my_menu){
const toggle_button = document.getElementById('more-options');
toggle_button.addEventListener('click', function(){
    if(my_menu.style.bottom == '-80px'){
        my_menu.style.bottom = '-27px'
    } else {
        my_menu.style.bottom = '-80px'
    }
})    
}