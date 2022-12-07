const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const article_id = localStorage.getItem('article_id')
const main_url = "http://127.0.0.1:8000"

window.onload = async function load_detail() {
    const response = await fetch(`${main_url}/article/${article_id}/detail/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('access'),
            "content-type": "application/json"
        },
        method: 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const category = document.getElementById('article_category')
    category.setAttribute('value', response_json.category)
    const content = document.getElementById('article_content')
    content.setAttribute('value', response_json.content)

    //작성자 아니면 수정, 삭제 버튼 안보임
    if (response_json.user != userId){
        const article_edit = document.getElementById('article_edit_btn')
        article_edit.style.visibility = 'hidden'
        const article_del = document.getElementById('article_del_btn')
        article_del.style.visibility = 'hidden'
    }
}


function article_delete() {
    const response = fetch(`${main_url}/article/${article_id}/detail/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('access'),
            "content-type": "application/json"
        },
        method: "DELETE"
    })
    window.location.replace('articles.html')
}