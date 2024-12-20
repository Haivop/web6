<?php
  header('Access-Control-Allow-Origin: *');

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    if($data){
        file_put_contents('accordion.json', $data);
        echo "Дані успішно збережено!";
    } 
    else {
        echo "Помилка при збереженні даних!";
    }
  }
  else{
    echo "Помилка методу!";
  }