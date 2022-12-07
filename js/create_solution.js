// 로그아웃
function handleLogout(){
    localStorage.clear()
    window.location.replace("api.html")
}


const main_url = "http://127.0.0.1:8000"

// 사진 미리보기
const fileInput = document.getElementById("file")
const handleFiles = (e) => {
    const fileReader = new FileReader()
    const selectedFile = fileInput.files;
    fileReader.readAsDataURL(selectedFile[0])
    fileReader.onload = function(){
        document.getElementById("previewImg").src = fileReader.result
    }
}
fileInput.addEventListener("change", handleFiles)


async function handleUploadimg(){
    const img = document.querySelector('#file')
    const wise = document.getElementById('wise').value
    const nickname = document.getElementById('nickname').value

    console.log(img, wise, nickname)

    const formdata = new FormData()
    formdata.append('solution_image', img.files[0])
    formdata.append('wise', wise)
    formdata.append('nickname', nickname)

    const response = await fetch(`${main_url}/article/1/solution/`, {
        headers: { 
            'Authorization': 'Bearer '+ localStorage.getItem('access')
        },
        method: 'POST',
        body: formdata
    }
    )
    // .then(window.location.replace('.html'))
}