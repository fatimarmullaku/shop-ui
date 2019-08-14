var addaddress = document.getElementById("addaddress");
if (addaddress) {
    addaddress.addEventListener("click", function(e) {
        e.preventDefault();
        var boxes = document.getElementById("box-address");
        var clone = boxes.firstElementChild.cloneNode(true);
        boxes.appendChild(clone);
    });
}

var addphone = document.getElementById("addphone");
if (addphone) {
    addphone.addEventListener("click", function(e) {
        e.preventDefault();
        var boxes = document.getElementById("box-phone");
        var clone = boxes.firstElementChild.cloneNode(true);
        boxes.appendChild(clone);
    });
}
