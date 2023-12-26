import https from 'node:https'
const url = 'https://catfact.ninja/fact'

const request = https.request(url,(response)=>{
    let data = ''
    response.on('data',(chunk)=>{
        data += chunk.toString()
        // console.log(chunk.toString())
    })
    response.on('end',()=>{
        const body = JSON.parse(data);
        console.log(body);

    })
});

request.on('error',(e)=>{
    console.log(`Error: ${e}`)

})

request.end();
