 function callAnothePage()
{
window.location.href = "my2html.html";
}

window.onload=function(){
 document.addEventListener("deviceready", onDeviceReady, false);
};

function onDeviceReady() {
	AppEngageFcm.startScreen(function(){alert("Success");},function(){alert("failed");});
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    // Add similar listeners for other events
}

function onPause() {
    // Handle the pause event]
	alert('pause');
}

function onResume() {
    // Handle the resume event
alert('onResume');
}

function onMenuKeyDown() {
    // Handle the menubutton event
alert('onResume');
}
window.onbeforeunload = function(){
        AppEngageFcm.endScreen('myhtml.html',function(){alert("Success");},function(){alert("failed");});
};