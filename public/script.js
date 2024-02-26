function ping() {
    var p = new Ping();

    var url = window.location.origin + "/bare/";

    p.ping(url, function (err, data) {
        if (err) {
            console.log("error loading resource");
            data = data;
        }
        document.getElementById("ping").innerHTML = "Ping: " + data;
    });
}

ping();
setInterval(ping, 500);