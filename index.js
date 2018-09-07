const express=require('express')
const bodyParser=require('body-parser')
const nodemailer=require('nodemailer')
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.post('/api/form',(req,res)=>{
    // console.log(req.body)
    nodemailer.createTestAccount((err,account)=>{
        const htmlEmail=    `
       <h3>Contact Details</h3>
       <ul>
       <li>Name:${req.body.name}</li>
       <li>Email:${req.body.email}</li>
       </ul>
       <h3>Message</h3>
       <p>${req.body.message}</p>
        `

        // let transporter=nodemailer.createTransport({
        //     host:'smtp.ethereal.email',
        //     port:587,
        //     auth:{
        //         user:'oz4yh3lraf4qjhai@ethereal.email',
        //         pass:'bKuJa5xrhJAFv3EHwa'
        //     }
        // })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'girishrockr95@gmail.com',
                   pass: 'tingraichariali'
                // user: "test.nodemailer@gmail.com",
                // pass: "Nodemailer123"
               }
           });

      
     

        let mailOptions={
            from:'test@testaccount.com',
            // to:'oz4yh3lraf4qjhai@ethereal.email',
            to:'girishupadhyay1994@gmail.com',
            cc:'girish.upadhyay@candelalabs.io',
            replyTo:'test@testaccount.com',
            subject:'New Message',
            text:req.body.message,
            html:htmlEmail
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return console.log(err)
            }
            console.log('Message sent: %s',info.message)
            console.log('Message URL: %s',nodemailer.getTestMessageUrl(info))

        })
    })
})

const PORT=process.env.port||3001

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})