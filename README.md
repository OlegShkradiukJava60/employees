# HW #47 Definition
## Auth data flows and rendered components
### userData is null
#### Navigator should show only Login link
### userData is data of the user with role USER
#### Navigator should show the following components
- Home (without delete buttons and Edit controls) <br>
- Logout <br>
- Statistics 
### userData is data of the user with role ADMIN
#### Navigator should show the following components
- Home (with delete buttons and Edit controls) <br>
- Add Employee <br>
- Logout <br>
- Statistics
## Update of ApiClientJsonServer
### the method "addEmployee" should add into Employee object the property "userId" with value "ADMIN"
## login: admin@tr.com
## password:123456 