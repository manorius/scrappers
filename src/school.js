/**
 * @name get text value of an element
 *
 * @desc Gets the text value of an element by using the page.$eval method
 *
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const fsPromises = fs.promises;



(async () => {

  const browser = await puppeteer.launch({headless:false,defaultViewport:{width:1024,height:768}})
  const page = await browser.newPage()
  await page.goto('https://www.azlyrics.com/g/gracejones.html')
  const links = await page.$$eval(".listalbum-item a", anchors => anchors.map(
    item => item.href


  ))

  for (let n = 99; n < 0; n++) {
    const element = links[n];
    await page.goto(links[n]);
    console.log(links[n]);
    let songTitle = await page.$eval(".main-page > div.row > div:nth-child(2) div:nth-of-type(4)+b", el => el.innerText)
    songTitle = songTitle.split(" ").join("_");
    const lyrics = await page.$eval(".main-page > div.row > div:nth-child(2) div:nth-of-type(5)", el => el.innerText)

    // WRITE SONG TO TXT FILE
    fs.writeFile(`songs/${songTitle}.txt`, lyrics, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('Lyric saved!');

    });
  }




  await browser.close()
})()