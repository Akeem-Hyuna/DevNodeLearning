// Accessing the joi module //
//const Joi = require('@hapi/joi');
const Joi = require('joi');
// Accessing the express module //
const express = require('express');
const app = express();

// Call express.json (a piece of middleware) that app.use uses in the request porcessing pipeline.
app.use(express.json());

// Creates an array of courses
const courses = [{ id: 1, name: 'Mathematics' }, { id: 2, name: 'English' }, { id: 3, name: 'Information Technology' },
];

/*
function validateCourse(course) {
    const schema =  {
        name:Joi.string().min(3).required()
    }; 

    return Joi.validate(course, schema); 
}
*/

app.get('/', (req, res) => {
    res.send('Welcome to Your Courses');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Error!!!
    if (!course) res.status(404).send('The course with the given ID was not found!!!')
    res.send(course);
});




// Validate the request body using joi
app.post('/api/courses', (req, res) => {

    //const result = validateCourse(req.body);
    // Object Destructoring
    const { error } = validateCourse(req.body); // result.error
    // If invlaid, return 400 - Bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    /* const schema = {
         name: Joi.string().min(3).required()
     };
 
     const result = Joi.validate(req.body, schema);
     // If invlaid, return 400 - Bad request
     if (result.error) {
         res.status(400).send(result.error.details[0].message);
         return;
     }*/


    const course = {
        id: courses.length + 1,
        // Assumes the name is in the request body
        // Parsing of Json objects in the body of the request
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found!!!')

    // Validate the request body using joi
    /*  const schema = {
          name: Joi.string().min(3).required()
  
      };*/

    //const result = validateCourse(req.body);
    // Object Destructoring
    const { error } = validateCourse(req.body); // result.error
    // If invlaid, return 400 - Bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);

});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


// PORT
// Hosting environment dynamically assigns the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port $ {port}...`)); 
