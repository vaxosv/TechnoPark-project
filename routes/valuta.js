const express = require('express');
const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');


const options = {
  uri: `https://www.nbg.gov.ge/index.php?m=582&lng=geo`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

let scraped;

rp(options)
  .then(($) => {
    scraped = $('table tr:nth-child(41) td:nth-child(3)').text()


    
    let us = parseFloat(scraped);
    let odenoba 
    
    let res = ustogel(us,odenoba)
   console.log(res);
   
  })
  .catch((err) => {
    console.log(err);
  });


  function ustogel(us, o){
    return us * o
    
  }
