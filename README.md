# ISUFRONTEND

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

1. FRONTEND
Run Command: npm install
After installing dependencies run tests
Run Command: ng test
in the folder Features/tasks --- repoitories
open file task.repositories.ts
you will see this :

private readonly baseUri: string = 'https://localhost:7075/api';

Change the port Accordingly to the Port you are using for your Rest Api localhost

Save and after running the Api
Run: ng serve 
to Run Angular Project.

2. BACKEND
IMPORTANT:you must have SQL SERVER EXPRESS already installed
Open API solution and MODIFY DATA IN
ISU.WebApi --- appsettings.Development.json
    "ConnectionStrings": {
   "sqlConnection": "Server=localhost\SQLEXPRESS01;Database=dbtasks;Trusted_Connection=True;TrustServerCertificate=True"
 },
with your own information from SQL SERVER EXPRESS
Run your SQL SERVER Management Studio, and use this data in your connectionStringthen run the project, if you put the right data in the connection string it will create the database and table and you can test the app from the Angular FrontEnd


