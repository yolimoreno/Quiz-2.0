
<?php

$a = new stdClass(); 
$a->a = "asdasd";
$a->b ="ewvdwc";
$test = array();
$test[] = $a;
$test[] = $a;
$test[] = $a;
$test[] = $a;
$test[] = $a;
$test[] = $a;
$test[] = $a;
$test[] = $a;


echo json_encode($test);