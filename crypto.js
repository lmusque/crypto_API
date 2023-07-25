/*
1. create tr, append to tbody
2. create 9 tds, append to tr
    when we create our textContent, we need to call on the API
*/

let tbody = document.querySelector("tbody");
function reloadBody() {
	const xhr = new XMLHttpRequest(); //STEP 1

	xhr.open("GET", "https://api.coinlore.net/api/tickers/"); //step 2

	xhr.addEventListener("readystatechange", function () {
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
			const info = JSON.parse(xhr.responseText);
			data = info.data;
			tbody.innerHTML = "";
			for (let i = 0; i < data.length; i++) {
				let tr = document.createElement("tr");
				tbody.appendChild(tr);

				//creating rank
				let tdRank = document.createElement("td");
				tdRank.textContent = data[i].rank;
				tr.appendChild(tdRank);

				//creating name
				let tdName = document.createElement("td");
				let tdNamesymbol = document.createElement("span");
				tdName.textContent = data[i].name;
				tdNamesymbol.textContent = data[i].symbol;
				tr.appendChild(tdName);
				tdName.appendChild(tdNamesymbol);

				//creating price
				let tdPrice = document.createElement("td");
				tdPrice.textContent = `$${numWithCommas(Math.trunc(data[i].price_usd))}`;
				tr.appendChild(tdPrice);

				//creating exchange rate in 1 hour
				let tdPchange1hr = document.createElement("td");
				tdPchange1hr.textContent = data[i].percent_change_1h;
				tdPchange1hr.className = redOrGreen(data[i].percent_change_1h);
				tr.appendChild(tdPchange1hr);
				if (tdPchange1hr.classList.contains("red")) {
					tdPchange1hr.textContent = `▼${data[i].percent_change_1h}%`;
				} else if (tdPchange1hr.classList.contains("green")) {
					tdPchange1hr.textContent = `▲${data[i].percent_change_1h}%`;
				} else {
					tdPchange1hr.textContent = `${data[i].percent_change_1h}%`;
				}
				//this gives the variable the positive or negativereturn from the function

				//creating exchange rate in 24 hours
				let tdPchange24hr = document.createElement("td");
				tdPchange24hr.textContent = data[i].percent_change_24h;
				tdPchange24hr.className = redOrGreen(data[i].percent_change_24h);
				tr.appendChild(tdPchange24hr);
				if (tdPchange24hr.classList.contains("red")) {
					tdPchange24hr.textContent = `▼${data[i].percent_change_24h}%`;
				} else if (tdPchange24hr.classList.contains("green")) {
					tdPchange24hr.textContent = `▲${data[i].percent_change_24h}%`;
				} else {
					tdPchange24hr.textContent = `${data[i].percent_change_24h}%`;
				}

				//creating exchange rate in 7 days
				let tdPchange7day = document.createElement("td");
				tdPchange7day.textContent = data[i].percent_change_7d;
				tdPchange7day.className = redOrGreen(data[i].percent_change_7d);
				if (tdPchange7day.classList.contains("red")) {
					tdPchange7day.textContent = `▼${data[i].percent_change_7d}%`;
				} else if (tdPchange7day.classList.contains("green")) {
					tdPchange7day.textContent = `▲${data[i].percent_change_7d}%`;
				} else {
					tdPchange7day.textContent = `${data[i].percent_change_24h}%`;
				}
				tr.appendChild(tdPchange7day);

				//creating market
				let tdMarketCap = document.createElement("td");
				tdMarketCap.textContent = `$${numWithCommas(Math.trunc(data[i].market_cap_usd))}`;
				tr.appendChild(tdMarketCap);

				//creating 24 hr volume
				let td24hVolume = document.createElement("td");
				td24hVolume.textContent = `$${numWithCommas(Math.trunc(data[i].volume24))}`;
				tr.appendChild(td24hVolume);

				//creating circulating supply
				let tdCircSupply = document.createElement("td");
				let tdCircsymbol = document.createElement("span");
				tdCircSupply.textContent = `$${numWithCommas(Math.trunc(data[i].csupply))}`;
				tdCircsymbol.textContent = data[i].symbol;
				tr.appendChild(tdCircSupply);
				tdCircSupply.appendChild(tdCircsymbol);

				console.log("hi");
			}
		}
	});
	xhr.send(null); //STEP 4
}

function redOrGreen(num) {
	if (num < 0) {
		return "red";
	} else if (num > 0) {
		return "green";
	} else {
		return "black";
	}
}

function numWithCommas(num) {
	let numParts = num.toString().split(".");
	numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return numParts.join(".");
}
//you need to call it once so that it will run when the page first loads
reloadBody();
// setInterval(reloadBody, 6000);
// setInterval(reloadBody, 30000); // 30 seconds
setInterval(reloadBody, 10000); // 10 seconds
