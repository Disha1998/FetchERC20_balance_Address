/* Moralis init code */
// REPLACE THE BELOW SERVER_URL and APP_ID with your own
const serverUrl = "https://tfgqczhheesd.usemoralis.com:2053/server";
const appId = "IHTgCM1zfXo099zpRQBP6RUME5dnGTQDuYzfGcgE";
Moralis.start({ serverUrl, appId });

async function login() {
    try {
        let currentUser = Moralis.User.current();
        if (!currentUser) {
            currentUser = await Moralis.Web3.authenticate();
        }

        const balances = await Moralis.Web3.getAllERC20({ address: "0xC1118c54B2FE35941C4032A7b9622eC55277fd97" });
        console.log('balances===>', balances);
        if (balances !== undefined) {
            const result = document.getElementById("result");

            balances.map((r) => {
                const newDiv = document.createElement("div");

                newDiv.innerHTML = "Balance :" + r.balance + ",  <br>  " + "Decimals : " + r.decimals + ", <br>" + "Name : " + r.name + ",  <br>" + "Symbol : " + r.symbol + "<br><br>";
                result.appendChild(newDiv);
            })

        }

    } catch (error) {
        console.log(error);
    }
}

async function logOut() {
    await Moralis.User.logOut();
    document.getElementById("myethAddress").textContent = "";
    console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
