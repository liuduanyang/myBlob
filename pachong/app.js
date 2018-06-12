const superagent = require("superagent")
const cheerio = require("cheerio")
const fs = require("fs")

let dataArr = []
let articleArr = []

superagent.get("http://yz.chsi.com.cn/kyzx/kydt/").end(function (err, res) {
  // 抛错拦截
   if(err){
       return new Error(err)
   }
  // 等待 code

  let $ = cheerio.load(res.text)
  $(".news-list li a").each(function(i, elem){
    if(i<=20){
      dataArr.push({
        title:$(this).text(),
        time:$(this).prev().text(),
        href:$(this).attr('href')
      })
    }
  })

  dataArr = dataArr.filter((item)=>item.title!=="")
  dataArr.forEach((item)=>{item.href="http://yz.chsi.com.cn"+item.href})

  fs.writeFile(__dirname + '/data/article.json', JSON.stringify({
    status: 0,
    data: dataArr
  }), function (err) {
        if (err) throw err;
        console.log('写入完成');
  });

  // article

  dataArr.forEach((item,index)=>{
    superagent.get(item.href).end(function (err, res) {
     if(err){
      return new Error(err)
     }
     let $ = cheerio.load(res.text)
     let dang = {
      title:$(".title-box>h2").text(),
      time:$(".news-time").text(),
      from:$(".news-from").text(),
      source:[]
    };
     $("#article_dnull").find('p').each(function(i,elem){
      dang.source.push($(this).text())
     })
     articleArr.push(dang)
     if(dataArr.length==index+1){
      fs.writeFile(__dirname + '/data/details.json', JSON.stringify({
        status: 0,
        data: articleArr
      }), function (err) {
            if (err) throw err;
            console.log('article写入完成');
      });
     }
    })
  })
});


