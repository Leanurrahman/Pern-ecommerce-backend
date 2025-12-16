// const http = require('node:http');  // Node.js-এর built-in HTTP মডিউল লোড করছে
// let count = 0;                     // একটা কাউন্টার ভেরিয়েবল

// function handler(req, res) {       // প্রতিবার রিকুয়েস্ট আসলে এই ফাংশন চালাবে
//     count++;                       // কাউন্ট বাড়াচ্ছে
//     res.end('Hello world ' + count); // রেসপন্সে "Hello world 1", "Hello world 2" ইত্যাদি দেখাবে
// }

// const server = http.createServer(handler); // সার্ভার তৈরি করছে

// server.listen(3000, () => {        // পোর্ট 3000-এ সার্ভার চালু করছে
//     console.log('Server is running on port 3000');
// });

const http = require('node:http');

const handler = http.createServer((req, res) => {
    console.log('Request received');

    let data = "";
    // read body of the request

    req.on('data', (chunk) =>{
        data += chunk.toString();
    });

    req.on('end', () => {
        res.end('Input data: ' + data);
    });
});

const server = http.createServer(handler);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});