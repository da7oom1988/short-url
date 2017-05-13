window.onload = function(){
    document.getElementById('btn').onclick = function(){
        var cur = window.location.href;
        var newUrl = document.getElementById('url').value;
        window.open(cur + "new/" + newUrl);
        
    };

};