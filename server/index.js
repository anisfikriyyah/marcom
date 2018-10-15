const restify = require('restify');
// const morgan = require('morgan');
// const winston = require('./configs/winston');

const DatabaseConnection = require("./models/db");
DatabaseConnection.connect((err, db) => {
    if (err != null) {
        console.log(err);
        process.exit();
    } else {
        console.log('[DATABASE] connected');

        const server = restify.createServer();
        const port = 3100;

        // server.use(morgan('combined', { stream: winston.stream }));

        // CORS
        const corsMiddleware = require('restify-cors-middleware');
        const cors = corsMiddleware({
            origins: ['*'],
            allowHeaders: ['Authorization']
        });
        server.pre(cors.preflight);
        server.use(cors.actual);

        // Business Logic (BL)
        const AuthBL = require('./businessLogic/auth_bl');
        const EmployeeBL = require('./businessLogic/employee_bl')
        const CompanyBL = require('./businessLogic/company_bl')
        const GlobalBL = require('./businessLogic/global_bl')
        const MenuBL = require('./businessLogic/menu_bl')
        // const UserBL = require('./businessLogic/user_bl')
        // const BukuBisnisLogic = require('./bisnisLogic/buku_bisnislogic');
        // const AgamaBisnisLogic = require('./bisnisLogic/agama_bisnislogic');
        // const BukuBisnisLogic = require('./bisnisLogic/buku_bisnislogic');
        // const BukuBisnisLogic = require('./bisnisLogic/buku_bisnislogic');
        // const PenerbitBisnisLogic = require('./bisnisLogic/penerbit_bisnislogic');
        // const PengarangBisnisLogic = require('./bisnisLogic/pengarang_bisnislogic');
        // const TypeBukuBisnisLogic = require('./bisnisLogic/type_buku_bisnislogic');
        // const KotaBisnisLogic = require('./bisnisLogic/kota_bisnislogic');
        // const ProvinsiBisnisLogic = require('./bisnisLogic/provinsi_bisnislogic');
        // const AuthMiddleware = require('./middlewares/auth_middleware');
        // const Collection = require('./bisnisLogic/collection_list');

        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser({ mapParams: false }));

        // post routes
        // server.post('/api/auth/login', AuthBisnisLogic.loginHandler);
        server.post('/api/company', CompanyBL.InsertCompanyHandler);
        // server.post('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.insertBukuHandler);
        // server.post('/api/pengarang', AuthMiddleware.checkToken, PengarangBisnisLogic.insertPengarangHandler);
        // server.post('/api/agama', AuthMiddleware.checkToken, AgamaBisnisLogic.insertAgamaHandler);
        
        // // put routes
        // server.put('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.updateBukuHandler);
        // server.put('/api/agama', AuthMiddleware.checkToken, AgamaBisnisLogic.updateAgamaHandler);
        
        // // delete routes
        // server.del('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.deleteBukuHandler);

        // // get routes
        server.get('/', (req, res, next) => {
            console.log("masuk pak eko");
        })
        server.get('/api/company', CompanyBL.getCompanyDocLength);
        server.get('/api/doc-length/:docName', GlobalBL.getDocLength);
        server.get('/api/menu', MenuBL.getMenuHandler);
        // server.get('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.readBukuAllHandler);
        // server.get('/api/buku-agr', AuthMiddleware.checkToken, BukuBisnisLogic.aggregatingBukuHandler);
        
        // server.get('/api/agama', AuthMiddleware.checkToken, AgamaBisnisLogic.readAgamaAllHandler);
        
        // server.get('/api/penerbit', AuthMiddleware.checkToken, PenerbitBisnisLogic.readPenerbitHandler);
        
        // server.get('/api/pengarang', AuthMiddleware.checkToken, PengarangBisnisLogic.readPengarangHandler);
        // server.get('/api/pengarang-agr', AuthMiddleware.checkToken, PengarangBisnisLogic.aggregatingPengarangHandler);
        
        // server.get('/api/type-buku', AuthMiddleware.checkToken, TypeBukuBisnisLogic.readTypeBukuHandler);
        
        // server.get('/api/kota', AuthMiddleware.checkToken, KotaBisnisLogic.readKotaHandler);
        // server.get('/api/provinsi', AuthMiddleware.checkToken, ProvinsiBisnisLogic.readProvinsiHandler);
        // // server.get('/api/checkToken', AuthMiddleware.checkToken);
        // server.get('/api/collection-list', AuthMiddleware.checkToken, Collection.getCollectionList);
        // server.get('/', (req, res, next) => {
        //     if (process.platform === "win32") {
        //         require("readline")
        //           .createInterface({
        //             input: process.stdin,
        //             output: process.stdout
        //           })
        //           .on("SIGINT", function () {
        //             process.emit("SIGINT");
        //           });
        //       }
              
        //       process.on("SIGINT", function () {
        //         console.log("\nService dimatikan")
        //         // graceful shutdown
        //         process.exit();
        //       });
        // });

        server.listen(port, () => {
            console.log('[SERVER] running at port ' + port);
        })
    }
})
