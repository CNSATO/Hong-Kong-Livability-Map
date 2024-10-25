const popupWindow = document.getElementById("pop-up-window-more-functions")
const Btn = document.getElementById("functions")
const Li = document.querySelectorAll("#MFnav li")
const Ul = document.getElementById("MFnav")
const divMF = document.getElementById("pop-up-window-more-functions")
const items = document.querySelectorAll(".MFitem")
const overlay = document.getElementById("overlay")

function hideOverlay() {
    overlay.style.display = "none";
    divMF.style.display = "none";
    overlay.removeEventListener("click", hideOverlay)
}

Btn.addEventListener("click", (e) => {
    overlay.style.display = "block";
    divMF.style.display = "block";
    overlay.addEventListener("click", hideOverlay)
})

for (var i = 0; i < Li.length; i++) {
    Li[i].setAttribute('index', i)
    Li[i].addEventListener("click", (e) => {
        for (var i = 0; i < Li.length; i++) {
            Li[i].className = 'unvisited'
        }
        e.target.className = 'activated'
        var index = e.target.getAttribute('index')
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none'
        }
        items[index].style.display = 'block'
    })
}

// Preference Setting for Livability's Category Selection
// For Single People, Elder People and General
// some prepared setting: Yu4She4. If you would like to edit the layer display style, please go to the Layer Management module.
const categoryLi = document.querySelectorAll(".people")
for (let index = 0; index < categoryLi.length; index++) {
    categoryLi[index].setAttribute('index', i)
    categoryLi[index].addEventListener("click", (e) => {
        // to-do
        // Which is clicked, Do:
        // 1. activated this.
        // 2. reset and change the layer displaying.
        // 3. reset and change the legend.
        // 4. pop-up tips on the top of page: the preference is set to older-people.

        for (let j = 0; j < categoryLi.length; j++) {
            
            if (!categoryLi[j].classList.contains('unvisited')) {
                categoryLi[j].className += ' unvisited'
            }
            e.target.classList.remove("unvisited")
            if (categoryLi[j].classList.contains('activated')) {
                categoryLi[j].classList.remove("activated")
            }
        }
        e.target.className += ' activated'
    })

}