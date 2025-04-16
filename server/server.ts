import app from './api/app'
import dbConfig from '../server/configs/dbConfig'

dbConfig.initialize().then(()=>{
    app.listen(3000,()=>{
        console.log("port running on 3000")
    })
})