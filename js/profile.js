// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}

const main_url = "http://127.0.0.1:8000"
const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']
const username = personObj['username']
const category_id = localStorage.getItem('category_id')


window.onload = () => {
    loaduseruploadimg();
    load_articles();
}



// 로딩 될때 user 이름과 프로필 사진을 불러옴
async function loaduseruploadimg(){
    const response = await fetch (`${main_url}/users/${userId}/profile/`, {method:"GET"})

    response_json = await response.json()

    // 로딩시 user 이름 가져오기
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const user_name = document.getElementById('user_name')
    user_name.innerText = payload_parse.username

    const user_profile_img = response_json['profile_img']

    const img = document.getElementById('user_profile_img')
    img.setAttribute('src', `${main_url}${user_profile_img}`)

    // 사진 미리보기
    const fileInput = document.getElementById("file")
    const handleFiles = (e) => {
        const fileReader = new FileReader()
        const selectedFile = fileInput.files;
        fileReader.readAsDataURL(selectedFile[0])
        fileReader.onload = function(){
            document.getElementById("user_profile_img").src = fileReader.result
        }
    }
}


// 프로필 사진 업로드 및 수정 하기
async function userProfileUpload(){
    const img = document.querySelector('#file')
    
    const formdata = new FormData()
    formdata.append('profile_img',img.files[0])

    const response = await fetch(`${main_url}/users/${userId}/profile/`, {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access')
        },
        method: 'PUT',
        body: formdata
    }
    )
}

async function get_articles(page_param){
    if (page_param == ''){
    const response = await fetch(`${main_url}/article/${category_id}/`,{
        headers : {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "content-type": "application/json"
        },
        method : 'GET',
    })
    response_json = await response.json()
   

    var my_articles = new Array
    response_json.results.forEach(element => {
        if (element.user == userId){
            my_articles.push(element)
        }
    })
    
    return my_articles

} else {
    page = page_param.split('=')[1]
    const response = await fetch(`${main_url}/article/${category_id}/?page=${page}`,{
        headers : {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "content-type": "application/json"
        },
        method : 'GET',
    })
    response_json = await response.json()
    console.log( response_json)}

    var my_articles = new Array
    response_json.results.forEach(element => {
        if (element.user == userId){
            my_articles.push(element)
        }
    })
    
    return my_articles
}

async function load_articles(){
    page_param = location.search
    var page = parseInt(page_param.split('=')[1])

    my_articles = await get_articles(page_param)
    console.log(my_articles)

    // ************ pagination ********************
    let total_articles = my_articles.count //총 게시글 수
    let page_count = Math.ceil(total_articles / 3) //  let
    
    if(page_param == ""){
        current_page = 1
    } else {
        current_page = page
    }
    console.log(page_count, current_page)

    let page_group = Math.ceil(current_page / 5) //보여줄 페이지 수
    let last_number = page_group * 5
    
    if(last_number > page_count) {
        last_number = page_count
    }
    let first_number = last_number - (5-1)
    console.log(first_number, last_number)

    const next = current_page + 1
    const prev = current_page - 1


    let pagination_box = document.getElementById('pagination_box')

    let page_btn = '<ul class="pagination">'

    if (response_json.previous != null){
        page_btn += `<li class="page-item" ><a class="page-link" href="profile.html?page=${prev}">Prev</a></li>`
    }
    
    if (page_count >= 5) {
        for(let i=first_number; i<= last_number; i++ ){
           if(i == current_page){
               page_btn += `<li class="page-item active" aria-current="page"><a class="page-link"href="href="profile.html?page=${i}">${i}</a></li>`
           } else {
       
           page_btn += `<li class="page-item" ><a class="page-link" href="href="profile.html?page=${i}">${i}</a></li>`}
       
       }} else {
           for (let i = 1; i <= page_count; i++){
               if(i == current_page){
                   page_btn += `<li class="page-item active" aria-current="page"><a class="page-link"href="href="profile.html?page=${i}">${i}</a></li>`
               } else {
           
               page_btn += `<li class="page-item" ><a class="page-link" href="href="profile.html?page=${i}">${i}</a></li>`
           }
       }}
    
    if (response_json.next != null){
        page_btn += `
        <li class="page-item" ><a class="page-link" href="profile.html?page=${next}">Next</a></li>
      `

    }
    page_btn += '</ul>'
    
    pagination_box.innerHTML = page_btn

    let articles_box = document.getElementById('articles')
    let output = ''
    my_articles.forEach(element=>{
        
        output += `
        <div class="card text-center" style="width: 30rem; margin-top: 10px;">
            <div class="card-body">
                <h5 class="card-title">${element.category} / ${element.mbti}</h5>
                <p class="card-text">${element.content}</p>
                <a href="javascript:save_article_id(${element.id});" class="btn btn-outline-secondary">게시글 보기</a>
            </div>
        </div>
        `    
    })
    articles_box.innerHTML = output
}


function save_article_id(article_id){
    localStorage.setItem('article_id',article_id)
    window.location.replace("article_detail.html")
}

function save_category_id(category_id){
    localStorage.setItem('category_id',category_id)
    window.location.reload()
}


// username 삭제
async function deleteuser(){
    alert("정말 회원탈퇴를 진행하시겠습니까?, 회원탈퇴 후 계정을 복구할 수 없습니다")

    const response = await fetch(`${main_url}/users/${userId}/profile/`, {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access'),
            "content-type": "application/json"
        },
        method: "DELETE",
    }
    )
    localStorage.clear()
    window.location.replace("api.html")
}