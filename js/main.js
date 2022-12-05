// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}

const main_url = "http://127.0.0.1:8000"

async function create_worry(){
    const mbti = document.getElementById('input_mbti').value
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
            "mbti": mbti,
            "category" : category_txt,
            "content":worry
        })
    })
    window.location.replace('solution.html')
}