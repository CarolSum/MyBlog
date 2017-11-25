var express = require('express');
var router = express.Router();

var PostModel = require('../models/posts');
var checkLogin = require('../middlewares/checkLoginState').checkLogin;

//GET /posts 所有用户或者特定用户的文章页
router.get('/', function(req, res, next){
  console.log(req.query);
  const author = req.query.author;

  PostModel.getPosts(author).then(function(posts){
    console.log(posts);
    res.render('posts',{posts: posts});
  }).catch(next);

})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function(req, res, next){
  const author = req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;

  try{
    if(!title.length){
      throw new Error('请填写标题');
    }
    if(!content.length){
      throw new Error('请填写内容');
    }
  }catch(e){
    req.flash('error', e.message);
    return res.redirect('back');
  }

  let post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  }

  PostModel.create(post).then(function(result){
    post = result.ops[0];
    req.flash('success','发表成功');
    res.redirect(`/posts/${post._id}`);
  }).catch(next);

})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next){
  console.log(req.session.user);
  res.render('create');
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function(req, res, next){
  const postId = req.params.postId;
  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId)
  ]).then(function(result){
    const post = result[0];
    if(!post){
      throw new Error('该文章不存在');
    }
    res.render('post',{
      post: post
    })
  }).catch(next);
  
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
  const postId = req.params.postId;
  const author = req.session.user._id;

  PostModel.getRawPostById(postId).then(function(post){
    if(!post){
      throw new Error('该文章不存在');
    }
    if(author.toString() !== post.author._id.toString()){
      throw new Error('没有权限');
    }
    res.render('edit',{
      post: post
    })
  }).catch(next);

})

// GET /posts/:postId/edit 更新文章页
router.post('/:postId/edit', checkLogin, function(req, res, next){
  const postId = req.params.postId;
  const author = req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;

  try{
    if(!title.length){
      throw new Error('请填写标题');
    }
    if(!content.length){
      throw new Error('请填写内容');
    }
  }catch(e){
    req.flash('error', e.message);
    return res.redirect('back');
  }

  PostModel.getRawPostById(postId).then(function(post){
    if(!post){
      throw new Error('该文章不存在');
    }
    if(author.toString() !== post.author._id.toString()){
      throw new Error('没有权限');
    }
    PostModel.updatePostById(postId, {title: title, content: content})
      .then(function(){
        req.flash('success', '编辑文章成功');
        res.redirect(`/posts/${postId}`);
      })
  }).catch(next);

})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next){
  const postId = req.params.postId;
  const author = req.session.user._id;

  PostModel.getRawPostById(postId).then(function(post){
    if(!post){
      throw new Error('该文章不存在');
    }
    if(author.toString() !== post.author._id.toString()){
      throw new Error('没有权限');
    }
    PostModel.delPostById(postId)
      .then(function(){
        req.flash('success', '删除文章成功');
        res.redirect('/posts');
      })
  }).catch(next);
})

module.exports = router;