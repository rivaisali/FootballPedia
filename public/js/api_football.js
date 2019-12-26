let api_base_url = "https://api.football-data.org/v2/";
const id_liga = 2002; // CHAMPIONS League

//Standing
let  endpoint_standings = `${api_base_url}competitions/${id_liga}/standings?standingType=TOTAL`;

//Schedule
let  endpoint_schedule_upcoming = `${api_base_url}competitions/${id_liga}/matches?status=SCHEDULED`;
let endpoint_match = `${api_base_url}matches/`;

let endpoint_team = `${api_base_url}teams/`;
let endpoint_player = `${api_base_url}players/`

let fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'X-Auth-Token': '7c249c4634c3404b9c2e569f7ef18eaa'
    }
  });
}


function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}


//Standing
function getStandings() {
    if ('caches' in window) {
        caches.match(endpoint_standings).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    resultStandingsJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_standings)
        .then(status)
        .then(json)
        .then(function (data) {
            resultStandingsJSON(data)
        })
        .catch(error);
}


//Schedule 
function getScheduleLeague() {
    return new Promise(function (resolve, reject) {

        if ('caches' in window) {
            caches.match(endpoint_schedule_upcoming).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultScheduleJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_schedule_upcoming)
            .then(status)
            .then(json)
            .then(function (data) {
                resultScheduleJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}


function getDetailScheduleById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_match + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log(data);
                        resultDetailScheduleJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_match + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailScheduleJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

//END Schedule

function getDetailTeamById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        var dataSquadHTML = ''
        var tableSquadHTML = ''
        if ("caches" in window) {
            caches.match(endpoint_team + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultDetailTeamJSON(data)
                        data.squad.forEach(function (squad, index) {

                            dataSquadJSON = squad;
                            dataSquadHTML += `
                            <tr>
                                <td><a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a></td>
                                <td >${squad.position}</td>
                            </tr>`
                        });
                        tableSquadHTML += `<table><tbody> ${dataSquadHTML}  </tbody></table>`
                        document.getElementById("squad").innerHTML = tableSquadHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_team + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailTeamJSON(data)
                dataTeamJSON = data;
                data.squad.forEach(function (squad, index) {
                   
                    dataSquadJSON = squad;
                    dataSquadHTML += `
                    <tr>
                        <td>${index+1}. </td>
                        <td><a href="./player.html?id=${squad.id}"> ${squad.name}</a></td>
                        <td>${squad.position}</td>
                    </tr>`
                });
                tableSquadHTML += `
                <table>
                    <thead>
                        <tr>
                            <td class="a-font-bold">No</td>
                            <td class="a-font-bold">Name</td>
                            <td class="a-font-bold">Position</td>
                        </tr>
                    </thead>
                    <tbody> ${dataSquadHTML}  </tbody>
                </table>`

                document.getElementById("squad").innerHTML = tableSquadHTML;
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailPlayerById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_player + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultDetailPlayerJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_player + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailPlayerJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

