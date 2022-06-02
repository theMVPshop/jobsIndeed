const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

let col1, col2, col3, response;
let noOfJobs = 0;
let search = ["Javascript", "HTML", "CSS", "Front End", "SQL", "React Developer", "Web Developer"];
const d = new Date();
let day = d.getDay();
const axios = require('axios');
const cheerio = require('cheerio');
const url = `https://www.indeed.com/jobs?q=${search[day]}&l=USA&explvl=entry_level&fromage=1&remotejob=032b3046-06a3-4876-8dfd-474eb5e7ed11&vjk=1906e1b955a53d6e`;

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
    ig();
  } catch (e) {
    console.error(`Error while fetching rental properties for ${postCode} - ${e.message}`);
  }
})();


function ig() {
  const width = 1080
  const height = 1080

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  loadImage('bkgd/0'+(Math.floor(Math.random()*9)+1)+'.jpg').then(image => {
      // sx,sy,swidth,sheight,x,y,width,height
      context.drawImage(image, Math.floor(Math.random()*3220), Math.floor(Math.random()*3220), width, height, 0, 0, width, height)
    // })

  context.font = 'bold 180pt Menlo'
  context.textAlign = 'center'
  context.textBaseline = 'top'
  context.fillStyle = '#00F'
  context.fillText(noOfJobs, width/2, 30);
  context.font = 'bold 60pt Menlo'
  context.fillStyle = '#000'
  context.fillText("Remote, Entry Level", width/2, 300);
  context.font = 'bold 70pt Menlo'
  context.fillStyle = '#00F'
  context.fillText(search[day]+" Jobs", width/2, 400);
  context.font = 'bold 60pt Menlo'
  context.fillStyle = '#000'
  context.fillText("Were Posted on", width/2, 525);
  context.font = 'bold 60pt Menlo'
  context.fillText("In The Last 24 Hours", width/2, 920);
  context.font = 'bold 25pt Menlo'
  context.fillText("(Click the Link in the Description)", width/2, 1020);
  loadImage('./logo.png').then(image => {
    context.drawImage(image, 78, 650, 923, 239)
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./ig.png', buffer)
    const run = async () => {
        /** post */
        const post = await social.post({
            "post": url,
            "platforms": ["linkedin", "twitter"],
            "mediaUrls": ["./ig.png"]
        }).catch(console.error);
        console.log(post);
      };
       
      run();
   
  })
  })
}
