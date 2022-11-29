
const config = {
    user:'admin',
    password:'0616545998Aa',
    server:"mssql-98061-0.cloudclusters.net",
    port: 12582,
    database:'DBMS',
    options:{
        //enableArithAbort : true, 
        trustServerCertificate: true,
        trustedConnection:true,
    },
}

module.exports = config; 