function GetURLParameter(sParam) {
    console.log("Getting parameter");
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

function onDocumentLoad(){
    time = GetURLParameter("time");
    if (time){
        document.getElementById('loggedTime').innerText = time;
    } else {
        document.getElementById('log').setAttribute("hidden","true");
    }
}