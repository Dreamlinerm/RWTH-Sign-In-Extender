async function setExpirationDate() {
  let cookies = await chrome.cookies.getAll({ domain: "rwth-aachen.de" });
  // check if the name contains "session" and the value is not empty
  let sessionCookies = cookies.filter(
    (cookie) =>
      cookie.name.toLowerCase().includes("session") && cookie.value !== ""
  );
  console.log("sessionCookies", sessionCookies);
  //  change the expiration date for each cookie to 2 weeks in the future
  let expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 14);
  for (let cookie of sessionCookies) {
    await chrome.cookies.set({
      url: `https://${cookie.domain}${cookie.path}`,
      name: cookie.name,
      value: cookie.value,
      expirationDate: expirationDate.getTime() / 1000,
    });
  }
  return cookies;
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  setExpirationDate();
});
