

const main_url = "http://127.0.0.1:8000"

window.onload = async function load_articles(){
    category_id = localStorage.getItem('category_id')
    const response = await fetch(`${main_url}/article/${category_id}/`,{
        headers : {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "content-type": "application/json"
        },
        method : 'GET',
    })
    response_json = await response.json()
    console.log(response_json)

    let articles_box = document.getElementById('articles')
    let output = ''
    response_json.forEach(element=>{
        
        output += `
        <div class="card text-center" style="width: 30rem; margin-top: 10px;">
            <div class="card-body">
                <h5 class="card-title">${element.category} / ${element.mbti}</h5>
                <p class="card-text">${element.content}</p>
                <a href="article_detail.html" onclicke = 'save_article_id(${element.id})'class="btn btn-outline-secondary">게시글 보기</a>
            </div>
        </div>
        `    
    })
    articles_box.innerHTML = output
}

function save_article_id(article_id){
    localStorage.setItem('article_id',article_id)
}

function save_category_id(category_id){
    localStorage.setItem('category_id',category_id)
    window.location.replace('articles.html')
}
