window.onload = function() {
    let deviceType = "";
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const os = navigator.platform;
        const typeConnexion = navigator.connection.effectiveType;
        const parametresLangue = navigator.languages;
        const accepteCookies = navigator.cookieEnabled;
        const supportAccelerometre = 'Accelerometer' in navigator;

        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const screenSize = screenWidth + " x " + screenHeight + "px";

        const userAgent = navigator.userAgent;
        let adresseIP = "";
        let niveauBatterie = "";
        let tempsRestant = "";

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                adresseIP = data.ip;
            });
        
        navigator.getBattery()
        .then(battery => {
            niveauBatterie = battery.level;
            tempsRestant = battery.dischargingTime;
        }); 

        const fuseauHoraire = new Date().getTimezoneOffset();
        const nombrePagesVisitees = window.history.length;
        let datas = {};

        var isPhone = /Mobile|iPhone|Android/i.test(userAgent);
        if (isPhone) {
            var model = userAgent.match(/\b(?!CPU\b)(\w+)/)[0];
            deviceType = "Téléphone";
            let phoneModel = model;
            setTimeout(function(niveauBatterie, tempsRestant, adresseIP){
                datas.userAgent = userAgent;
                datas.deviceType = deviceType;
                datas.phoneModel = phoneModel;
                datas.screenSize = screenSize;
                datas.os = os;
                datas.latitude = latitude;
                datas.longitude = longitude;
                datas.typeConnexion = typeConnexion;
                datas.parametresLangue = parametresLangue;
                datas.accepteCookies = accepteCookies;
                datas.supportAccelerometre = supportAccelerometre;
                datas.fuseauHoraire = fuseauHoraire;
                datas.nombrePagesVisitees = nombrePagesVisitees;
                datas.niveauBatterie = niveauBatterie;
                datas.tempsRestant = tempsRestant;
                datas.adresseIP = adresseIP;
                datas.date = new Date().toLocaleString();
                
                const jsonData = JSON.stringify(datas);
                
                localStorage.setItem('data', jsonData);
                document.getElementById("titre").innerHTML += "Merci 👍";

                console.log('Les données ont été enregistrées avec succès dans le stockage local');
            }, 3000);
        } else {
            deviceType = "Ordinateur";
            setTimeout(function(niveauBatterie, tempsRestant, adresseIP){
                datas.userAgent = userAgent;
                datas.deviceType = deviceType;
                datas.screenSize = screenSize;
                datas.os = os;
                datas.latitude = latitude;
                datas.longitude = longitude;
                datas.typeConnexion = typeConnexion;
                datas.parametresLangue = parametresLangue;
                datas.accepteCookies = accepteCookies;
                datas.supportAccelerometre = supportAccelerometre;
                datas.fuseauHoraire = fuseauHoraire;
                datas.nombrePagesVisitees = nombrePagesVisitees;
                datas.niveauBatterie = niveauBatterie;
                datas.tempsRestant = tempsRestant;
                datas.adresseIP = adresseIP;
                datas.date = new Date().toLocaleString();
                
                const jsonData = JSON.stringify(datas);
                
                localStorage.setItem('data', jsonData);
                document.getElementById("titre").innerHTML += "Merci 👍";

                console.log('Les données ont été enregistrées avec succès dans le stockage local');
            }, 3000);
        }

        setTimeout(() => {
            fetch("data.json")
                .then(response => {
                    if(!response.ok){
                        throw new Error("Erreur de récuper du fichier JSON");
                    }
                    return response.json();
                })
                .then(data => {
                    if(Object.keys(data).length === 0){
                        data = datas;
                    }else{
                        Object.assign(data, datas);
                    }
                    console.log(data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récup des données", error);
                });
        }, 5000);
    });
};