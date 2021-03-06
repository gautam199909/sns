const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

//Config AWS
const creds = new AWS.SharedIniFileCredentials({profile: 'default'});
const sns = new AWS.SNS({creds,region: 'us-east-1'});
const topicArn = "enter your topic arn";


//Routes
app.get('/status' , (req,res) =>{
    res.status(200).send(sns);
});

app.post('/subscribe' ,(req,res)=>{
    let params ={
        Protocol: 'EMAIL',
        TopicArn: `${topicArn}`,
        Endpoint: req.body.email
    }

    sns.subscribe(params, (err , data)=>{
        if(err)console.log(err);
        res.send(data);
    });

});

app.post('/publish' , (req,res)=>{
    let params ={
         Subject :req.body.Subject,
         Message : req.body.Message,
        TopicArn: `${topicArn}`
    }

    sns.publish(params, (err , data)=>{
        if(err)console.log(err);
        res.send(data);
    });
})

const port = 3000;
app.listen(port , ()=>{
    console.log(`SNS app listening on port ${port}`);
});
