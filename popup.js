// Replace 'sample-extension' with the id of the extension you
// registered on ExtensionPay.com to test payments. You may need to
// uninstall and reinstall the extension to make it work.
// Don't forget to change the ID in background.js too!
// const extpay = ExtPay('sobinder-rana-ext')

// document.querySelector('button').addEventListener('click', extpay.openPaymentPage)

// extpay.getUser().then(user => {
//     if (user.paid) {
//         document.querySelector('p').innerHTML = 'User has paid! 🎉'
//         document.querySelector('button').remove()
//     }
// }).catch(err => {
//     document.querySelector('p').innerHTML = "Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet"
// })

const extpay = ExtPay("marketer-ext");
document
  .querySelector("button")
  .addEventListener("click", extpay.openTrialPage("7-day"));
extpay.getUser().then((user) => {
  const now = new Date();
  // const sevenDays = 1000*60*60*24*7 // in milliseconds

  const sevenDays = 1000 * 60 * 2;
  console.log("------------------", user);
  if (user.trialStartedAt && now - user.trialStartedAt < sevenDays) {
    console.log("users trial is active");
  } else {
    console.log("users trial is not active");
  }
});
// extpay.onPaid(function() { console.log('popup paid')});
