const main_url = "http://127.0.0.1:8000"
const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)

window.onload = () => {
    load_solution_collection();
}

async function load_solution_collection(){
    const payload = localStorage.getItem('payload')
    const personObj = JSON.parse(payload)
    const userId = personObj['user_id']
    const username = personObj['username']

    const response = await fetch (`${main_url}/article/allsolution/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })
    response_json = await response.json()
    console.log(response_json)
   
    const img_box = document.getElementById('img_box')
    
    response_json.forEach(element => {
        const main_img = document.createElement('div')
        main_img.style.display = 'flex'
        main_img.style.flexDirection = 'column'

        const img_tag = document.createElement('a')

        img_tag.href = '/solution_detail.html'
        img_tag.onclick = function() {
            localStorage.setItem("solution_id", element.id)
        }

        const solution_img = document.createElement('img')
        solution_img.src = `${main_url}${element.solution_image}`
        solution_img.style.width = '250px';
        solution_img.style.height = '250px';
        solution_img.style.margin = '10px 15px';
        solution_img.style.borderRadius = '15%'


        
        img_tag.appendChild(solution_img)
        main_img.appendChild(img_tag)        
        img_box.appendChild(main_img)



    })    
}


// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}