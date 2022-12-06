// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}


const main_url = "http://127.0.0.1:8000"

async function create_worry(){
    const mbti = document.getElementById('input_mbti')
    const mbti_txt = mbti.options[mbti.selectedIndex].text
    const category = document.getElementById('input_category')
    const category_txt = category.options[category.selectedIndex].text
    const worry = document.getElementById('input_worry').value
    
    console.log(mbti, category_txt, worry)

    const response = await fetch(`${main_url}/article/worry/`, {
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "mbti": mbti_txt,
            "category" : category_txt,
            "content":worry
        })
    })
    window.location.replace('solution.html')
}

function save_category_id(category_id){
    localStorage.setItem('category_id',category_id)
    window.location.replace('articles.html')
}

