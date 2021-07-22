import express from 'express'
import { Request, Response, Express } from 'express'
import morgan from 'morgan'

const app : Express = express()

// Logging by morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world')
})

app.listen(3000, () => {
	console.log('Application started on port 3000!');
})