const es = require('elasticsearch');
const fs = require('fs');

const client = new es.client({
  host: 'http://59.110.169.144:9200',
  log: 'trace'
});

const JSON_PATH = '../../public/content.json';

function convertPosts2Docs(posts) {
  return posts.map(post => ({
    index: 'blog',
    type: 'article',
    id: post.title,
    body: {
      title: post.title,
      subtitle: post.
    }
  }))
}

fs.readFile(JSON_PATH, 'utf8', (err, data) => {
  if (err) {
    console.error('读取文章内容json文件失败');
    return;
  }
  const posts = JSON.parse(data);
  
});

const contents = fs.readFileSync(JSON_PATH);



