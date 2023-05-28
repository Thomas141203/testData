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

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const adresseIP = data.ip;
            });
        
        navigator.getBattery()
        .then(battery => {
            const niveauBatterie = battery.level;
            const tempsRestant = battery.dischargingTime;
        }); 

        const fuseauHoraire = new Date().getTimezoneOffset();
        const nombrePagesVisitees = window.history.length;

        var isPhone = /Mobile|iPhone|Android/i.test(userAgent);
        if (isPhone) {
            var model = userAgent.match(/\b(?!CPU\b)(\w+)/)[0];
            deviceType = "Téléphone";
            let phoneModel = model;
            setTimeout(function(niveauBatterie, tempsRestant, adresseIP){
                const data = {
                    userAgent: userAgent,
                    deviceType: deviceType,
                    phoneModel: phoneModel,
                    screenSize: screenSize,
                    os: os,
                    latitude: latitude,
                    longitude: longitude,
                    typeConnexion: typeConnexion,
                    parametresLangue: parametresLangue,
                    accepteCookies: accepteCookies,
                    supportAccelerometre: supportAccelerometre,
                    fuseauHoraire: fuseauHoraire,
                    nombrePagesVisitees: nombrePagesVisitees,
                    niveauBatterie: niveauBatterie,
                    tempsRestant: tempsRestant,
                    adresseIP: adresseIP,
                    date: new Date()
                };
                
                const jsonData = JSON.stringify(data);
                
                localStorage.setItem('data', jsonData);
                document.getElementById("titre").innerHTML += "Merci 👍";

                console.log('Les données ont été enregistrées avec succès dans le stockage local');
            }, 3000);
        } else {
            deviceType = "Ordinateur";
            setTimeout(function(niveauBatterie, tempsRestant, adresseIP){
                const data = {
                    userAgent: userAgent,
                    deviceType: deviceType,
                    screenSize: screenSize,
                    os: os,
                    latitude: latitude,
                    longitude: longitude,
                    typeConnexion: typeConnexion,
                    parametresLangue: parametresLangue,
                    accepteCookies: accepteCookies,
                    supportAccelerometre: supportAccelerometre,
                    fuseauHoraire: fuseauHoraire,
                    nombrePagesVisitees: nombrePagesVisitees,
                    niveauBatterie: niveauBatterie,
                    tempsRestant: tempsRestant,
                    adresseIP: adresseIP,
                    date: new Date().toLocaleString()
                };
                
                const jsonData = JSON.stringify(data);
                
                localStorage.setItem('data', jsonData);
                document.getElementById("titre").innerHTML += "Merci 👍";

                console.log('Les données ont été enregistrées avec succès dans le stockage local');
            }, 3000);
        }

        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    const value = data[key];
                });
            })
            .catch(error => {
                console.error("Erreur lors de la récup des données", error);
            });
    });
};