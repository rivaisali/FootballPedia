function resultStandingsJSON(data) {
    var tableStandingsHTML = ''
    data.standings.forEach(function (standings) {
        var dataStandings = ''
        standings.table.forEach(function (dataTeam) {
            dataTeam = JSON.parse(JSON.stringify(dataTeam).replace(/http:/g, 'https:'));
            dataStandings += `<tr>
                <td class="center-align">${dataTeam.position}</td>
                <td class="center-align">
                <a href="./team.html?id=${dataTeam.team.id}">
                    <p class="hide-on-small-only">
                        <img class ="show-on-medium-and-up show-on-medium-and-down a-img-team-standings" src=${dataTeam.team.crestUrl}  alt="logo">
                        ${dataTeam.team.name}
                    </p>
                    <p class="hide-on-med-and-up">
                        <img src=${dataTeam.team.crestUrl}  alt="logo" class="a-img-team-standings">
                    </p>
                </a>
                </td>
                <td class="center-align">${dataTeam.playedGames}</td>
                <td class="center-align">${dataTeam.won}</td>
                <td class="center-align">${dataTeam.draw}</td>
                <td class="center-align">${dataTeam.lost}</td>
                <td class="center-align">${dataTeam.goalsFor}</td>
                <td class="center-align">${dataTeam.goalsAgainst}</td>
                <td class="center-align">${dataTeam.goalDifference}</td>
                <td class="center-align">${dataTeam.points}</td>
            </tr>`
        })

        tableStandingsHTML += `
        <div class="card">
            <div class="card-content">
                <h6 class="a-font-bold a-mb-2">${convertDate(new Date(data.competition.lastUpdated))}</h6> 
                <table class="responsive-table striped " >
                    <thead>
                    <tr>
                        <th class="center-align">Position</th>
                        <th>Team</th>
                        <th class="center-align">Played</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                        <th class="center-align">Points</th>
                    </tr>
                    </thead>
                    <tbody>` + dataStandings + `</tbody>
                </table>
            </div>
        </div>`
    });

    document.getElementById("standings-content").innerHTML = tableStandingsHTML;
}