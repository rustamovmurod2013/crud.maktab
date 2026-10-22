let path = new URLSearchParams(window.location.search);

let studentID = path.get("student");
console.log(studentID);

let renderStudent = document.getElementById("renderStudent");

async function renderStudentInfo() {
    try {
        let res = await fetch("https://6a26c767a84f9d39e907e1b6.mockapi.io/students");
        let data = await res.json();
        data?.filter((el) => el.id === studentID).map((el) => {
            renderStudent.innerHTML += `
            <div class="flex items-center justify-between py-10 p-5 rounded-2xl bg-[black]/40 border border-gray-500">
                <h1 class="text-[30px] font-bold">${el.studentName}</h1>
                <p class="text-[30px] font-bold">${el.email}</p>
                <p class="text-[30px] font-bold">${el.age}</p>
                <p class="text-[30px] font-bold">${el.parentName}</p>
            </div>
            `
        })
    } catch (err) {
        console.log(err);

    }
}

renderStudentInfo();