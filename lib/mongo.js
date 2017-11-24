const config = require('config-lite')(__dirname);
const MongoLass = require('mongolass');
const mongolass = new MongoLass();
mongolass.connect(config.mongodb);

var moment = require('moment');

mongolass.plugin('addCreatedAt', {
    afterFind: function(results){
        results.forEach(function(item){
            item.created_at = moment(item._id.getTimestamp()).format('YYYY-MM-DD HH:mm');
        })
        return results;
    },
    afterFindOne: function(result){
        if(result){
            result.created_at = moment(result._id.getTimestamp()).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
})

//定义用户表的schema
exports.User = mongolass.model('User',{
    name: {type: 'string'},
    password: {type:'string'},
    avatar:{type:'string'},
    gender:{type:'string', enum: ['m', 'f', 'x']},
    bio: {type:'string'}
})

exports.User.index({ name: 1}, { unique: true}).exec()