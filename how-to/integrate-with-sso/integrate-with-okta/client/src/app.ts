import { getOktaToken } from "./auth";
import { logInformation } from "./provider";

let informationCallback: (info: string) => void;

window.addEventListener("DOMContentLoaded", async () => {
    informationCallback = logInformation;
    await getAccessToken();
});


export async function getAccessToken(): Promise<void> {
    const query = location.search.slice(1);
    const searchParams = new URLSearchParams(query);
    const oktaCode = searchParams.get("code");

    if(oktaCode) {
        try {
            const token: string = await getOktaToken(oktaCode);
            informationCallback(`Access Token: ${token}`);
        } catch(err) {
            console.log(err);
        }
    }
}
