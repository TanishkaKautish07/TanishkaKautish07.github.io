
//for signup

let sign=document.querySelector(".log")

sign.addEventListener("click",()=>{
    let email=document.querySelector("#input1").value
    let newpass=document.querySelector("#input2").value
    let form=document.querySelector(".loginform")

    let userInfo=JSON.parse(window.localStorage.getItem("users")) || []
    let anotherarray=[]

    let userecord={
        "email":email,
        "pass": newpass
    }

    let authentication=false

    for (let i=0;i<userInfo.length;i++){
        if (userInfo[i].email==email){
            authentication=true
            break;
        }
        
    }

    if (authentication){
        alert("this user already exists")
        event.preventDefault()
        form.reset()
        
    }
    else{
        userInfo.push(userecord)

    }


    window.localStorage.setItem("users",JSON.stringify(userInfo))
    window.localStorage.setItem(`${email}`,JSON.stringify(anotherarray))

})


//for login


