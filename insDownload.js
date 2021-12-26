window.addEventListener('load', function(){
  var downloadMap = localStorage.getItem('__downloadMap__')
  if (downloadMap) {
    downloadMap = downloadMap.split(',')
  } else {
    downloadMap = []
  }
  setInterval(function(){
    var articles = document.getElementsByTagName('article')
    if (articles && articles.length > 0) {
      for (var article of articles) {
        var download = article.querySelector('.ins-download')
        if (!download) {
          for (var key in article) {
            if (key.indexOf('__reactInternalInstance') > -1) {
              try {
                var post = article[key].memoizedProps.children.props.children[1].props.children.props.post
                if (post) {
                  var div = document.createElement('div');
                  var color = downloadMap.indexOf(post.code) > -1 ? '#CCC' : '#E6423A'
                  div.innerHTML = '<svg t="1590242875839" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1559" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M751.5648 394.8032a250.88 250.88 0 0 0-443.2384-86.528 233.5232 233.5232 0 0 0 25.6 465.92h395.4688a190.2592 190.2592 0 0 0 22.3744-379.1872z m-22.3744 317.7472H333.7216A172.1344 172.1344 0 0 1 326.3488 368.64a30.72 30.72 0 0 0 24.32-13.7216A189.44 189.44 0 0 1 696.32 429.1584a30.72 30.72 0 0 0 30.72 25.856h2.304a128.8192 128.8192 0 1 1 0 257.5872z" fill="' + color + '" p-id="1560"></path><path d="M549.632 531.5584l-10.9056 11.1616V394.24a30.72 30.72 0 0 0-61.44 0v148.48l-10.9568-10.9056a30.72 30.72 0 0 0-43.4176 43.4176L486.4 638.3616a30.72 30.72 0 0 0 43.4688 0l63.3344-63.3856a30.72 30.72 0 0 0-43.4176-43.4176z" fill="' + color + '" p-id="1561"></path></svg>';
                  div.style = 'position:absolute;right: 50px;height:60px;top:0;padding: 14px 0 0;';
                  div.className = 'ins-download';
                  (function(post){
                    div.onclick = function () {
                      var that = this
                      if(this.clickCheck) {
                        return
                      }
                      this.clickCheck = true
                      setTimeout(function(){
                        that.clickCheck = false
                      },3000)
                      if (downloadMap.indexOf(post.code) === -1) {
                        var paths = this.querySelectorAll('path')
                        for (var i = 0; i < paths.length; i++) {
                          paths[i].setAttribute('fill', '#CCC')
                        }
                        downloadMap.push(post.code)
                        if (downloadMap.length > 1000) {
                          downloadMap.shift()
                        }
                        localStorage.setItem('__downloadMap__', downloadMap.join(','))
                      }
                      var imgList = []
                      if (post.sidecarChildren && post.sidecarChildren.length > 1) {
                        post.sidecarChildren.map(function(item){
                          if (item.displayResources) {
                            imgList.push({
                              display_url: item.displayResources[item.displayResources.length - 1].src,
                              is_video: item.isVideo,
                              video_url: item.videoUrl || null
                            })
                          } else {
                            imgList.push({
                              display_url: item.src,
                              is_video: item.isVideo,
                              video_url: item.videoUrl || null
                            })
                          }
                        })
                      }else {
                        if (post.displayResources) {
                          imgList.push({
                            display_url: post.displayResources[post.displayResources.length - 1].src,
                            is_video: post.isVideo,
                            video_url: post.videoUrl || null
                          })
                        } else {
                          imgList.push({
                            display_url: post.src,
                            is_video: post.isVideo,
                            video_url: post.videoUrl || null
                          })
                        }
                      }
                      App.DownloadMessage(JSON.stringify({
                        caption: post.caption,
                        nodes: imgList,
                        is_video: post.isVideo,
                        profile_pic_url: post.owner.profilePictureUrl,
                        username: post.owner.username,
                        full_name: post.owner.fullName,
                        shortcode: post.code
                      }))
                    }
                  })(post)
                  article.appendChild(div)
                }
              } catch (e) {
                console.log(e)
              }
            }
          }
        }
      }
    }
  }, 1000)
})
