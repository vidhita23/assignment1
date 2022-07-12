const express = require("express");
const bodyParser = require("body-parser");
const request = require("request-promise");
const cheerio = require("cheerio");
const jsonfile = require("jsonfile");

const stories = "https://time.com/";

//require("dotenv").config();

const getData = (req, res, next) => {
  const stories = "https://time.com/";

  (async () => {
    try {
      let latestStories = [];

      const response = await request.get({
        url: stories,
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
        },
        gzip: true,
      });
      let $ = cheerio.load(response);
      const tittle = $('li[class="latest-stories__item"] a>h3').text();
      const link = $('li[class="latest-stories__item"] >a').attr("href");

      //   const bookingURLs = $('a[class*="FlightsTicket_link"]')
      //     .map((i, elem) => console.log(elem.href))
      //     .get();

      for (let i = 0; i < $('li[class="latest-stories__item"]').length; i++) {
        latestStories.push({
          tittle,
          link,
        });
      }

      //   let data = {};
      //   data.tittle = tittle;
      //   data.link = link;
      jsonfile.writeFileSync("data.json", latestStories, { spaces: 2 });
      return res.json({
        data: latestStories,
      });
    } catch (err) {
      console.log("error", err);
      return err;
    }
  })();
};

module.exports = {
  getData,
};
