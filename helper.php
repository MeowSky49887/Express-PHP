<?php
    if (!isset($argv[1]) || !file_exists($argv[1])) {
        die("Error: Missing or invalid JSON file path." . PHP_EOL);
    }

    $jsonFile = $argv[1];
    $rawInput = file_get_contents($jsonFile);

    $_NODEJS = json_decode($rawInput, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        die("JSON Error: " . json_last_error_msg() . PHP_EOL);
    }

    unlink($jsonFile);
?>
