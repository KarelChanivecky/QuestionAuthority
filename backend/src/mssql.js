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
    try {
        await poolConnect;
        const request = new sql.Request(pool);
        let result = await func(request);
        console.log('@withDB', result.recordsets);
        return result;
    } catch (err) {
        console.log(err);
    }

}

export async function queryDB(query) {
    return await withDB(async (sqlRequest) => {
        try{
            let result = await sqlRequest.query(query);
        }catch (err){
            throw new EvalError(err);
        }
        return result;
    });
}