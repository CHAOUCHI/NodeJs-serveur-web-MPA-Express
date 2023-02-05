module.exports.GETMethodOnly = function(req,res,next){
    if(req.method !== "GET") {
        res.status(405).send("405 - Wrong HTTP method, this server accept GET methods only.");
    }
    else{
        res
        next();
    }
}

module.exports.timeStamp = function(req,res,next){
    const timestamp = new Intl.DateTimeFormat("fr-FR",{
        dateStyle:"short",  // jj/mm/aaaa
        timeStyle:"medium"  // hh:ii:ss
    })
    .format(Date.now());
    console.log(`${timestamp} ${req.method} ${req.originalUrl}`);

    next();
}

module.exports.Error404 =  function(req,res){
    res.status(404).send(
        `
        <h1>404 - Not Found</h1>
        <hr>
        <p>The requested URL was not found on this server.</p>
        <pre>Please check the requested URL for typing error</pre>
        <p>NodeJS - Express</p>
    `);
}