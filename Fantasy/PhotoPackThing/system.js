var Packs = []


function CreatePacks() 
{
    fetch('https://raw.githubusercontent.com/Joe-vis/Joe-vis.github.io/master/Fantasy/PhotoPackThing/Data/packs.json')
        .then((response) => response.json())
        .then((json) => console.log(json));

    var temp = document.getElementsByTagName("template")[0];
    console.log("temp");
    Packs.forEach(pack => {
        console.log(pack.Name);
        var clone = temp.content.cloneNode(true);
        clone.querySelector(".photo-pack-title").innerHTML = pack.Name;
        var photoPack = clone.querySelector(".photo-pack");
        photoPack.addEventListener("click", function ClickEvent(){
            if(AskForPassword(pack.Password)) {
                OpenPack(pack, photoPack)
                photoPack.removeEventListener("click", ClickEvent);
            } else {
                alert("Wrong password");
            }

        });

        document.getElementById("photo-pack-container").appendChild(clone);
        

    });
} CreatePacks();

const AskForPassword = (password) => {
    if(prompt("gimme pawsword UwU") == password) return true;
    else return false;
}


function OpenPack(pack, packBody) {
    
    packBody.classList.add("photo-body");
    packBody.classList.remove("photo-pack");
    packBody.querySelector("p").remove();
    packBody.childNodes[1].innerHTML = pack.Description;

    var photoSet = document.createElement("div");
    photoSet.classList.add("photo-set");
    pack["Photos"].forEach(photo => {
        var container = document.createElement("div"); 
        container.classList.add("photo-container");
        var photoImage = document.createElement("img");
        photoImage.src = photo.Path;
        photoImage.classList.add("photo-image");
        photoImage.alt = photo.Name;
        photoImage.title = photo.Description;
        container.appendChild(photoImage);
        photoSet.appendChild(container);
    })
    
    packBody.appendChild(photoSet);

}