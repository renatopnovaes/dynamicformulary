<?php 

require "./Connect.php";

$data = json_decode(filter_input(INPUT_POST, 'data', FILTER_DEFAULT));

$products = $data->products;

foreach($products AS $key => $value) {
    $stmt = Connect::getInstance()->prepare("INSERT INTO ped (codped, dataped, codpdv, prod, qnt) VALUES (?,?,?,?,?)");
    $stmt->bindValue('1', $data->codcli . time(), PDO::PARAM_STR);
    $stmt->bindValue('2', $data->date, PDO::PARAM_STR);
    $stmt->bindValue('3', $data->codcli, PDO::PARAM_INT);
    $stmt->bindValue('4', $key, PDO::PARAM_INT);
    $stmt->bindValue('5', $value, PDO::PARAM_INT);

    $response = $stmt->execute();
    
    if(!$response) {
        echo("error");
        return;
    }
}

echo("success");


