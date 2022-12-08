const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const article_id = localStorage.getItem('article_id')
const comment_get_id = localStorage.getItem('comment_id')
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

    
    
   // if (response_json.user != userId){
        const comment_list = document.getElementById('comment_list')
        let output = ''
        response_json.comment_set.reverse().forEach(element => {
            output += `
            <input class="form-control" type="text" value="${element.content}" readonly>
            
            <button type="button" class="btn btn-outline-dark" id="edit_comment_btn" onclick=save_comment_id(${element.id}) data-bs-toggle="modal" data-bs-target="#comment_edit_modal">edit comment</button>
            <button type="button" class="btn btn-outline-dark" id="edit_delete" onclick=comment_delete(${element.id})>delete</button>
            `      
        })
        comment_list.innerHTML = output
   // }
    
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

function article_edit() {
    const mbti = document.getElementById('input_mbti')
    const mbti_txt = mbti.options[mbti.selectedIndex].text
    const category = document.getElementById('input_category')
    const category_txt = category.options[category.selectedIndex].text
    const worry = document.getElementById('input_worry').value

    const response = fetch(`${main_url}/article/${article_id}/detail/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('access'),
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            "mbti":mbti_txt,
            "category":category_txt,
            "content":worry
        })
    })
    window.location.reload()
}

function comment_create(){
  
    const inputItem = document.getElementById('comment_input').value
    const response = fetch(`${main_url}/article/${article_id}/comment/`,{
        headers:{
            "Authorization": "Bearer " + localStorage.getItem('access'),
            "content-type": "application/json"
        },
        method: "POST",
        body : JSON.stringify({
            "content":inputItem
        })
    })
    
    window.location.reload()
}

function comment_delete(comment_id){

    const response = fetch(`${main_url}/article/${article_id}/comment/${comment_id}/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'DELETE',
        body : {}
    })
    window.location.replace('article_detail.html')
    window.console.log('delete')
}

function comment_edit(){ 
    const comment_edit_input = document.getElementById('comment_edit_input').value
    const get_comment_id = localStorage.getItem("comment_id")
    const response = fetch(`${main_url}/article/${article_id}/comment/${get_comment_id}/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'PUT',
        body : JSON.stringify({
            "content": comment_edit_input
        })
    })
    window.location.replace('article_detail.html')
}

function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}

function save_comment_id(comment_id){
    localStorage.setItem('comment_id',comment_id)    
}