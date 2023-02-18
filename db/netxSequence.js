const db = require("./index");
module.exports = async(collection)=>{
    
    var ret = await db.sequence.findOneAndUpdate(
        {
            id: collection
        },
        {
            $inc: { seq: 1 }
        },
        {
            new:true, upsert:true
        }
    );
    return ret.seq;
     
}