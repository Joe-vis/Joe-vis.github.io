

tablinks = document.getElementsByClassName("tab-selectors")
tablinkchildren = tablinks[0].children

for(let i=0; i < tablinkchildren.length; i++)
{
    tablinkchildren[i].addEventListener("click", function (e){
        console.log(tablinkchildren)
        changeTab(tablinkchildren[i].id)
        changeTabIndicator(this)
    })
}


function changeTab(tab = 1){
    tabs = document.getElementsByClassName("tabs")[0].children
    console.log(tab)
    for(i=0; i < tabs.length; i++)
    {
        if(i==tab){
            tabs[i].classList.add("active")
        } else {
            tabs[i].classList.remove("active")
        }
    }
}

function changeTabIndicator(element){
    selectors = document.getElementsByClassName("tab-selectors")[0].children
    for(i=0; i < selectors.length; i++)
    {
        selectors[i].classList.remove("selected")
    }

    element.classList.add("selected")
}

changeTab(0)