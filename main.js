const myChart = document.getElementById("myChart");
const mySubjects = document.getElementById("mySubjects");

async function initDashboard(){
    if(!myChart || !mySubjects) return;

    try{
        const [teachersRes, studentsRes] = await Promise.all([
            fetch('https://6a26c767a84f9d39e907e1b6.mockapi.io/teachers'),
            fetch('https://6a26c767a84f9d39e907e1b6.mockapi.io/students')
        ]);
        const teachers = await teachersRes.json();
        const students = await studentsRes.json();

        new Chart(myChart.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Teachers', 'Students'],
                datasets: [{
                    label: 'Count',
                    data: [teachers.length, students.length],
                    backgroundColor: ['blue', 'orange']
                }]
            }
        });

        let subjects = [...new Set(teachers?.map((el) => el.subject))];

        new Chart(mySubjects.getContext('2d'), {
            type: 'pie',
            data: {
                labels: subjects,
                datasets: [{
                    data: Array(subjects.length).fill(1),
                    backgroundColor: ['red', 'green', 'yellow', 'purple', 'orange']
                }]
            }
        });

    }catch(err){
        console.error(err);
    }
}

initDashboard();