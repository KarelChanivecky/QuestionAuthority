import sql from 'mssql';

// database connection config
const config = {
    "server": 'localhost',
    "database": 'qa',
    "user": 'QAserver',
    "password": "teus88"
};

// initialize main connection pool
let pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function withDB(func) {
    
    let result = await func(request);
    
    return result;
}

export async function queryDB(query) {
        await poolConnect;
        const request = new sql.Request(pool);
        let result = await request.query(query);
        console.log('@withDB', result.recordsets); 
        return result;
}