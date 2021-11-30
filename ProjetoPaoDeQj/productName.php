<?php

require "./Connect.php";

$search = filter_input(INPUT_POST, 'search', FILTER_DEFAULT);


$find = Connect::getInstance()->query("SELECT * FROM produtos WHERE nomep LIKE '%" . $search . "%' ORDER BY nomep ASC LIMIT 7")->fetch();

if(!$find) {
    echo 'error';
    return false;
}

echo json_encode($find);