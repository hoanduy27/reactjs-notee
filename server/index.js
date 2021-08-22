const express = require("express")
const cors = require('cors');
const path = require('path');
const pool = require("./db");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.use(cors());

// const KEYWORD = ["select", "insert", "update", "delete", "drop", ";"]
// const violate_keyword = (input) => {
//     var matched = (input) => KEYWORD.find(key => input.toLowerCase().search(key) > -1);
//     return matched(input) || null;
// }

/*Route*/

// Authenticate
app.post("/noteeAPI/signin", async(req, res) => {
    try {
        const {username, password} = req.body;

        const authen = await pool.query(
            "SELECT * FROM authenticate(($1), ($2))",
            [username, password]
        );
        if(authen.rows.length == 0){
            return res.json({
                success: false,
                user: null
            })
        }
        return res.json({
            success: true,
            user: authen.rows[0]
        });
    } catch (err) {
        console.error(err.message);
    }
});

// Get all categories 
app.get("/noteeAPI/:username/categories", async(req, res) => {
    try {
        const { username } = req.params;
        const result = await pool.query(
            "SELECT * FROM get_categories(($1))",
            [username]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all tasks
app.get("/noteeAPI/:username/categories/:cid", async(req, res) => {
    try{
        const {username, cid} = req.params;
        const result = await pool.query(
            "SELECT * FROM get_tasks(($1), ($2))",
            [username, cid]
        );
        res.json(result.rows);
    }
    catch (err){
        console.error(err.message);
    }
});

app.post("/noteeAPI/add_category", async(req, res) => {
    try {
        const {username, cname} = req.body;
        const result = await pool.query(
            "SELECT add_category(($1), ($2)) as success",
            [username, cname]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/noteeAPI/remove_category", async(req, res) => {
    try {
        const {cid} = req.body;
        const result = await pool.query(
            "CALL remove_category(($1))",
            [cid]
        );
    } catch (err) {
        console.error(err.message);
    }
});


app.post("/noteeAPI/add_task", async(req, res) => {
    try {
        const {username, cid, taskName, description} = req.body;
        const result = await pool.query(
            "SELECT add_task(($1), ($2), ($3), ($4)) as success",
            [username, cid, taskName, description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/noteeAPI/remove_task", async(req, res) => {
    try {
        const {tid} = req.body;
        const result = await pool.query(
            "CALL remove_task(($1))",
            [tid]
        );
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/noteeAPI/edit_task", async(req, res) => {
    try {
        const {tid, tname, description, status} = req.body;
        const result = await pool.query(
            "CALL edit_task(($1), ($2), ($3), ($4))",
            [tid, tname, description, status]
        );
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(5000, () =>{
    console.log("server is listening on port 5000");
}) 
