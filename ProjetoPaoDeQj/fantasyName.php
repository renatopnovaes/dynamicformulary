<?php

require "./Connect.php";

$search = filter_input(INPUT_POST, 'search', FILTER_DEFAULT);


$find = Connect::getInstance()->query("SELECT * FROM clientes WHERE nomef LIKE '%" . $search . "%' ORDER BY nomef ASC LIMIT 1")->fetch();

if(!$find) {
    echo 'error';
    return false;
}

echo json_encode($find);