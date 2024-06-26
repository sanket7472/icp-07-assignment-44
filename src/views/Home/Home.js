import "./Home.css"
import add from "./img/plus.png"
import boy from "./img/boy.png"
import girl from "./img/girl.png"
import ToDoCard from "../../components/todoCard/todoCard"
import { useEffect, useState } from "react"
import toast, {Toaster} from "react-hot-toast"
import Swal from "sweetalert2"

function Home() {
  
    const [todoList, setTodoList] = useState([])
    const [newTask, setNewTask] = useState("")
    const [categeory, setCategory] = useState("")
   
    useEffect(()=>{ 
        const savedTOdoList = localStorage.getItem("todoList")
        if(savedTOdoList){
            setTodoList(JSON.parse(savedTOdoList))
        }
    },[])
    useEffect(() => {
        if(todoList.length === 0) return

        localStorage.setItem("todoList", JSON.stringify(todoList))
    }, [todoList])

    function deleteItem(index){
        Swal.fire({
            title: "Are you sure ?",
            text: "You want to delete this task..!",
            icon: "warning",
            showCancelButton: true,
    }).then((result)=>{
        if(!result.isConfirmed){
            return
        }
            const newToDoList = todoList.filter((item,i)=>{
                if (i !== index){
                    return true
                }
                else{
                    return false
                }
            })
            setTodoList(newToDoList)
        })
    }
  return (
    <div>
        <h1 className="app-title">To-Do App📝</h1>
        <img src={boy} className="boy" alt="boy"/>
        <div className="todolist-container">
           {
            todoList.map((todoItem, i)=>{

                const {task, categeory} = todoItem
                return  <ToDoCard key={i} index={i} task={task} categeory={categeory} deleteItem= {deleteItem}/>
                
            })
           }

           {
            todoList.length === 0
            ? 
              <p style={{textAlign:"center" , fontSize:'22px'}}>
                No task to show, Add a new task
                </p>
            : null
           }
        </div>
        <img src={girl} className="girl" alt="girl"/>
        <div className="add-item-container">
            <input
                type="text"
                placeholder="Add your Task"
                className="add-input"
                value={newTask}
                onChange={(e)=>setNewTask(e.target.value)}
            />

            <select 
                className="categeory-select" 
                value={categeory} 
                onChange={(e)=>setCategory(e.target.value)}
            >
                <option value="">Select Category</option>
                <option value="Sports">Sports</option>
                <option value="Learning">Learning</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
            </select>

            <img 
                src={add} 
                alt="add-btn" 
                className="add-icon"
                onClick={()=>{
                    if(newTask === ""){
                        toast.error('Please Type a task To add....')
                        return
                    }
                    if(categeory === ""){
                        toast.error('Please Select a Category..')
                        return
                    }
                    setTodoList([...todoList,{task:newTask, categeory: categeory} ])
                    setNewTask("")
                    setCategory("")
                    toast.success("Task Added Successfully....!")
                }}
            />
        </div>
        <Toaster/>
    </div>
  )
}

export default Home