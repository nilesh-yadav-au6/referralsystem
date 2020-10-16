module.exports = ({ fname, lname, email,id}) => {
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          .card {
            background-color: lightseagreen;
            width: 40%;
            margin: auto;
          }
          
          .container {
            padding: 2px 16px;
          }
          </style>
       </head>
       <body>
       <div class="card">
       <div class="container">
         <h3>Employee Id: ${id}</h3>
         <h4>Name: <b>${fname} ${lname}</b></h4> 
         <p>Email: ${email}</p> 
       </div>
     </div>
       </body>
    </html>
    `;
};