import * as yup from "yup";

const allowedDomains = ['gmail.com', 'asu.edu', 'yahoo.com', 'hotmail.com', 'outlook.com'];

const nameSchema = yup.string().matches(/^[A-Za-z ]+$/, 'Invalid name format').trim().required('Name is required');

export const SignupSchema =  yup.object().shape({
    Name: nameSchema,
    Email: yup.string().email("Please enter a valid Email").required("Please enter you Email").test('Valid domain', 'Invalid Domain', value => {
        if (!value) return true; 
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
    }),
    Password: yup.string().min(8).matches(/^[a-zA-Z0-9$%#&*+]+$/, 'Special characters allowed ($%#&*+)').required("Please enter your Password")
})

export const LoginSchema =  yup.object().shape({
    Email: yup.string().email("Please enter a valid Email").required("Please enter you Email"),
    Password: yup.string().required("Please enter your Password")
})

export const TaskFormSchema = yup.object().shape({
    Title: yup.string().required('Please enter a title').max(50, 'Title must not exceed 50 characters'),
    Description: yup.string().required('Please enter a description').max(500, 'Description must not exceed 500 characters'),
    Priority: yup.string().notOneOf(['select an option'], 'Please select an option').required('Please select an option from the dropdown'),
    
    TaskDate: yup.date().nullable().required('Please select a date')
  });