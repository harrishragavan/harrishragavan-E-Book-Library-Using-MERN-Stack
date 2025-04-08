# harrishragavan-E-Book-Library-Using-MERN-Stack
E-Book Library Using MERN Stack: 
The E-Book Library is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides users with a digital platform to browse, read, and manage e-books.




Key Features:

✅ User Authentication – Secure login/signup using JWT authentication.

✅ Read Online – Integrated PDF viewer for reading books without downloads.

✅ Admin Panel – Admins can manage users and book collections.

✅ Responsive UI – Mobile-friendly design using React & Tailwind CSS.
![LOGIN SAMPLE IMG1](https://github.com/user-attachments/assets/cbf63a63-c827-4262-91b0-4ec82d92b932)
LOGIN PAGE.....
![image](https://github.com/user-attachments/assets/3dfb587d-f02a-4022-8880-fe743264145b)
MAIN INTERFACE.....






// Routes
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});
