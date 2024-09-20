import { Elysia } from 'elysia'

const app = new Elysia()
    .get('/', ({ path }) => path) 
    .post('/hello', 'Do you miss me?')
    .listen(3200)
    
console.log('user-auth-service start at http://localhost:3200')

export default app