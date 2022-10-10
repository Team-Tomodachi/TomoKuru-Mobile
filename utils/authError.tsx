const authError: { [key: string]: string } = {
  'auth/internal-error': 'Please check the input form again',
  'auth/user-not-found': 'User does not exist. Please sign up',
  'auth/email-already-in-use': 'User exist. Please use another email',
  'auth/wrong-password': 'Incorrect password',
  'auth/weak-password': 'Password must be longer than 6 characters',
};

export default authError;
