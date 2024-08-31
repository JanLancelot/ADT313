<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
        $table = [
            "header" => [
                "Student ID",
                "Last Name",
                "Middle Name",
                "First Name",
                "Course",
                "Section"
            ],
            "body" => [
                [
                    "lastName" => "LastName_1",
                    "midddleName" => "MiddleName_1",
                    "firstName" => "FirstName_1",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_2",
                    "midddleName" => "MiddleName_2",
                    "firstName" => "FirstName_2",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_3",
                    "midddleName" => "MiddleName_3",
                    "firstName" => "FirstName_3",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_4",
                    "midddleName" => "MiddleName_4",
                    "firstName" => "FirstName_4",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_5",
                    "midddleName" => "MiddleName_5",
                    "firstName" => "FirstName_5",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_6",
                    "midddleName" => "MiddleName_6",
                    "firstName" => "FirstName_6",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_7",
                    "midddleName" => "MiddleName_7",
                    "firstName" => "FirstName_7",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_8",
                    "midddleName" => "MiddleName_8",
                    "firstName" => "FirstName_8",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_9",
                    "midddleName" => "MiddleName_9",
                    "firstName" => "FirstName_9",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
                [
                    "lastName" => "LastName_10",
                    "midddleName" => "MiddleName_10",
                    "firstName" => "FirstName_10",
                    "course" => "BSCS/BSIT",
                    "section" => "3A/3C"
                ],
            ]
        ];

        echo "<table>";
        echo "<thead>";
        foreach($table["header"] as $val){
            echo "<th>" . $val . "</th>";
        };

        echo "</thead>";
        $i = 1;

        foreach($table["body"] as $studentInfo => $data){
            echo "<tr>";
            echo "<td>" . $i . "</td>";

            $i++;
            foreach($data as $cellData){
                echo "<td>" . $cellData . "</td>";
            }
            echo "</td>";
        };
        
        echo "</table>"
    ?>
</body>
</html>