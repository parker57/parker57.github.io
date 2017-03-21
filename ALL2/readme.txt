Compile main.cpp with the Stats.sqlite file,
on ubuntu 16.04 the terminal command is:
$ g++ --std=c++11 main.cpp -o [output name] -l sqlite3
It is important to make sure the libsqlite header file is in the directory.

The Py++ file is a simple prototype, it does not utlise the database but has more functionality.
