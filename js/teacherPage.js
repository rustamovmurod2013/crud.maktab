let path = new URLSearchParams(window.location.search);

let teacherID = path.get("teacher");

let renderTeacher = document.getElementById("renderTeacher");
let renderTeachersStudents = document.getElementById("renderTeachersStudents");

console.log(teacherID);

async function renderTeacherInfo(){
    try{
        let res = await fetch("https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers");
        let data = await res.json();
        data?.filter((el) => el.id === teacherID).map((el) => {
            renderTeacher.innerHTML += `
            <div class="flex items-center justify-between py-10 p-5 rounded-2xl bg-[black]/40 border border-gray-500">
                <h1 class="text-[30px] font-bold">${el.teacherName}</h1>
                <p class="text-[30px] font-bold">${el.phoneNumber}</p>
                <p class="text-[30px] font-bold">${el.subject}</p>
                <p class="text-[30px] font-bold">${el.salary}</p>
                <p class="text-[30px] font-bold">${el.experience}</p>
            </div>
            `
        })
    }catch(err){
        console.log(err);
        
    }
}

renderTeacherInfo();

async function renderTeacherStudents(){
    try{
        let res = await fetch(`https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers/${teacherID}/students`);
        let data = await res.json();
        data?.filter((el) => el.teacherId === teacherID).map((el) => {
            renderTeachersStudents.innerHTML += `
            <div class="flex items-center justify-between py-10 p-5 rounded-2xl bg-[gray]/40 border border-gray-500">
                <h1 class="text-[20px] font-bold">${el.studentName}</h1>
                <p class="text-[20px] font-bold">${el.email}</p>
                <p class="text-[20px] font-bold">${el.age}</p>
                <p class="text-[20px] font-bold">${el.parentName}</p>
                <button onClick="deleteStudent('${el.id}')" class="bg-[red] px-5 py-2 text-white rounded-full">Delete</button>
            </div>
            `
        }) 
    }catch(err){
        console.log(err);
        
    }
}

renderTeacherStudents();

async function deleteStudent(id){
    try{
        await fetch(`https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers/${teacherID}/students/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        renderTeacherStudents();
    }catch(err){
        console.log(err);
    }
}
