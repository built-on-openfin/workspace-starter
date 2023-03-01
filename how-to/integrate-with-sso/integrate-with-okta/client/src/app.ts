import { getOktaToken } from "./auth";
import { logInformation } from "./provider";

let informationCallback: (info: string) => void;

window.addEventListener("DOMContentLoaded", async () => {
    informationCallback = logInformation;

	await getAccessToken();
    const token = localStorage.getItem("oktaToken");
    console.log(`DOMContentLoaded: ${token}`);
    // informationCallback(`Access Token: ${token}`);
});

export async function getAccessToken() {
    const query = location.search.slice(1);
    const searchParams = new URLSearchParams(query);
    const oktaCode = searchParams.get("code");
    console.log(`Okta Login Code Received: ${oktaCode}`);

    for (const [key, value] of searchParams) {
        console.log(`Key: ${key}, Value: ${value}`);
    }

    if(oktaCode) {
        try {
            // const token = await getOktaToken(oktaCode);
            // console.log(`Access Token: ${token}`);
            await getOktaToken(oktaCode).then((token) => {
                console.log(`Access token received: ${token}`);
                return token;
            });
        } catch(err) {
            console.log(err);
        }
    }
}
