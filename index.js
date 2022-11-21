const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const PORT = process.env.PORT || 5000;



let eskidatam = "0";
let niteliklideger = "";
app.get('/api/prices', async (_, res) => {
  const data = await getPrices();

  //const data= getPrices();
  if (data == "-" || data == undefined) {
    eskidatam = "0";

  } else {
    eskidatam = data;
    niteliklideger = eskidatam;
  }
  if (eskidatam == 0) {
    eskidatam = niteliklideger;

  }


  res.send(eskidatam)
})

let eskiDeger = "-";

let calis = 0;

async function getPrices() {

  await aksiyon();
  console.log("burda degere bakıyorzu" + eskiDeger)
  return eskiDeger;

}

async function aksiyon() {
  if (calis == 0) {
    calis = 1;

    //async function getPrices (){

    const browser = await puppeteer.launch({
      headless: true, // setting this to true will not run the UI,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });



    const page = await browser.newPage();






    //await page.goto('https://www.haremaltin.com/', {timeout: 0});
    page.setDefaultNavigationTimeout(0);
    let status = await page.goto('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js/', {
      waitUntil: 'load',
      // Remove the timeout
      timeout: 0
    });



    status = status.status();
    if (status != 404) {
      console.log(`Probably HTTP response status code 200 OK.` + status);
      //...
    } else {
      console.log('hata dönmeliydi ' + status);
    };

    await page.goto('https://www.haremaltin.com/');
    page.setDefaultNavigationTimeout(7000);
    await page.waitUntil;

    const sec = 'body > section.currency-gold.container > div > div.col-lg-8 > div';
    let element = await page.$(sec);
    const innerTextSelector = '#satis__genel__ALTIN';
    await page.waitForSelector(sec);
    //let json = await element.$eval(innerTextSelector,(elem)=> elem.textContent);
    //eskiDeger=json;

    let aaa = 0;

    for (let i = 0; i < 30; i = 0) {
      let json = await element.$eval(innerTextSelector, (elem) => elem.textContent);
      eskiDeger = json + " " + aaa;
      aaa++;
      //consolabas(aaa);

    }
    //  await browser.close();
    // hesapla(json);

    //




  } else {

  }

}












app.listen(PORT, () => console.log(`Server started on port:${PORT}`))