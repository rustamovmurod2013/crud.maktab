let studentsPlace = document.getElementById("studentsPlace");
let addStudentBtn = document.getElementById("addStudentBtn");
let outerModal = document.getElementById("outerModal");
let innerModal = document.getElementById("innerModal");

async function getStudents() {
    try {
        let data = await fetch("https://6a26c767a84f9d39e907e1b6.mockapi.io/students");
        let students = await data.json();

        students.map((el) => {
            studentsPlace.innerHTML += `
            <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                                <img class="w-10 rounded-full" src="${el.avatar}" alt="${el.studentName}">
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                ${el.studentName}
                            </th>
                            <td class="px-6 py-4">
                                ${el.age}
                            </td>
                            <td class="px-6 py-4">
                                ${el.address}
                            </td>
                            <td class="px-6 py-4">
                                ${el.email}
                            </td>
                            <td class="px-6 py-4 flex items-center gap-5">
                                <a href="../pages/studentsPage.html?student=${el.id}">
                                    <div class="cursor-pointer">
                                        <img class="w-7" src="../assets/images/info-icon.png" alt="">
                                    </div>
                                </a>
                                <div>
                                    <img class="w-10" src="../assets/images/edit-icon.png" alt="">
                                </div>
                            </td>
                        </tr>
            `
        })

    } catch (error) {
        console.error(error);
    }
}

getStudents();

addStudentBtn.addEventListener("click", function () {
    outerModal.classList.remove("hidden");
})

outerModal.addEventListener("click", function () {
    outerModal.classList.add("hidden");
})

innerModal.addEventListener("click", function (e) {
    e.stopPropagation();
})

innerModal.addEventListener("submit", function (e) {
    e.preventDefault();
    let studentObj = {
        studentName: e.target[0].value,
        avatar: e.target[1].value,
        email: e.target[2].value,
        age: e.target[3].value,
        address: e.target[4].value
    };

    async function postStudents() {
        try {
            let data = await fetch("https://6a26c767a84f9d39e907e1b6.mockapi.io/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentObj),
            })
            let res = await data.json();
            console.log(res);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    postStudents();

    console.log(studentObj);

})