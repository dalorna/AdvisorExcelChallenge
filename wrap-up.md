## Questions

### Please provide instructions on how to run your project in a bulleted list below.
vscode should work in getting the project up and running.

1. Open a terminal to the client folder and do a npm install
2. Open a terminal to the server folder and do a npm install
3. after both npm installs are done we can start the server (in terminal for the server) by npm start
    1. make sure you see the server has started on port: 3001
4. once the server is started we can run the client (in the terminal for the client) by npm start you should see something like below
    1. You can now view client in the browser.
    2. Local:            http://localhost:3000
    3. On Your Network:  http://192.168.12.106:3000
5. The home page will pop up with some instructions on how to use the app
6. If you cannot connect to the database check db.js in the server folder, the host might need to be changed
7. Refreshing the app will cause the setup.js in the src/api folder to run again which will cause all your withdrawals and deposits to be lost

### Were there any pieces of this project that you were not able to complete that you'd like to mention?
No, I believe all parts are completed

### If you were to continue building this out, what would you like to add next?
1. add new user
2. remove the user side menu and put a proper login model or page in
3. transfer money between accounts

### If you have any other comments or info you'd like the reviewers to know, please add them below.
1. I really enjoyed this challenge because I haven't worked with docker in a while, and I have never used a node.js server either
2. It's been way too long since I've done a side project, and as I learned I just kept going