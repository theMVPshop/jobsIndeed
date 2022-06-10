const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const ftp = require("basic-ftp");

let response;
let noOfJobs = 0;
let search = ["Javascript", "HTML", "CSS", "Front End", "SQL", "React Developer", "Web Developer"];
const d = new Date();
let day = d.getDay();
const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.indeed.com/jobs?q="+encodeURIComponent(search[day])+"&l=USA&sc=0kf%3Aattr(DSQF7)explvl(ENTRY_LEVEL)%3B&fromage=1&vjk=a872dfeca8880ba0";
console.log(url);
/** Cut & Paste Node.js Code **/
const SocialPost = require("social-post-api"); // Install "npm i social-post-api"

// Live API Key
const social = new SocialPost("MYMGS9V-MBYMCH4-GHHV5WY-YF7WAW8");

(async () => {
  const args = process.argv.slice(2);
  const postCode = args[0] || 2000;
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    noOfJobs = $("#searchCountPages").text().trim().split(" ")[3];
    console.log("#jobs:", noOfJobs);
    ig();
  } catch (e) {
    console.error(`Error while fetching rental properties for ${postCode} - ${e.message}`);
  }
})();


function ig() {
  const width = 1080;
  const height = 1080;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  loadImage('bkgd/0'+(Math.floor(Math.random()*9)+1)+'.jpg').then(image => {
      // sx,sy,swidth,sheight,x,y,width,height
    context.drawImage(image, Math.floor(Math.random()*3000), Math.floor(Math.random()*3000), width, height, 0, 0, width, height);

    context.font = 'bold 180pt Menlo';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#00F';
    context.fillText(noOfJobs, width/2, 30);
    context.font = 'bold 60pt Menlo';
    context.fillStyle = '#000';
    context.fillText("Remote, Entry Level", width/2, 300);
    context.font = 'bold 65pt Menlo';
    context.fillStyle = '#00F';
    context.fillText(search[day]+" Jobs", width/2, 400);
    context.font = 'bold 60pt Menlo';
    context.fillStyle = '#000';
    context.fillText("Were Posted on", width/2, 525);
    context.font = 'bold 60pt Menlo';
    context.fillText("In The Last 24 Hours", width/2, 920);
    context.font = 'bold 25pt Menlo';
    context.fillText("(Click the Link in the Description)", width/2, 1020);
    loadImage('./logo.png').then(image => {
        context.drawImage(image, 78, 650, 923, 239);
        const buffer = canvas.createPNGStream();
        example(buffer);
    })
  })
}

async function example(buffer) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "s9201.gridserver.com",
            user: "indeed@favasava.com",
            password: "K@Kr1t2022!",
            secure: false
        });
        console.log(await client.list());
        await client.cd("html");
        await client.uploadFrom(buffer, "ig"+day+".png");
        await run();
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

const run = async () => {
    /** post */
    const post = await social.post({
        "post": "Click Here to Apply for these jobs: "+url,
        "platforms": ["linkedin", "twitter"],
        "mediaUrls": ["http://favasava.com/ig"+day+".png"],
        shortenLinks: false,
    }).catch(console.error);
    console.log(post);
  };