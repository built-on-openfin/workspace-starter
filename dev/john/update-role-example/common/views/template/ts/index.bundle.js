var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./client/src/views/template/index.ts ***!
  \********************************************/
async function init() {
    const ticker = document.querySelector("#ticker");
    const execute = document.querySelector("#execute");
    const result = document.querySelector("#result");
    result.textContent = "Not Set";
    execute.addEventListener("click", () => {
        const value = ticker.value;
        console.log(`Value ${value}`);
        result.textContent = ticker.value;
    });
}
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await init();
    }
    catch (error) {
        console.error(error);
    }
});


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxLQUFLLFVBQVUsSUFBSTtJQUNsQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixTQUFTLENBQUMsQ0FBQztJQUNuRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFakQsTUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDL0IsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3hELElBQUk7UUFDSCxNQUFNLElBQUksRUFBRSxDQUFDO0tBQ2I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckI7QUFDRixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jb21tb24vLi9jbGllbnQvc3JjL3ZpZXdzL3RlbXBsYXRlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG5cdGNvbnN0IHRpY2tlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjdGlja2VyXCIpO1xuXHRjb25zdCBleGVjdXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGVjdXRlXCIpO1xuXHRjb25zdCByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdFwiKTtcblxuXHRyZXN1bHQudGV4dENvbnRlbnQgPSBcIk5vdCBTZXRcIjtcblx0ZXhlY3V0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gdGlja2VyLnZhbHVlO1xuXHRcdGNvbnNvbGUubG9nKGBWYWx1ZSAke3ZhbHVlfWApO1xuXHRcdHJlc3VsdC50ZXh0Q29udGVudCA9IHRpY2tlci52YWx1ZTtcblx0fSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcblx0dHJ5IHtcblx0XHRhd2FpdCBpbml0KCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9