function callAnothePage()
{
window.location.href = "myhtml.html";
}
function getDateTime(){
    alert(new Date(new Date().getTime()).toLocaleString());
}

window.onload=function(){
 document.addEventListener("deviceready", onDeviceReady, false);
};

function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    // Add similar listeners for other events
	AppEngageFcm.startScreen(function(){alert("Success");},function(){alert("failed");});

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
alert('onMenuKeyDown');
}

window.onbeforeunload = function(){
   AppEngageFcm.endScreen('hello.html',function(){alert("Success");},function(){alert("failed");});
};