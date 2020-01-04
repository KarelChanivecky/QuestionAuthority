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

async function selectFromDB(query) {
    return await withDB(async (sqlRequest) => {
        try{
            let toPrint = await sqlRequest.query(query);
        }catch (err){
            throw new EvalError(err);
        }
        console.log('@within func', toPrint.recordsets);
        return toPrint;
    });
}

export {selectFromDB};