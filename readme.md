# Remove rows that contains duplicate data for a specific column in csv files

### How to use it
Open https://lijunray.github.io/csv-remove-duplicate, upload your csv file by clicking the "Choose File" button, input the column and click "Submit".

The file MUST be in format of csv, and it MUST have a explicit header.

For instance, following is a **WRONG** input file because the 5th header column is empty:
```
test.csv
a,b,c,d,,
1,2,3,4,5
q,w,e,r,t
```
Above will fail.

Below is a revised version:
```
test.csv
a,b,c,d,dont_leave_any_header_column_empty,
1,2,3,4,5
q,w,e,r,t
```
But it's fine if you leave some data column empty, so below is also a proper input:
```
test.csv
a,b,c,d,dont_leave_any_header_column_empty,
1,2,3,,5
q,w,,r,t
```
