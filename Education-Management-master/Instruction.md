# Education Management Appliaction

## Running the Server
```Start the server on PORT 9090. Ensure strict adherence to this port number. ```
<hr/>

## Project Overview

<p style='font-size:15px'>You are tasked with building an API for a Event Management. The project should include the following features.</p>

- Register And Login JWT use and cooike set.
- [This Project Github Link](https://github.com/jeelnarola/Education-Management.git)
<hr/>

## Follow these instructions strictly
<hr/>

## Implement in MVC Structure

#### Database Connection
<p style='font-size:15px'>1. Create a 'configs' folder. Inside this folder, create a file named 'db.js'. Write logic to connect to MongoDB using an online database such as MongoDB Atlas.</p>
<hr/>

#### Database Schema Design

##### User Schema Design 

2. Create a 'models' folder
    1. Create A Auth Folder
        1. Inside this folder, create a file named 'auth.models.js' with the following schema

```
username:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:['Student','Teacher','Admin'],
    require:true
}
```

<hr/>

## Sign Up and Login

#### Sign Up - POST route

- Endpoint: Create a POST route at ```/Auth/register```.
- After a successful login, set cookies in the browser with the user's Token.
- Within the form, provide the following input fields with corresponding IDs:
    - username
    - password
    - email
    - role

#### Login - POST route

- Create a POST route named ```/Auth/login```.
- Within the form, provide the following input fields with corresponding IDs:
    - email
    - password
- After a successful login, set cookies in the browser with the user's Token.

<hr/> 

## Course Management

#### student Schema
1. Create A Educationa Folder From Models.
    1. Inside this folder, create a file named 'student.models.js' with the following schema.
```
    name,
    admissionNumber, // unique
    grade,                 
    section,
    dateOfBirth, 
    courses, // Course Id Store
    address,
    enrollmentDate: { type: Date, default: Date.now }, 
```

#### course Schema
1. Create A Educationa Folder From Models.
    1. Inside this folder, create a file named 'course.models.js' with the following schema.
```
    name,                
    description,                          
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'ref', required: true }, // Reference to the User // Front to filter Teacher and Id Send Form.
    syllabus,                              
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ref Student' }],
    schedule: {
      days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
      time: { start: String, end: String }, // e.g., { start: "10:00 AM", end: "11:00 AM" }
    },
    createdAt: { type: Date, default: Date.now },            // Timestamp for creation
    updatedAt: { type: Date, default: Date.now },
```

#### assignment Schema
1. Create A Educationa Folder From Models.
    1. Inside this folder, create a file named 'assignment.models.js' with the following schema.
```
    title,                      // Title of the assignment
    description,
    courseId,     // Link to the course
    teacherId,    // Link to the teacher
    studentsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: ' ref student' }],
    dueDate, 
    submissions: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'ref student' }, // Student submitting the assignment
        submissionDate: { type: Date },  
        stutas:{type:Boolean}                                                                        
  }],
```


### POST route :- Create Course For Admin

1. Create a Post route at ```/Admin/create/course```.
2. send a response containing all available event.
3. Middleware Use And Check Admin True to Create A Course And False to res message Unauthorized.

### PATCH route :- Update Course For Admin

1. Create a Patch route at ```/Admin/update/course/:id```.
2. send a response containing all available event.
3. Middleware Use And Check Admin True to Create A Course And False to res message Unauthorized.

### DELETE route :- DELETE Course For Admin

1. Create a DELETE route at ```/Admin/delete/course/:id```.
2. send a response containing all available event.
3. Middleware Use And Check Admin True to Create A Course And False to res message Unauthorized.

### DELETE route :- DELETE Student Enroll For Admin
1. Create a DELETE route at ```/Admin/enroll/remove```.
1. req.body sent courseid AND userid.
1. send a response containing all available event.
1. Middleware Use And Check Admin True to Create A Course And False to res message Unauthorized.

<hr/>

## Teacher Management

### PATCH route :- PATCH Course For Teacher

1. Create a Patch route at ```/Teacher/update/course/:id```.
2. send a response containing all available event.
3. Middleware Use And Check Teacher True to Create A Course And False to res message Unauthorized.


### POST route :- POST Assignment For Teacher

1. Create a Patch route at ```/Teacher/upload/assignment```.
2. send a response containing all available event.
3. Middleware Use And Check Teacher True to Create A Course And False to res message Unauthorized.

<hr/>

## Student Management

### POST route :- POST enroll Course For Student

1. Create a POST route at ```/Student/enroll/course```.
2. send a response containing all available event.
3. Middleware Use And Check Teacher True to Create A Course And False to res message Unauthorized.
 
### POST route :- POST Assignment Submition For Student

1. Create a POST route at ```/Student/add/assignment```.
2. req.body to sent Aissment ID.
3. send a response containing all available event.
4. Middleware Use And Check Teacher True to Create A Course And False to res message Unauthorized.