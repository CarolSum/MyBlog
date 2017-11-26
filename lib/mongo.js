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

exports.User.index({ name: 1}, { unique: true}).exec();

//记录作者id，标题，正文，点击量
exports.Post = mongolass.model('Post', {
    author: {type: MongoLass.Types.ObjectId},
    title: {type:'string'},
    content: {type: 'string'},
    pv: {type: 'number'}
})

exports.Post.index({author:1, _id:-1}).exec();

exports.Comment = mongolass.model('Comment', {
    author: {type: MongoLass.Types.ObjectId},
    content: {type: 'string'},
    postId: {type: MongoLass.Types.ObjectId}
})

// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({postId: 1, _id: 1}).exec();
