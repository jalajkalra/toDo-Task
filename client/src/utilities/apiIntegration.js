 export const AddToDo = async(data)=>{
    const bearer = 'Bearer '+ localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/user/addTodo",{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        body:JSON.stringify({item:data})
    });
    const json = await response.json();
    return json;
}

export const GetTodo = async()=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/user/getTodo",{
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        } 
    });
    const json = await response.json();
    return json;
}

export const GetTodoById = async(id)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/user/getTodo/${id}`,{
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        } 
    });
    const json = await response.json();
    return json;
}

export const UpdateTaskData = async(data)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/user/updateTodo`,{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        body:JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

export const DeleteTodo = async(data)=>{
    const bearer = 'Bearer '+localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/user/deleteTodo`,{
        method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization':bearer
        },
        body:JSON.stringify({task:data})
    });
    const json = await response.json();
    return json;
}