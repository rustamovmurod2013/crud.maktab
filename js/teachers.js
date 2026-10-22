let teacherPlace = document.getElementById("teachersPlace");
let addTeacherBtn = document.getElementById("addTeacherBtn");
let outerModal = document.getElementById("outerModal");
let innerModal = document.getElementById("innerModal");
let selectEditingTeacher = null;

async function getTeachers(){
    try {
        let data = await fetch("https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers");
        let teachers = await data.json();

        teacherPlace.innerHTML = "";
        teachers.map((el) => {
            teacherPlace.innerHTML += `
            <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                                <img class="w-10 rounded-full" src="${el.avatar}" alt="${el.teacherName}">
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                ${el.teacherName}
                            </th>
                            <td class="px-6 py-4">
                                ${el.phoneNumber}
                            </td>
                            <td class="px-6 py-4">
                                ${el.subject}
                            </td>
                            <td class="px-6 py-4">
                                ${el.salary}
                            </td>
                            <td class="px-6 py-4 flex items-center gap-5">
                                <a href="../pages/teacherPage.html?teacher=${el.id}">
                                    <div class="cursor-pointer">
                                        <img class="w-7" src="../assets/images/info-icon.png" alt="">
                                    </div>
                                </a>
                                <div onClick="editTeacher('${el.id}')" class="cursor-pointer">
                                    <img class="w-10" src="../assets/images/edit-icon.png" alt="">
                                </div>
                                <div onClick="deleteTeacher('${el.id}')" class="cursor-pointer">
                                    <img class="w-8" src="../assets/images/delete-icon.png" alt="">
                                </div>
                            </td>
                        </tr>
            `
        })
        
    } catch (error) {
        console.error(error);
    }
}

getTeachers();

addTeacherBtn.addEventListener("click", function(){
    selectEditingTeacher = null;
    innerModal.reset();
    outerModal.classList.remove("hidden");
})

outerModal.addEventListener("click", function(){
    outerModal.classList.add("hidden");
    selectEditingTeacher = null;
    innerModal.reset();
})

innerModal.addEventListener("click", function(e){
    e.stopPropagation();
})

innerModal.addEventListener("submit", async function(e){
    e.preventDefault();
    let teacherObj = {
        teacherName: e.target[0].value,
        avatar: e.target[1].value,
        email: e.target[2].value,
        experience: e.target[3].value,
        phoneNumber: e.target[4].value,
        subject: e.target[5].value,
        salary: e.target[6].value,
    };

    try{
        let url = selectEditingTeacher 
            ? `https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers/${selectEditingTeacher}`
            : "https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers";
        let method = selectEditingTeacher ? "PUT" : "POST";

        await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teacherObj)
        });

        outerModal.classList.add("hidden");
        selectEditingTeacher = null;
        innerModal.reset();
        getTeachers();
    }catch(err){
        console.log(err);
    }

})

async function deleteTeacher(id){
    try{
        let data = await fetch(`https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        let res = await data.json();
        console.log(res);
        getTeachers();
    }catch(err){
        console.log(err);
    }
}

async function editTeacher(id) {
    selectEditingTeacher = id;
    outerModal.classList.remove("hidden");

    try {
        let res = await fetch(`https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers/${id}`);
        let teacher = await res.json();
        innerModal[0].value = teacher.teacherName;
        innerModal[1].value = teacher.avatar;
        innerModal[2].value = teacher.email;
        innerModal[3].value = teacher.experience;
        innerModal[4].value = teacher.phoneNumber;
        innerModal[5].value = teacher.subject;
        innerModal[6].value = teacher.salary;
    } catch (err) {
        console.log(err);
    }
}