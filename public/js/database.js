function databasePromise(idb) {
    var dbPromise = idb.open("db_footballpwa", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team_favorite")) {
            var indexFavTeam = upgradeDb.createObjectStore("team_favorite", {
                keyPath: "id"
            });
            indexFavTeam.createIndex("nameTeam", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("player_favorite")) {
            var indexFavPlayer = upgradeDb.createObjectStore("player_favorite", {
                keyPath: "id"
            });
            indexFavPlayer.createIndex("namePlayer", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("match_favorite")) {
            var indexFavMatch = upgradeDb.createObjectStore("match_favorite", {
                keyPath: "id"
            });
            indexFavMatch.createIndex("homeTeam", "match.homeTeam.name", {
                unique: false
            });
            indexFavMatch.createIndex("awayTeam", "match.awayTeam.name", {
                unique: false
            });
        }
    });

    return dbPromise;
}

function checkData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("Remove favorite")
                } else {
                    reject("Add favorite")
                }
            });
    });
}

function createDataFav(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "player") {
        storeName = "player_favorite";
        dataToCreate = {
            id: data.id,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            counrtyOfBirth: data.counrtyOfBirth,
            nationality: data.nationality,
            position: data.position
        }
    } else if (dataType == "team") {
        storeName = "team_favorite"
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    } else if (dataType == "match") {
        storeName = "match_favorite"
        dataToCreate = {
            id: data.match.id,
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    }

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function () {
        console.log('Team berhasil disimpan.');
        document.getElementById("iconFav").classList.add('fas');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = "Remove favorite";
         M.toast({
             html: 'Berhasil Ditambahkan favorite!'
         });
        var message = `Berhasil Ditambahkan favorite!`;

         if (Notification.permission === 'granted') {
            showNotification(message);
        } else {
            console.error('Fitur notifikasi tidak diijinkan.');
        }

       
    }).catch(function () {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("iconFav").classList.remove('fas');
        document.getElementById("iconFav").classList.add('far');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = " Add favorite";
        M.toast({
             html: 'Data berhasil dihapus dari favorite!'
         });

         var message = `Data berhasil dihapus dari favorite!`;

         if (Notification.permission === 'granted') {
            showNotification(message);
        } else {
            console.error('Fitur notifikasi tidak diijinkan.');
        }
       
    }).catch(function () {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function getSavedDataById(dataType) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        var dataSquadHTML = ''
        var tableSquadHTML = ''
        getDataById("team_favorite", idParam).then(function (team) {
            resultDetailTeamJSON(team)
            dataTeamJSON = team;
            team.squad.forEach(function (squad) {
                dataSquadJSON = squad;
                dataSquadHTML += `
                <tr>
                    <td>
                    <a href="./player.html?id=${squad.id}"> ${squad.name}</a>
                    </td>
                    <td >${squad.position}</td>
                </tr>
                `
            });
            tableSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`
            document.getElementById("squad").innerHTML = tableSquadHTML;
        })
    } else if (dataType == "player") {
        getDataById("player_favorite", idParam).then(function (player) {
            resultDetailPlayerJSON(player);
        });
    } else if (dataType == "match") {
        getDataById("match_favorite", idParam).then(function (match) {
            resultDetailMatchJSON(match);
        });
    }
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function readDataFavHtml(dataType) {
    if (dataType == "team") {
        getAllData("team_favorite").then(function (data) {
            resultTeamFav(data);
        });
    } else if (dataType == "player") {
        getAllData("player_favorite").then(function (data) {
            resultPlayerFav(data);
        });
    } else if (dataType == "match") {
        getAllData("match_favorite").then(function (data) {
            resultMatchFav(data);
        });
    }
}


function showNotification(body) {
    const title = 'Favorite Team';
    const options = {
        'body': `${body}`,
        'icon': '../img/logo.png',
        'badge': '../img/logo.png'
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}