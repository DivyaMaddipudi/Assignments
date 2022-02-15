class User {
  constructor(id, email) {
    Object.assign(this, { id, email });
  }

  static getUserAccount() {
    return "Student Account";
  }

  getUserDetails() {
    return `ID: ${this.id} email: ${this.email}`;
  }
}

class Student extends User {
  constructor(id, email, department, specialization) {
    super(id, email);
    Object.assign(this, { department, specialization });
  }

  getUserDetails() {
    return (
      super.getUserDetails() +
      ` Department: ${this.department} Specialization: ${this.specialization}`
    );
  }
}

const student = new Student(
  016011775,
  "satyadivya.maddipudi@sjsu.edu",
  "SE",
  "EST"
);
console.log(User.getUserAccount());
console.log(student.getUserDetails());
