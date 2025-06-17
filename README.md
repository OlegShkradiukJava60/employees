# HW #44 Solution
## Write the following components for statistics
### AgeStatisticsPage (similar to SalaryStatisticsPage)
#### Gets all employee objects like in SalaryStatisticsPage
#### Maps the employees objects to the array of the age values 
##### Simple substructing birthdate year from the current year (not exactly but enough)
#### Renders Statistics component passing to it array of the age values as numbers, 10 as interval of ages and "Age" as the label
### DepartmentStatisticsTable
#### Takes the properties including the array of objects with the following structure
##### department - as the name of a department, for example -"QA"
##### number of employees in the given department, for example - 20
##### average value of the employee salaries as integer value, for example - 22430
##### average value of the employee ages as integer value, for example - 38 
#### Draws table with columns heading and values based on the taking data (one row contains data about one department)
### DepartmentsStatisticsPage
#### By using the "lodash" function _.groupBy gets the object, with the department name as key and array of employees as value
#### Based on the above object creates the array of the objects defined above
#### Renders DepartMentStatisticsTable component passing to it the created array