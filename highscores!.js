console.log('do you see me?');
//Create the vars
var highScores = document.querySelector("#highScores");
var reset = document.querySelector("#reset");
//A lot of plug and play here
reset.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//Json is still iffy to me. Needed to research a lot of this
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
//utilize the fridge concept to recreate several li's
if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScores.appendChild(createLi);
    }
}