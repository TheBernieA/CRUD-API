EXPRESS
npm i express @types/express


PRISMA
npm i --save-dev prisma typescript ts-node @types/node

npm i @prisma/client

npx prisma init

npx prisma migrate dev --name init (to create our migration file)

npx prisma studio (to pull up prisma studio)


POSTGRES

psql -U postgres
CREATE DATABASE name;
\c makes you change name of your database
\du to see development user

psql -U postgres -d project (check model)
\dt


VALIDATION

npm i --save express-validator

npm i --save express body-parser



FILE UPLOAD 
npm i multer



AUTHENTICATION

bcrypt //hashing password
passport passport-jwt(strategy that we use with jwt to be able to use the passport)
@types/passport-jwt

emn178 sha256 //PASSWORD HASH LESSONS



CORS PERMISSIONS

app.use((req,res,next)=>{
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next();
  })
  