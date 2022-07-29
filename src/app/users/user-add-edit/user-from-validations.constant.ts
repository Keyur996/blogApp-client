export const userFormsValidations = {
  firstName: [{ type: 'required', message: 'firstName is Required' }],
  lastName: [{ type: 'required', message: 'lastName is reqired' }],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Email is not Valid' },
  ],
  dob: [{ type: 'required', message: 'Birthdate is required' }],
  phone: [
    { type: 'required', message: 'Phone is required' },
    { type: 'min', message: 'Please enter valid phone' },
    { type: 'max', message: 'Please enter valid phone' },
  ],
};
