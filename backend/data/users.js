import bcrypt from 'bcryptjs'

 const users = [
   {
     name: 'Admin User',
     email: 'admin@example.com',
     password: bcrypt.hashSync('123456', 10),
   },
   {
     name: 'Vaishnavi',
     email: 'vaishnavi@example.com',
     password: bcrypt.hashSync('123456', 10),
   },
   
 ]

 export default users