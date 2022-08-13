const express = require("express")
const { exec } = require("child_process")
const app = express()

app.get("/runform", (req,res)=> {
//      res.send("Hello World");
        res.sendFile(__dirname + "/Docker-run.html");
})


app.get("/run", (req,res) =>{
//      res.send("This is Run Page");
//      res.send(cname);
//      exec("date", (err, stdout, stderr) => {
//      exec("cal", (err, stdout, stderr) => {
//              console.log(stdout);
//              res.send(stdout);
//              res.send("<pre>"+ stdout +"</pre>" );

        const cname = req.query.cname;
        const cimage = req.query.cimage;
        exec('docker run -dit --name ' + cname + " " + cimage , (err, stdout, stderr) => {
                        console.log(stdout);
                        console.log(stderr);
                        res.send("<span> Container Launched With ID: <br/> &emsp; " + stdout + "</span>");
        });
});


app.get("/ps", (req, res) => {
//      exec("docker ps | tail -n +2 | awk '{print $2,$3,$4,$10}'", (err, stdout, stderr)  => {
//              console.log(stdout)
//              console.log(stdout.split("\n"));
//              console.log(stdout.split("\n")[1]);
//              res.send("<pre>" + stdout + "</pre>" );

        exec("docker ps | tail -n +2", (err, stdout, stderr) => {

//              let a = stdout.split("\n");
//              a.forEach( ( cdetails ) => { console.log( cdetails.trim().split(/\s+/)) } )

//              res.send("<pre>" + stdout + "</pre>" );
//              })

                let a = stdout.split("\n");
                res.write(" <div class='Container-table'><table border='1' align='center' width='80%' class='output-table'");
                res.write("<tr class='table-heading'><th> Container ID </th><th> Image Name </th><th> Command </th><th> Container Name</th></tr>  ");

                        a.forEach( ( cdetails ) => {
                                cinfo =  cdetails.trim().split(/\s+/)
                                console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[2])
					
                                res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" + "<td>" +                                           cinfo [ cinfo.length - 1] + "</td>" + "</tr>")
                        });
                res.write("</table> </div>")
                res.send()
        });
});

  
app.get("/DeleteContainer" ,(req, res) =>{
        exec("docker rm -f $(docker ps -a -q)", (err, stdout, stderr) => {
             console.log(stdout);
             console.log(stderr);
             res.send("<span> All Container Deleted  " + stdout + "</span>");
                });
        });

app.get("/cli", (req, res) =>{
        const csh = req.query.cshell;
        exec(csh, (error, stdout, stderr) => {
//        exec(" docker attach " + csh, (error, stdout, stderr) => {
                console.log(stderr);
                console.log(stdout);
                res.send("<pre>" + stdout + stderr +  "</pre>");
                })
        });



app.get("/docker-cli", (req, res) =>{
        const CDName = req.query.Dosname;
        const CDcmd = req.query.Doscmd;
        exec(' docker exec ' + CDName +" " + CDcmd, (error, stdout, stderr) => {
//        exec(" docker exec " + csh, (error, stdout, stderr) => {
                console.log(stderr);
                console.log(stdout);
                res.send("<pre>" + stdout + stderr +  "</pre>");
                })
        });



app.listen(3000, () => {
        console.log("Container App Started");
});



