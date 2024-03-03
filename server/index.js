const express = require('express')
const pool = require('./db')
const port = process.env.PORT || 3001
const app = express()
app.use(express.json())

//Setup Routes
app.get('/setup/drop', async (req, res) => {
   try{
      await pool.query("DROP TABLE IF EXISTS accounts;");
      res.status(200).send({message: "Table was successfully dropped"});
   } catch (err){
      console.log(err);
      res.sendStatus(500);
   }
})

app.get('/setup/create', async (req, res) => {
   try{
      await pool.query("CREATE TABLE accounts (account_number INTEGER PRIMARY KEY, name VARCHAR NOT NULL, amount INTEGER NOT NULL, type VARCHAR NOT NULL);");
      res.status(200).send({message: "Table was created dropped"});
   } catch (err){
      console.log(err);
      res.sendStatus(500);
   }
})

app.get('/setup/constraint', async (req, res) => {
   try{
      await pool.query("ALTER TABLE accounts ADD CONSTRAINT verify_type CHECK (type IN ('checking', 'savings', 'credit'));")
      res.status(200).send({message: "Constraint was successfully added"})
   } catch (err){
      console.log(err)
      res.sendStatus(500)
   }
})

app.get('/setup/insert', async (req, res) => {
   try{
      await pool.query("INSERT INTO accounts (account_number, name, amount, type) VALUES (1, 'Johns Checking', 200, 'checking'), (2, 'Janes Savings', 2000, 'savings'),(3, 'Jills Credit', -3000, 'credit'),(4, 'Bobs Checking', 40000, 'checking'),(5, 'Bills Savings', 50000, 'savings'),(6, 'Bills Credit', -60000, 'credit'),(7, 'Nancy Checking', 70000, 'checking'),(8, 'Nancy Savings', 80000, 'savings'),(9, 'Nancy Credit', -90000, 'credit');")
      res.status(200).send({message: "Set inserts were created successfully"})
   } catch (err){
      console.log(err)
      res.sendStatus(500)
   }
})

//Account Routes
app.get('/accounts', async (req, res) => {
   try {
      const data = await pool.query(`SELECT * FROM accounts`)
      res.status(200).send(data.rows)
   } catch (err) {
      console.log(err);
      res.sendStatus(500);
   }
});

app.get('/account/:name', async (req, res) => {
   try {
      const data = await pool.query(`SELECT * FROM accounts WHERE lower(name) = lower('${req.params.name}')`)
      res.status(200).send(data.rows)
   } catch (err) {
      console.log(err);
      res.sendStatus(500);
   }
});

app.post('/account/deposit', async (req, res) => {
   try {
      console.log(req.body)
      const data = await pool.query(`UPDATE accounts SET amount = ${req.body.amount} WHERE account_number = ${req.body.account_number}`)
      res.status(200).send(data.rows)
   } catch (err) {
      console.log(err);
      res.sendStatus(500);
   }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`))