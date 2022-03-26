const student = {
  getProfile: function (id, location) {
    console.log(
      "Details of the student: " +
        this.department +
        " " +
        this.specialization +
        " " +
        id +
        " " +
        location
    );
  },
};

const student1 = {
  department: "Software Engineering",
  specialization: "Enterprise Software Technologies",
};

const student2 = {
  department: "Computer Science",
  specialization: "Cloud Computing",
};

const student3 = {
  department: "Computer Engineering",
  specialization: "Data Science",
};

//call
student.getProfile.call(student1, "016011775", "San Jose");

//apply
student.getProfile.apply(student2, ["016001332", "San Francisco"]);

let studentDetails = student.getProfile.bind(
  student3,
  "017077561",
  "Pleasanton"
);

//callback
setTimeout(studentDetails, 3000);
