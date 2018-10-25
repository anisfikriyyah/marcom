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
        const DesignBL = require('./businessLogic/design_bl')
        const EventBL = require('./businessLogic/event_bl')
        const ProductBL = require('./businessLogic/product_bl');
        // const AgamaBisnisLogic = require('./bisnisLogic/agama_bisnislogic');
        // const BukuBisnisLogic = require('./bisnisLogic/buku_bisnislogic');
        // const BukuBisnisLogic = require('./bisnisLogic/buku_bisnislogic');
        // const AuthMiddleware = require('./middlewares/auth_middleware');
        // const Collection = require('./bisnisLogic/collection_list');

        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser({ mapParams: false }));

        // post routes
        server.post('/api/auth/login', AuthBL.loginHandler);
        server.post('/api/company', CompanyBL.InsertCompanyHandler);
        server.post('/api/master/menu', MenuBL.insertMenuHandler);
        server.post('/api/master/menu-agr', MenuBL.getAggrMenuHandler);
        server.post('/api/transaction/design', DesignBL.insertDesignHandler);
        // server.post('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.insertBukuHandler);
        // server.post('/api/pengarang', AuthMiddleware.checkToken, PengarangBisnisLogic.insertPengarangHandler);
        // server.post('/api/agama', AuthMiddleware.checkToken, AgamaBisnisLogic.insertAgamaHandler);
        
        // // put routes
        // server.put('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.updateBukuHandler);
        // server.put('/api/agama', AuthMiddleware.checkToken, AgamaBisnisLogic.updateAgamaHandler);
        server.put('/api/master/menu', MenuBL.updateMenuHandler);
        server.put('/api/transaction/design', DesignBL.updateDesignHandler);
        
        // // delete routes
        // server.del('/api/buku', AuthMiddleware.checkToken, BukuBisnisLogic.deleteBukuHandler);
        server.del('/api/master/menu', MenuBL.deleteMenuHandler);

        // // get routes
        server.get('/', (req, res, next) => {
            console.log("masuk pak eko");
        })
        server.get('/api/transaction/design/:role_id/:employee_id', DesignBL.getDesignHandler);
        server.get('/api/col-length/:colName', GlobalBL.getColLength);
        server.get('/api/master/employee/staff', GlobalBL.getStaffHandler);
        server.get('/api/master/employee/:code', EmployeeBL.getEmployeeHandler);
        server.get('/api/master/menu', MenuBL.getMenuHandler);
        server.get('/api/master/product', ProductBL.getProductHandler);
        server.get('/api/transaction/event', EventBL.getEventHandler);
        server.get('/api/transaction/design-item/:design_id', DesignBL.getDesignItemHandler);
        
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
