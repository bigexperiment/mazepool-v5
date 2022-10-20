// INSERT APP TO THE WEBSITE

setTimeout(() => {
  if (window.location.href.indexOf("facebook.com/ads/") > -1) {
    var extpay = ExtPay("marketer-ext");
    extpay.startBackground(); // this line is required to use ExtPay in the rest of your extension

    extpay.getUser().then((user) => {
      let trailStart = user.trialStartedAt;
      console.log("Initializing user-", user);
      var text = "";
      const now = new Date();
      const sevenDays = 1000 * 60 * 2; // change to 1000*60*60*24*7
      if (trailStart !== null && now - user.trialStartedAt < sevenDays) {
        text = `<form class="filter-form inline">
  <div class="form_group inline">
      <label>How many ads?</label>
      <input class="adsnumber" value="5" type="number" name="" placeholder="10">
  </div>
  <div class="form_group inline">
      <button class="filter-button">Filter</button>
  </div>
  <div class="form_group inline">
      <button class="scroll-button">Scroll</button>
  </div>
  <div class="form_group inline">
      <button class="stop-button">Stop</button>
  </div>
  </form>`;
      } else if (trailStart !== null && now - user.trialStartedAt > sevenDays) {
        text = '<button  id="paid-subscription">Pay Now</button>';
      } else if (trailStart === null) {
        text = '<button  id="free-trail">Free Trail</button>';
      }
      $("body").prepend(
        '<div class="mazepool-container bg-blue"><div class="header-wrap"><div class="logo inline"><img class="logo" src="https://cdn.shopify.com/s/files/1/0654/9641/6486/files/mazepool_aed65895-dc79-4fc3-b882-7a81a3649126.png?v=1663524522"></div>' +
          text +
          '<span id="numAds">false</span> <span id="numAds"> ads  </span><span id="scrolling">not scrolling</span></div> </div></div>'
      );
    });
  }
}, "2000");

$(document).on("click", "#free-trail", function () {
  var extpay = ExtPay("marketer-ext");
  extpay.startBackground(); // this line is required to use ExtPay in the rest of your extension

  extpay.getUser().then((user) => {
    extpay.openTrialPage("7-day");
  });
});
$(document).on("click", "#paid-subscription", function () {
  var extpay = ExtPay("marketer-ext");
  extpay.startBackground(); // this line is required to use ExtPay in the rest of your extension

  extpay.getUser().then((user) => {
    extpay.openPaymentPage();
  });
});

function mazepool() {
  // list of buttons

  const filterBtn = document.getElementsByClassName("filter-button")[0];
  const scrollBtn = document.getElementsByClassName("scroll-button")[0];
  const stopBtn = document.getElementsByClassName("stop-button")[0];

  let isFiltered = false;

  // Clicked on Filter button

  if (filterBtn) {
    filterBtn.addEventListener("click", function () {
      console.log("filterclicked");
      //clearTimeout(intervalId);
      let filterNumber = parseInt(
        document.getElementsByClassName("adsnumber")[0].value
      );

      var id = window.setTimeout(function () {}, 0);

      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }

      var intervalId = window.setInterval(function () {
        var card = document.querySelectorAll("._99s5");
        for (let ii = 0; ii < card.length; ii++) {
          var list = card[ii].querySelectorAll("._9b9y span strong");

          if (list.length == 0) {
            card[ii].style.display = "none";
          }
          for (let i = 0; i < list.length; i++) {
            var num_text = parseInt(list[i].textContent);
            if (num_text < filterNumber) {
              card[ii].style.display = "none";
            }
          }
          console.log("removed ads less than:  " + filterNumber);
        }
      }, 500);

      isFiltered = true;
      console.log(isFiltered);
    });
  }

  // What to do when clicked on scroll
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
      console.log("scrollclick");

      if (document.getElementById("scrolling").innerHTML === "Finding Ads...") {
        console.log("Already scrolling");
      } else {
        a = setInterval(function () {
          window.scrollBy(0, 50);
        }, 100);
        document.getElementById("scrolling").innerHTML = "Finding Ads...";
      }
    });
  }

  // What to do when clicked on stop
  if (stopBtn) {
    stopBtn.addEventListener("click", function () {
      console.log("stopclick");

      clearInterval(a);

      document.getElementById("scrolling").innerHTML = "Stopped!";
    });
  }
}

setTimeout(() => {
  mazepool();
}, "3000");
