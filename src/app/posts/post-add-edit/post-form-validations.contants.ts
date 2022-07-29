export const postFormValidations = {
  title: [{ type: 'required', message: 'title is Required' }],
  description: [
    { type: 'required', message: 'description is reqired' },
    { type: 'maxLength', message: 'Please enter less than 200 characters' },
  ],
  images: [{ type: 'required', message: 'image is required' }],
  tags: [{ type: 'required', message: 'Tags is required' }],
  user: [{ type: 'required', message: 'User is required' }],
};
