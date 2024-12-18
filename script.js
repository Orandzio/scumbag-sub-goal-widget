////////////////////
// URL PARAMETERS //
////////////////////

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const twitchUsername = urlParams.get("username") || '';
const goal = urlParams.get("goal") || 'SUB GOAL';

///////////////
// FUNCTIONS //
///////////////

async function UpdateMetrics() {
    document.getElementById("goalLabel").innerHTML = `${goal}: `;
    document.getElementById("subCountLabel").innerHTML = await GetSubCount();

    setTimeout(UpdateMetrics, 10000);
}

UpdateMetrics();

async function GetSubCount() {
    const response = await fetch(`https://decapi.me/twitch/subcount/${twitchUsername}`);
    const metric = await response.text();

    if (metric.includes("decapi.me"))
        return "-";
    else
        return `${metric}/${parseInt(metric) + 1}`;
}